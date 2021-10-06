
from django.db import models

# Create your models here.
class Account_data(models.Model):
    username=models.CharField(blank=False,null=False,max_length=30)
    password=models.CharField(blank=False,null=False,max_length=30)