from django import forms
from django.db.models.query_utils import PathInfo
from django.shortcuts import redirect, render
from .forms import FormLogin,FormCreate
from django.http import HttpResponseRedirect
from .models import Account_data
# Create your views here.
def Home_page(request):
    return render(request,"base/home.html",{})

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
            passwd=request.POST["password"]
            ac=Account_data.objects.all().filter(username=user,password=passwd)
            if ac:
                print("Login thanhconmg")
                request.session['username']=user
                request.session['password']=passwd
                print("crearte session")
                return redirect('/room')
            else:
                print("NOt login")         
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
        if forms_create.is_valid():
            print('3')
            if request.POST["password"]== request.POST["repassword"]:
                print("new account create")
                account={
                    "username":request.POST["fullname"],
                    "password":request.POST["password"]
                }
                Account_data.objects.create(**account)
            else:
                print("Not create")
    else:
        print('else')
        forms_create=FormCreate()

    context={
        'form':forms_create,
        'login':False,
    }
    return render(request,'base/login.html',context)