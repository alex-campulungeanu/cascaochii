from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.

class RoleModel(models.Model):
    class Meta:
        db_table = "accounts_role"
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200, unique=False, null=True)

class CustomUser(AbstractUser):
    email = None
    groups = None
    # TODO: create a many to many table: an user can have multiple roles
    roles = models.ManyToManyField(RoleModel, through="CustomUserRole")
    active = models.IntegerField(default=1)
        
    def __str__(self) -> str:
        return self.username
    
class CustomUserRole(models.Model):
    class Meta:
        db_table = "accounts_customuser_role"
    customuser_id = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, related_name='users', db_column="customuser_id")
    role_id = models.ForeignKey(RoleModel, on_delete=models.DO_NOTHING, related_name='roles', db_column="role_id")