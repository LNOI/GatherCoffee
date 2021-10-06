from django.urls import path

from .views import *

urlpatterns = [
    path('', Index, name='Index'),
    path('lobby/', room ,name='Room'),
    path('<str:index_area>/',Area_Coffe, name='Area_coffe'),
]