from django.contrib import admin
from django.core.checks import messages

# Register your models here.
from .models import Message

admin.site.register(Message)