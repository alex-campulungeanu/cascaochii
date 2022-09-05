from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class CustomUser(AbstractUser):
    email = None
    groups = None
    role = models.CharField(max_length=100, default='default role')
    active = models.IntegerField(default=1)
    
    def __str__(self) -> str:
        return self.username

