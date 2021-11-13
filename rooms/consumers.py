import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from pages.models import Account_data
from .models import Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room
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
    
    # Receive message from web socket
    async def receive(self, text_data):
        data = json.loads(text_data)

        await self.save_message(data['username'], data['room'],  data['message'])
        # Send message to room group
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

    # Receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
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
        if message!="":
            if("-" in message):
                acc=Account_data.objects.get(username=username)
                acc.money=str(int(acc.money)+int(message))
               
                acc.save()
                return
            Message.objects.create(username=username, room=room, content=message)