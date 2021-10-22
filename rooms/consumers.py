import json

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async

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
        message = data['message']
        username = data['username']
        x=data['xPos']
        y=data['yPos']
        indexFrame=data['indexFrame']
        room = data['room']
        frameReverse=data['frameReverse']
        avtCharacters=data['avtCharacters']
        checkCoffee=data['checkCoffee']
        idCoffee=data['idCoffee']
        # await self.save_message(username, room, message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'xPos':x,
                'yPos':y,
                'indexFrame':indexFrame,
                'avtCharacters':avtCharacters,
                'checkCoffee':checkCoffee,
                'frameReverse':frameReverse,
                'idCoffee':idCoffee
            }
        )
    
    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        x=event['xPos']
        y=event['yPos']
        index=event['indexFrame']
        frameReverse=event['frameReverse']

        avtCharacters=event['avtCharacters']
        checkCoffee=event['checkCoffee']
        idCoffee=event['idCoffee']
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'xPos':x,
            'yPos':y,
            'indexFrame':index,
            'avtCharacters':avtCharacters,
            'checkCoffee':checkCoffee,
            'frameReverse':frameReverse,
            'idCoffee':idCoffee
           
        }))

    @sync_to_async
    def save_message(self, username, room, message):
        Message.objects.create(username=username, room=room, content=message)