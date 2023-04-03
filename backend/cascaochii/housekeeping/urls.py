from django.urls import path

from housekeeping import views

urlpatterns = [
    path('housekeeping/players/', views.get_all_players),
    path('housekeeping/players/add', views.add_player),
    path('housekeeping/players/<int:player_id>/update', views.update_player),
    path('housekeeping/players/<int:player_id>/delete', views.delete_player),
]