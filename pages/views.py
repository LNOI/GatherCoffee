from django import forms
from django.db.models.query_utils import PathInfo
from django.shortcuts import redirect, render
from .forms import FormLogin,FormCreate
from django.http import HttpResponseRedirect
from .models import Account
from rooms import commonUser,routing
import json
from django.http import JsonResponse
import hashlib
import re
import time
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
    acountValid=True
    bruteforce=False
    context={}
    if request.method=="POST":
        forms_login=FormLogin(request.POST)
        print(request.POST)
        if forms_login.is_valid():
            user=request.POST["username"]
            passwd=hashlib.sha3_512(request.POST["password"].encode()).hexdigest()
            existUser=Account.objects.filter(username=user).count()
            if existUser>0:
                acc=Account.objects.get(username=user)
                getNumberLogin=int(acc.checkLogin.split(":")[1])
                startLogin=int(acc.checkLogin.split("-number:")[0])
                endLogin=int(time.time())
                if getNumberLogin > 5:
                    if endLogin - startLogin > 300:
                        bruteforce=False
                        acc.checkLogin=str(int(time.time()))+"-number:1"
                        acc.save()
                        if acc.password==str(passwd):
                            request.session['username']=user
                            request.session['password']=passwd
                            return redirect('/')
                    else:
                        bruteforce=True
                    acountValid=False
                else:
                    if acc.password==str(passwd):
                        
                        request.session['username']=user
                        request.session['password']=passwd
                        acc.checkLogin=str(int(time.time()))+"-number:1"
                        acc.save()
                        return redirect('/')
                    else:
                        if endLogin - startLogin > 60:
                            acc.checkLogin=str(int(time.time()))+"-number:1"
                        else:
                            acc.checkLogin=str(int(time.time()))+"-number:"+str(int(acc.checkLogin.split("-number:")[1])+1)
                        acc.save()
                        acountValid=False
    
    else:
        forms_login=FormLogin()
        
    context={
        'form':forms_login,
        'login':True,
    }
    if acountValid==False:
        print("Invalid")
        context={
            'form':forms_login,
            'login':True,
            'accountValid':False,
            'bruteforce':bruteforce
        }
    return render(request,'base/login.html',context)

def Create_page(request):
    forms_create=FormCreate(request.POST)
    print('----------Create Account----------')
    if request.method=="POST":
        forms_create=FormCreate(request.POST)
        print(forms_create)
        if forms_create.is_valid():
            if request.POST["password"]== request.POST["repassword"]:
                if Account.objects.filter(username=request.POST["username"]).count()==0:
                    pattern = "^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=\.]).*$"
                    if re.findall(pattern, request.POST["password"]):
                        account={
                            "email":request.POST["email"],
                            "fullname":request.POST["fullname"],
                            "username":request.POST["username"],
                            "password": hashlib.sha3_512(request.POST["password"].encode()).hexdigest()
                        }
                        print(hashlib.sha3_512(request.POST["password"].encode()))
                        Account.objects.create(**account)
                        forms_login=FormLogin(request.POST)
                        context= {
                            'form':forms_login,
                            'login':True,
                            'success':'1'
                        }
                        print("Successing 1")
                        return redirect('/login')
                    else:
                        
                        context= {
                        'form':forms_create,
                        'login':False,
                        'success':'2'
                        }
                        return render(request,'base/login.html',context)
                else:
                    context= {
                        'form':forms_create,
                        'login':False,
                        'success':'3'
                    }
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
    if request.method=="POST":
        if request.POST["username"]:
            info_name=request.POST["username"]
            info_user=Account.objects.filter(username=info_name)[0]
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
        userInfo=Account.objects.get(username=data['username'])
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
    return JsonResponse("Success!",safe=False)