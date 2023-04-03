from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from housekeeping.models import PlayerModel

# Create your models here.



class GameModel(models.Model):
    class Meta:
        db_table = "game_game"
    name = models.CharField(max_length=100, unique=True)
    url = models.CharField(max_length=256, unique=True)
    description = models.CharField(max_length=1000, blank=True)
    players = models.ManyToManyField(PlayerModel, through='PlayerGameModel')
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.IntegerField(default=1, 
        validators=[
            MaxValueValidator(1),
            MinValueValidator(0)
        ])

    def __str__(self) -> str:
        return f'{self.name} {self.url}'

class PlayerGameModel(models.Model):
    player = models.ForeignKey(PlayerModel, on_delete=models.DO_NOTHING, db_column='player_id')
    game = models.ForeignKey(GameModel, on_delete=models.DO_NOTHING, db_column='game_id')
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.IntegerField(default=1, 
        validators=[
            MaxValueValidator(1),
            MinValueValidator(0)
        ])
    class Meta:
        db_table = "game_player_game"
        unique_together = (('player', "game"),)
        indexes = [
            models.Index(fields=['player', 'game'])
        ]

class QuestionModel(models.Model):
    class Meta:
        db_table = "game_question"
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
    game=models.ForeignKey(GameModel, on_delete=models.DO_NOTHING, related_name="questions")