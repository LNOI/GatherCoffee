from django.db import models



class Message(models.Model):
    username = models.CharField(max_length=255)
    room = models.CharField(max_length=255)
    content = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.room

class Coffee(models.Model):
    name=models.CharField(max_length=100)
    money=models.CharField(max_length=100)
    def __str__(self):
        return self.name