
from django.db import models

# Create your models here.
class Account(models.Model):
    email=models.CharField(blank=True,max_length=20,default="x")
    fullname=models.CharField(blank=True,null=True,max_length=30,default="x")
    username=models.CharField(blank=False,null=False,max_length=30)
    password=models.CharField(blank=False,null=False,max_length=50)
    phoneNumber=models.CharField(blank=True,max_length=11,default="xxxxxxxxxxx")
    address=models.CharField(blank=True,max_length=50,default="xxx")
    sex=models.CharField(blank=True,max_length=10,default="xxx")
    age=models.CharField(blank=True,max_length=10,default="xxx")
    money=models.CharField(blank=True,max_length=100,default="100")
    friend=models.TextField(blank=True)
    def __str__(self):
        return self.username
