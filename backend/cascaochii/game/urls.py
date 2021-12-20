from rest_framework import routers, urlpatterns
from django.urls import path

from .api import GameViewSet
from game import views

# router = routers.DefaultRouter()
# router.register('api/game', GameViewSet, basename='game')
# urlpatterns = router.urls

urlpatterns = [
    path('api/games/', views.GameList.as_view()),
    path('api/games/<int:pk>/', views.GameDetail.as_view()),
    
    path('api/questions/', views.QuestionList.as_view()),
    path('api/<int:pk>/questions/', views.GameQuestionList.as_view()),
    path('api/questions/<int:pk>/', views.QuestionDetail.as_view()),

    path('api/players/', views.PlayerList.as_view()),
    path('api/<int:pk>/players/', views.GamePlayerList.as_view()),
    path('api/players/<int:pk>/', views.PlayerDetail.as_view()),
]