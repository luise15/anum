from django.db import models
from django import forms

# Create your models here.
class Usuario(models.Model):
    Username = models.CharField(max_length=15, primary_key=True)
    Password = models.CharField(max_length=15)
    Mail = models.EmailField()
    def __str__(self):
        return "{0}".format(self.Username)