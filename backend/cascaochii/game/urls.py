from rest_framework import routers, urlpatterns
from django.urls import path

# from .api import GameViewSet
from game import views

# router = routers.DefaultRouter()
# router.register('api/game', GameViewSet, basename='game')
# urlpatterns = router.urls

urlpatterns = [
    path('game/games/', views.GameList.as_view()),
    # path('game/games/', views.get_all_games),
    # path('game/games/', views.add_game),
    path('game/games/<int:pk>/', views.GameDetail.as_view()),
    
    path('game/questions/', views.QuestionList.as_view()),
    path('game/<int:pk>/questions/', views.GameQuestionList.as_view()),
    path('game/questions/<int:pk>/', views.QuestionDetail.as_view()),

    path('game/<int:game_id>/player/assign', views.PlayerList.as_view()),
    path('game/<int:game_id>/player/update', views.PlayerDetail.as_view()),
    path('game/<int:game_id>/players/', views.GamePlayerList.as_view()),
    path('game/<int:game_id>/player/<int:player_id>/delete/', views.GamePlayerList.as_view()),
    
    path('game/<int:game_id>/gameplayer/update', views.GamePlayerList.as_view()),
    
    path('game/player/<int:player_id>update/', views.PlayerDetail.as_view()),
]