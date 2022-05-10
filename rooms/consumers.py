import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from pages.models import Account
from .models import Message
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print(self.room_name)
        self.room_group_name = 'chat_%s' % self.room_name
        print(self.room_group_name)
        print( self.channel_name)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.save_message(data['username'], data['room'],  data['message'])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'username': data['username'],
                'xPos':data['xPos'],
                'yPos':data['yPos'],
                'indexFrame':data['indexFrame'],
                'avtCharacters':data['avtCharacters'],
                'checkCoffee':data['checkCoffee'],
                'frameReverse':data['frameReverse'],
                'idCoffee':data['idCoffee']
            }
        )
  
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'username':event['username'],
            'xPos':event['xPos'],
            'yPos':event['yPos'],
            'indexFrame':event['indexFrame'],
            'avtCharacters':event['avtCharacters'],
            'checkCoffee':event['checkCoffee'],
            'frameReverse':event['frameReverse'],
            'idCoffee':event['idCoffee']
        }))

    @sync_to_async
    def save_message(self, username, room, message):
        if message!="" and ("__loop" not in message):
            if "shareMoney" in message:
                o=message.split("-")[0]
                u=message.split("-")[2]
                v=message.split("-")[3]
                acc_o=Account.objects.get(username=o)
                money_o=int(acc_o.money)
                if money_o<=int(v):
                 
                    return
                try:
                    acc=Account.objects.get(username=u)
                    print(acc.money)
                    acc.money=str(int(acc.money)+int(v))
                    print(acc.money)
                    acc_o.money=str(int(acc_o.money)-int(v))
                    acc_o.save()
                    acc.save()
                except :
                    print("ObjectDoesNotExist")
            elif "-" in message:
                acc=Account.objects.get(username=username)
                acc.money=str(int(acc.money)+int(message))
                acc.save()
            else:
                Message.objects.create(username=username, room=room, content=message)