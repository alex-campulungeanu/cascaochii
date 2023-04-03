from django.db.models import QuerySet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from loguru import logger

from housekeeping.permissions import UserHasRole
from housekeeping.models import PlayerModel
from housekeeping.serializers import PlayerSerializer, PlayerUpdateSerializer
from utils.permissions import method_permission_classes
# Create your views here.

@api_view(['GET'])
# @method_permission_classes((UserHasRole,))
# @permission_classes([UserHasRole])
def get_all_players(request: Request):
    logger.info('Fetching all players')
    players: QuerySet[PlayerModel] = PlayerModel.objects.all().order_by('id')
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['POST'])
# @method_permission_classes((UserHasRole,))
# @permission_classes([UserHasRole])
def add_player(request: Request):
    logger.info('Add new player')
    request_data = request.data
    player_serializer = PlayerSerializer(data=request_data) # type: ignore
    if player_serializer.is_valid():
        player_serializer.save()
        return Response(f"Player with name {request_data['name']} created", status=status.HTTP_201_CREATED)
    else:
        logger.error('Some error when validating')
        logger.error(player_serializer.errors)
        return Response(player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])    
def update_player(request: Request, player_id: int):
    logger.info(f"Update player with id {player_id}")
    request_data = request.data
    player: PlayerModel = PlayerModel.objects.get(pk=player_id)
    player_serializer = PlayerUpdateSerializer(player, data=request_data)
    if player_serializer.is_valid():
        print(player_serializer.validated_data)
        player_serializer.save()
        return Response(player_serializer.data, status=status.HTTP_200_OK)
    else:
        logger.error(player_serializer.errors)
        return Response(player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_player(request: Request, player_id: int):
    logger.info(f"Delete player with id {player_id}")
    player: PlayerModel = PlayerModel.objects.get(pk=player_id)
    player.delete()
    return Response('Player deleted', status=status.HTTP_200_OK)