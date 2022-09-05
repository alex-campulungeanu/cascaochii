from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from . import views
from .views import MyTokenObtainPairView, RegisterView, MyTokenRefreshView

urlpatterns = [
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', RegisterView.as_view(), name='register'),
    path('token/refresh', MyTokenRefreshView.as_view(), name='token_refresh'),
]