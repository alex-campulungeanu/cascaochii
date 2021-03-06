from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Game(models.Model):
    name = models.CharField(max_length=100, unique=True)
    url = models.CharField(max_length=256, unique=True)
    description = models.CharField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.IntegerField(default=1, 
        validators=[
            MaxValueValidator(1),
            MinValueValidator(0)
        ])

    def __str__(self) -> str:
        return f'{self.name} {self.url}'

class Question(models.Model):
    name = models.CharField(max_length=500, blank=False)
    info = models.CharField(max_length=500)
    body = models.CharField(max_length=500, blank=False)
    video_timestamp = models.CharField(max_length=100, blank=False) # TODO: this should be a number(number of seconds in video)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.IntegerField(default=1, 
        validators=[
            MaxValueValidator(1),
            MinValueValidator(0)
        ])
    game=models.ForeignKey(Game, on_delete=models.DO_NOTHING, related_name="questions")

class Player(models.Model):
    name = models.CharField(max_length=100, blank=False)
    score = models.IntegerField(default=0)
    game=models.ForeignKey(Game, on_delete=models.DO_NOTHING, related_name='players')