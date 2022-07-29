from loguru import logger
from typing import List

from django.http.response import Http404
from rest_framework.views import APIView
from django.db.models import QuerySet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from game.models import Game, Question, Player
from game.serializers import GameSerializer, PlayerSerializer, QuestionSerializer

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
    def get(self, request, format=None):
        logger.info(f'Fetching all games')
        games: QuerySet[Game] = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        logger.info(f'Add new game')
        serializer: GameSerializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameDetail(APIView):
    def get_object(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except Game.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        logger.info(f'Fetch game with id {pk}')
        game: Game = self.get_object(pk)
        serializer: GameSerializer = GameSerializer(game)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        logger.info(f'Updating game with id: {pk}')
        game: Game= self.get_object(pk)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        logger.info(f'Delete game with id: {pk}')
        game: Game = self.get_object(pk)
        game.delete()
        return Response(f'Game {game.name} deleted', status=status.HTTP_204_NO_CONTENT)

class QuestionList(APIView):
    def get(self, request, format=None):
        logger.info(f'Fetching all questions')
        questions: QuerySet[Question] = Question.objects.all()
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
        questions: QuerySet[Question] = Question.objects.all().filter(game=pk)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

class QuestionDetail(APIView):
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        logger.info(f'Fetch question with id {pk}')
        question: Game = self.get_object(pk)
        serializer: QuestionSerializer = QuestionSerializer(question)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        logger.info(f'Updating game with id: {pk}')
        question: Question= self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        logger.info(f'Delete questoin with id: {pk}')
        question: Question = self.get_object(pk)
        question.delete()
        return Response(f'Question {question.name} deleted', status=status.HTTP_204_NO_CONTENT)


class PlayerList(APIView):
    def get(self, request, format=None):
        logger.info(f'Fetching all players')
        players: QuerySet[Player] = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        logger.info(f'Add new player {request.data} ')
        # game = Game.objects.get(id=request.data['game'])
        serializer: PlayerSerializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GamePlayerList(APIView):
    def get(self, request, pk, format=None):
        logger.info(f'Fetching all players from game: {pk}')
        players: QuerySet[Player] = Player.objects.all().filter(game=pk).order_by('id')
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data)

class PlayerDetail(APIView):
    def get_object(self, pk):
        try:
            return Player.objects.get(pk=pk)
        except Player.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        logger.info(f'Fetch player with id {pk}')
        player: Player = self.get_object(pk)
        serializer: PlayerSerializer = PlayerSerializer(player)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        logger.info(f'Updating player with id: {pk}')
        player: Player= self.get_object(pk)
        serializer = PlayerSerializer(player, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        logger.info(f'Delete player with id: {pk}')
        player: Player = self.get_object(pk)
        player.delete()
        return Response(f'Player {player.name} deleted', status=status.HTTP_204_NO_CONTENT)
