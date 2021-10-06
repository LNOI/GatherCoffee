from django.shortcuts import render

from .models import Message

def Index(request):
    context={
        'username':request.session["username"]
    }
    return render(request, 'tem_room/index.html',context)

def Area_Coffe(request, index_area):
    username = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room=index_area)[0:25]
    return render(request, 'tem_room/area.html', {'room_name': index_area, 'username': username, 'messages': messages})
  

def room(request):
    username = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room='lobby')[0:25]
    return render(request, 'tem_room/room.html', {'room_name': 'lobby', 'username': username, 'messages': messages})