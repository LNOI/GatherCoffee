from django.urls import path

from .views import *

urlpatterns = [
    path('', settingUser, name='settingUser'),
    path('lobby/', lobby ,name='Lobby'),
    path('complete/', paymentComplete, name="complete"),
    path('<str:index_area>/',areaCoffe, name='areaCoffee'),
]