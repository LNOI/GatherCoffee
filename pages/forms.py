from django import forms
from django.forms.forms import Form


class FormLogin(forms.Form):
    username=forms.CharField(max_length=20,required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'text',
        'id':'InputName',
        'placeholder':'Name'
     
    }))
    password=forms.CharField(required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'password',
        'id':'InputPassword',
        'placeholder':'Password',
        'value':''
    }))
class FormCreate(forms.Form):
    email=forms.EmailField(required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'email',
        'id':'InputEmail1',
        'aria-describedby':'emailHelp',
        'placeholder':'Email'
    }))
    
    fullname=forms.CharField(max_length=30,required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'text',
        'id':'InputFullName',
        'placeholder':'Full name'
     
    }))
    username=forms.CharField(max_length=20,required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'text',
        'id':'InputUserName',
        'placeholder':'Username'
    }))
    password=forms.CharField(required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'password',
        'id':'InputPassword',
        'placeholder':'Password'
      
    }))
    repassword=forms.CharField(required=True,widget=forms.TextInput(attrs={
        'class':'form-control',
        'type':'password',
        'id':'InputRePassword',
        'placeholder':'Password'
       
    }))
    