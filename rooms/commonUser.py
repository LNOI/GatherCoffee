import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from pages.models import Account_data
from .models import Message
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = "common"
        print("Vao Sockettttttttttttttttttttttttttttttttttt")
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
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'username':data['username'],
                'indexRoom':data['indexRoom']
            }
        )
  
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'username':event['username'],
            'indexRoom':event['indexRoom']
        }))
