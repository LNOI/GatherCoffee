from django import forms
from django.db.models.query_utils import PathInfo
from django.shortcuts import redirect, render
from .forms import FormLogin,FormCreate
from django.http import HttpResponseRedirect
from .models import Account_data
from rooms import commonUser,routing
import json
from django.http import JsonResponse
import hashlib
# Create your views here.
def Home_page(request):
    context={}
    if "username" in request.session:
        print("User name----------: "+request.session["username"])
        context={
            'username':request.session["username"]
        }
    else:
        context={
            'username':""
        }
    return render(request,"base/home.html",context)
def LogOutAccount(request):
    try:
        del request.session['username']
        del request.session['password']
    except  KeyError:
        pass
    print("Logout")
    return redirect('/')

def About_page(request):
    return render(request,"base/about.html",{})
def Login_page(request):
    forms_login=FormLogin(request.POST)
    if request.method=="POST":
        forms_login=FormLogin(request.POST)
        print(request.POST)
        if forms_login.is_valid():
            print("Invalid")
            user=request.POST["username"]
            passwd=hashlib.md5(request.POST["password"].encode()).hexdigest()
            ac=Account_data.objects.all().filter(username=user,password=passwd)
            if ac:
                print("Login thanhconmg")
                request.session['username']=user
                request.session['password']=passwd

                print("crearte session")
                return redirect('/')
            else:
                print("Not login")         
    else:
        forms_login=FormLogin()
    context={
        'form':forms_login,
        'login':True,
    }
    return render(request,'base/login.html',context)

def Create_page(request):
    forms_create=FormCreate(request.POST)
    print('1')
    if request.method=="POST":
        forms_create=FormCreate(request.POST)
        print('2')
        print(request.POST)
        if forms_create.is_valid():
            print('3')
            if request.POST["password"]== request.POST["repassword"]:
                
                if Account_data.objects.filter(username=request.POST["username"]).count()==0:
                    account={
                        "email":request.POST["email"],
                        "fullname":request.POST["fullname"],
                        "username":request.POST["username"],
                        "password": hashlib.md5(request.POST["password"].encode()).hexdigest()
                    }
                    print(hashlib.md5(request.POST["password"].encode()))
                    Account_data.objects.create(**account)
                    context= {
                        'form':forms_create,
                        'login':False,
                        'success':'1'
                    }
                    print("Successing 1")
                    return render(request,'base/login.html',context)
                else:
                    context= {
                        'form':forms_create,
                        'login':False,
                        'success':'3'
                    }
                    print(context)
                    return render(request,'base/login.html',context)
            else:
                context= {
                        'form':forms_create,
                        'login':False,
                        'success':'2'
                }
                print("PASSOWRD ERROR")
                print(context)
                return render(request,'base/login.html',context)
    else:
        forms_create=FormCreate()

    context={
        'form':forms_create,
        'login':False,
        'success':'0'

    }
    return render(request,'base/login.html',context)
def InformationUser(request):
    context={}
    if request.method=="GET":
        if request.GET["username"]:
            info_name=request.GET["username"]
            info_user=Account_data.objects.filter(username=info_name)[0]
           
            listfriend=info_user.friend.split(',')
            context={
                "email":info_user.email,
                "username":info_user.username,
                "fullname":info_user.fullname,
                "phonenumber":info_user.phoneNumber,
                "address":info_user.address,
                "sex":info_user.sex,
                "age":info_user.age,
                "friend":listfriend
            }
    return render(request,"base/info.html",context)
def saveInfo(request):
    data=json.loads(request.body)
    try:
        userInfo=Account_data.objects.get(username=data['username'])
        print(userInfo)
        userInfo.fullname=data['fullname']
        userInfo.address=data['address']
        userInfo.sex=data['sex']
        userInfo.age=data['age']
        userInfo.email=data['email']
        userInfo.phoneNumber=data['phone']
        userInfo.save()
    except:
        print("Error Save")
        return JsonResponse("Fail!",safe=False)
    return JsonResponse("Success1111111111111111!",safe=False)