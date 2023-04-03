from django.db import models

# Create your models here.

class PlayerModel(models.Model):
    class Meta:
        db_table = "housekeeping_player"
    name = models.CharField(max_length=100, blank=False, unique=True)
    active = models.IntegerField(default=1)
    
    def __str__(self) -> str:
        return self.name