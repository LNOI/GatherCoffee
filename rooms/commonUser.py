import json
from threading import active_count
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
        
        if data['message'].split(":")[0]=="OkeFriend":
         
            await self.save_friend(data['message'].split(":")[1],data['username'])
        elif data['message'].split(":")[0]=="GetInfo":
            print(data['message'])
            data['dataInfo']=await self.get_Info(data['message'].split(":")[1])
            print(data['dataInfo'])
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': data['message'],
                'username':data['username'],
                'indexRoom':data['indexRoom'],
                'dataInfo':data['dataInfo']
            }
        )
  
    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'username':event['username'],
            'indexRoom':event['indexRoom'],
            'dataInfo':event['dataInfo']
        }))
    @sync_to_async
    def save_friend(self,user1,user2):
        print("Save Friend")
        accUser1=Account_data.objects.get(username=user1)
        accUser2=Account_data.objects.get(username=user2)
        if user2 in accUser1.friend or user1 in accUser2.friend:
            return
        if accUser1.friend=="":
            accUser1.friend= user2 
        else:
            accUser1.friend= str(accUser1.friend)+","+user2 

        if accUser2.friend=="":
            accUser2.friend= user1
        else:
            accUser2.friend= str(accUser2.friend)+","+user1
        accUser1.save()
        accUser2.save()
    @sync_to_async
    def get_Info(self,user):
        try:
            info=Account_data.objects.get(username=user)
            data=info.username+":"+info.fullname +":"+info.address+":"+info.sex+":"+info.age+":"+info.email+":"+info.phoneNumber
        except:
            data=""
        return data
        

