from rest_framework import viewsets, permissions

from game.models import Game
from .serializers import GameSerializer

# The first approach(simpler but alot underlyng changes)

# Game Viewset
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer