from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import RoleModel

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleModel
        fields =  ('name',)

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    first_name = serializers.CharField(read_only=True)
    last_name = serializers.CharField(read_only=True)
    active = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    roles = RolesSerializer(many=True)

class UserSerializerWithToken(UserSerializer):
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    def get_access(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)
    
