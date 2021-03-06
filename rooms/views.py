from django.shortcuts import render
from pages.models import Account
import json
from django.http import JsonResponse
from .models import Coffee, Message

def settingUser(request):
    context={
        'username':request.session["username"]
    }
    return render(request, 'rooms/settingUser.html',context)

def areaCoffe(request, index_area):
    user_name = request.session["username"]
    print("----------------------------------------------")
    print("Session user = ",request.session['username'])
    print("----------------------------------------------")
    count=len(Message.objects.filter(room=index_area))
    messages={}
    try:
        messages = Message.objects.filter(room=index_area)[count-20:]
    except:
        messages=Message.objects.filter(room=index_area)
    acc=Account.objects.get(username=user_name)
    lcoffee=Coffee.objects.all()
    listfiend=acc.friend.split(',')
    context={
        'room_name': index_area, 
        'username': user_name,
        'messages': messages,
        'money':acc.money,
        'friend':listfiend,
        'lcoffee':lcoffee
    }
    return render(request, 'rooms/areaCoffee.html', context)

def lobby(request):
    username = request.session["username"]
    print("----------------------------------------------")
    print("Session user = ",request.session['username'])
    print("----------------------------------------------")
    acc=Account.objects.get(username=username)
    listfiend=acc.friend.split(',')
    count=len(Message.objects.filter(room='lobby'))
    messages={}
    try:
        messages = Message.objects.filter(room='lobby')[count-20:]
    except:
        messages=Message.objects.filter(room='lobby')
    context={
        'room_name':'lobby',
        'username':username,
        'messages': messages,
        'friend':listfiend
    }
    return render(request, 'rooms/lobby.html', context)

def paymentComplete(request):
    data=json.loads(request.body)
    buyer=data["buyer"]
    money=data["value"]
    print(buyer+"-"+str(money))
    acc=Account_data.objects.get(username=buyer)
    acc.money=str(int(acc.money)+money)
    acc.save()
    return JsonResponse("Payment completed!",safe=False)

