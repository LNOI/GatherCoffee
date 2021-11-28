
from django.db import models

# Create your models here.
class Account_data(models.Model):
    email=models.CharField(blank=True,null=False,max_length=20)
    fullname=models.CharField(blank=True,null=True,max_length=30)
    username=models.CharField(blank=False,null=False,max_length=30)
    password=models.CharField(blank=False,null=False,max_length=50)
    phoneNumber=models.CharField(blank=True,max_length=11)
    address=models.CharField(blank=True,max_length=50)
    money=models.CharField(blank=True,max_length=100,default="100")
    friend=models.TextField(blank=True)
    def __str__(self):
        return self.username
