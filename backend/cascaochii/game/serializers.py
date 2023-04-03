from rest_framework import serializers
from loguru import logger

from game.models import GameModel, PlayerModel, QuestionModel,  PlayerGameModel

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionModel
        fields = ("id", "name", "info", "body", "video_timestamp", "created_at", "active", "game")

class PlayerGameModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerGameModel
        fields = ('score',)
        
class PlayerSerializer(serializers.ModelSerializer):
    details = PlayerGameModelSerializer(many=True, source='playergamemodel_set', read_only=True)
    score = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = PlayerModel
        fields = ('id', 'name', 'details',  'score')
        
    def get_score(self, obj):
        details = obj.playergamemodel_set.all()
        ser = PlayerGameModelSerializer(details, many=True)
        return ser.data

class PlayerGameSerializer(serializers.ModelSerializer):
    player_name = serializers.ReadOnlyField(source='player.name')
    player_id = serializers.ReadOnlyField(source='player.id')
    class Meta:
        model = PlayerGameModel
        fields = ('player_id', 'score', 'player_name')
        
class GameSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    players = PlayerGameSerializer(many=True, source='playergamemodel_set', read_only=True)
    
    class Meta:
        model = GameModel
        fields = ('id', 'name', 'description', 'url', 'created_at', 'players', 'questions')
        
    def create(self, validated_data):
        game = GameModel.objects.create(**validated_data)
        # if 'questions' in validated_data:
        #     questions_data = validated_data.pop('questions')
        #     for question_data in questions_data:
        #         Question.objects.create(game=game, **question_data)
        return game
    
class PlayerGameCreateSerializer(serializers.Serializer):
    # game_id = serializers.IntegerField()
    player_id = serializers.IntegerField()
    score = serializers.IntegerField()