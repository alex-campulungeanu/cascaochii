from asyncio.log import logger
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.state import token_backend
from django.contrib.auth.hashers import make_password

from .models import CustomUser
from .serializers import UserSerializerWithToken

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        username = data.get('username')
        password = data.get('password')
        # check if user already exists
        find_user = CustomUser.objects.filter(username=username).first()
        if find_user:
            return Response({'message': 'User already exist !'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.create(
                first_name = first_name,
                last_name = last_name,
                username = username,
                password = make_password(password)
            )
            serializer = UserSerializerWithToken(user, many=False)
        except Exception as e:
            print(e)
            return Response({'message': 'Unable to create user'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
            

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data

    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #     token['username'] = user.username
    #     token['first_name'] = user.first_name
    #     token['last_name'] = user.last_name
    #     return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # decoded_payload = token_backend.decode(data['access'], verify=True)
        # print(decoded_payload)
        # user_uid = decoded_payload['user_id']
        # data.update({'custom_field': 'custom_data'})
        return data

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer


@api_view(['GET'])
def testAuth(request):
    return Response('Auth app is working')