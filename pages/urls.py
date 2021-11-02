from os import name
from django.urls import path
from .views import *
urlpatterns = [
    path('',Home_page,name="HomePage"),
    path('login/',Login_page,name="LoginPage"),
    path('create/',Create_page,name="CreatePage"),
     path('about/',About_page,name="AboutPage")
    
]

