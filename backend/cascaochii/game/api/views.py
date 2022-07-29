from asyncio.log import logger
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # TODO: check if i can regroup user info into a single attribute inside token e.g. token['user]['username'] = user.username
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getHealth(request):
    routes = [
        '/api/health',
        '/api/health2',
    ]
    return Response('Everything ok !')