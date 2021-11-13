from django.shortcuts import render

from pages.models import Account_data


from .models import Message

def settingUser(request):
    context={
        'username':request.session["username"]
    }
    return render(request, 'rooms/settingUser.html',context)

def areaCoffe(request, index_area):
    user_name = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room=index_area)[0:25]
    acc=Account_data.objects.get(username=user_name)
    context={
        'room_name': index_area, 
        'username': user_name,
        'messages': messages,
        'money':acc.money
    }
    return render(request, 'rooms/areaCoffee.html', context)
  
def lobby(request):
    username = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room='lobby')[0:25]
    return render(request, 'rooms/lobby.html', {'room_name': 'lobby', 'username': username, 'messages': messages})