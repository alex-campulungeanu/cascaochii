from loguru import logger
from django.http.response import Http404
from rest_framework.views import APIView
from django.db.models import QuerySet
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema

from game.models import GameModel, QuestionModel, PlayerModel, PlayerGameModel
from game.serializers import GameSerializer, PlayerSerializer, QuestionSerializer, PlayerGameCreateSerializer, PlayerGameSerializer
from utils.permissions import method_permission_classes
from game.permissions import UserCanAddGame

# Create your views here.

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_all_games(request):
#     logger.info('Fetching the games')
#     games: QuerySet[Game] = Game.objects.all()
#     serializer = GameSerializer(games, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_game(request):
#     logger.info('Adding a game')
#     serializer: GameSerializer = GameSerializer(data = request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status = status.HTTP_201_CREATED)
#     return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class GameList(APIView):
    # permission_classes = [UserCanAddGame]
    def get(self, request, format=None):
        logger.info(f'Fetching all games')
        games: QuerySet[GameModel] = GameModel.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

    @method_permission_classes((UserCanAddGame,))
    def post(self, request, format=None):
        logger.info(f'Add new game')
        serializer: GameSerializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDetail(APIView):
    def get_object(self, pk):
        try:
            return GameModel.objects.get(pk=pk)
        except GameModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        logger.info(f'Fetch game with id {pk}')
        game: GameModel = self.get_object(pk)
        serializer: GameSerializer = GameSerializer(game)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        logger.info(f'Updating game with id: {pk}')
        game: GameModel= self.get_object(pk)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        logger.info(f'Delete game with id: {pk}')
        game: GameModel = self.get_object(pk)
        game.delete()
        return Response(f'Game {game.name} deleted', status=status.HTTP_200_OK)

class QuestionList(APIView):
    def get(self, request, format=None):
        logger.info(f'Fetching all questions')
        questions: QuerySet[QuestionModel] = QuestionModel.objects.all()
        serializer =QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        logger.info(f'Add new question {request.data} ')
        logger.info(request.data['game'])
        # game = Game.objects.get(id=request.data['game'])
        serializer: QuestionSerializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GameQuestionList(APIView):
    def get(self, request, pk, format=None):
        logger.info(f'Fetching all questions from game: {pk}')
        questions: QuerySet[QuestionModel] = QuestionModel.objects.all().filter(game=pk)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class QuestionDetail(APIView):
    def get_object(self, pk):
        try:
            return QuestionModel.objects.get(pk=pk)
        except QuestionModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        logger.info(f'Fetch question with id {pk}')
        question: QuestionModel = self.get_object(pk)
        serializer: QuestionSerializer = QuestionSerializer(question)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        logger.info(f'Updating game with id: {pk}')
        question: QuestionModel= self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        logger.info(f'Delete questoin with id: {pk}')
        question: QuestionModel = self.get_object(pk)
        question.delete()
        return Response(f'Question {question.name} deleted', status=status.HTTP_204_NO_CONTENT)


class PlayerList(APIView):
    def get(self, request, format=None):
        logger.info(f'Fetching all players')
        players: QuerySet[PlayerModel] = PlayerModel.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    def post(self, request: Request, game_id, format=None):
        logger.info(f'Assign new player {request.data} on game with id {game_id}')
        request_data=request.data
        current_game = GameModel.objects.get(id=game_id)
        new_player = PlayerModel.objects.get(id=request_data['id']) # type: ignore
        current_game.players.add(new_player)
        return Response('Success', status=status.HTTP_201_CREATED)
        # game = Game.objects.get(id=request.data['game'])
        # player_serializer: PlayerSerializer = PlayerSerializer(data=request.data)
        # print(player_serializer.initial_data)
        # if player_serializer.is_valid():
        #     # TODO: should i catch here if something is happening when saving the new player
        #     new_player = player_serializer.save()
        #     current_game: GameModel = GameModel.objects.get(pk=game_id)
        #     current_game.players.add(new_player)
        #     return Response(player_serializer.data, status=status.HTTP_201_CREATED)
        # return Response(player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GamePlayerList(APIView):
    @swagger_auto_schema(responses={status.HTTP_200_OK: PlayerSerializer(many=True)})
    def get(self, request, game_id, format=None):
        logger.info(f'Fetching all players from game: {game_id}')
        game: GameModel = GameModel.objects.get(pk=game_id)
        pgm = PlayerGameModel.objects.all().order_by('player_id').filter(game=game)
        pgm_serializer = PlayerGameSerializer(pgm, many=True)
        # players_for_game = PlayerModel.objects.all().filter(gamemodel=game)
        # serializer = PlayerSerializer(players_for_game, many=True)
        return Response(pgm_serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, game_id):
        logger.info('Updating the relation between players and games')
        request_data = request.data
        request_validation = PlayerGameCreateSerializer(data=request_data)
        if request_validation.is_valid():
            current_game = GameModel.objects.get(pk=game_id)
            # print(request_validation.player_id)
            current_player = PlayerModel.objects.get(pk=request_data['player_id'])
            current_relation = PlayerGameModel.objects.filter(game=current_game, player=current_player)
            for relation in current_relation:
                relation.score = request_data['score']
                relation.save()
            return Response('ok', status=status.HTTP_201_CREATED)
        else:
            print(request_validation.errors)
            return Response('not ok', status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, game_id, player_id):
        logger.info("Delete the player {player_id} from game {game_id}")
        game = GameModel.objects.get(pk=game_id)
        player = PlayerModel.objects.get(pk=player_id)
        relation = PlayerGameModel.objects.filter(game=game, player=player)
        relation.delete()
        return Response('Deleted', status=status.HTTP_204_NO_CONTENT)
    
class PlayerDetail(APIView):
    def get_object(self, pk):
        try:
            return PlayerModel.objects.get(pk=pk)
        except PlayerModel.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        logger.info(f'Fetch player with id {pk}')
        player: PlayerModel = self.get_object(pk)
        serializer: PlayerSerializer = PlayerSerializer(player)
        return Response(serializer.data)
    
    @swagger_auto_schema(request_body=PlayerSerializer)
    def put(self, request, pk, format=None):
        logger.info(f'Updating player with id: {pk}')
        player: PlayerModel= self.get_object(pk)
        serializer = PlayerSerializer(player, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        logger.info(f'Delete player with id: {pk}')
        player: PlayerModel = self.get_object(pk)
        player.delete()
        return Response(f'Player {player.name} deleted', status=status.HTTP_204_NO_CONTENT)
