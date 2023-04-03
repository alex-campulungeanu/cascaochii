from rest_framework import serializers
from django.core.exceptions import ValidationError

from housekeeping.models import PlayerModel
from game.models import PlayerGameModel

class PlayerGameModelSerializer(serializers.ModelSerializer):
    game_name = serializers.ReadOnlyField(source='game.name')
    game_date = serializers.ReadOnlyField(source='game.created_at')
    class Meta:
        model = PlayerGameModel
        fields = ('score', 'game_id', 'game_name', 'game_date')

class PlayerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerModel
        fields = ('name', 'active')

class PlayerSerializer(serializers.ModelSerializer):
    games = PlayerGameModelSerializer(many=True, source='playergamemodel_set', read_only=True)
    class Meta:
        model = PlayerModel
        fields = ('id', 'name', 'active',  'games')
        extra_kwargs = {
            'name': {
                'error_messages': {
                    'required': 'Player name is required',
                },
            },
        }
    def validate(self, attrs):
        if 'name' in attrs:
            if len(attrs['name']) < 3:
                raise ValidationError({'name': ['The player name should have at least 3 characters']})
            if PlayerModel.objects.filter(name__iexact=attrs['name']):
                raise ValidationError({'name': ['The player name is already taken']})
        return super().validate(attrs)