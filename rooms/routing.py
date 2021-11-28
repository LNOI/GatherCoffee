from django.urls import path

from rooms import commonUser

from . import consumers

websocket_urlpatterns = [
    path('ws/common/', commonUser.ChatConsumer.as_asgi()),
    path('ws/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
    
]