from django.contrib import admin
from django.core.checks import messages

# Register your models here.
from .models import Coffee, Message

admin.site.register(Message)
admin.site.register(Coffee)