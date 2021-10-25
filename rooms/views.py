from django.shortcuts import render


from .models import Message

def settingUser(request):
    context={
        'username':request.session["username"]
    }
    return render(request, 'rooms/settingUser.html',context)

def areaCoffe(request, index_area):
    username = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room=index_area)[0:25]
    return render(request, 'rooms/areaCoffee.html', {'room_name': index_area, 'username': username, 'messages': messages})
  
def lobby(request):
    username = request.GET.get('username', 'Anonymous')
    messages = Message.objects.filter(room='lobby')[0:25]
    return render(request, 'rooms/lobby.html', {'room_name': 'lobby', 'username': username, 'messages': messages})