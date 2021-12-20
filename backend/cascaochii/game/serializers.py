from rest_framework import serializers
from loguru import logger

from game.models import Game, Player, Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields = ("id", "name", "info", "body", "video_timestamp", "created_at", "active", "game")

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Player
        fields = ("id", "name", "score", "game")

#  TODO: for some reason i need to save questions if are provided in Game json(it works without also)
class GameSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ("id", "name", "url", "description", "questions", "players", "created_at")

    def create(self, validated_data):
        game = Game.objects.create(**validated_data)
        # if 'questions' in validated_data:
        #     questions_data = validated_data.pop('questions')
        #     for question_data in questions_data:
        #         Question.objects.create(game=game, **question_data)
        return game