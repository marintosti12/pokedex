from django.urls import path, include
from . import views
from home.controller.pokedexController import get_info_pokemon

urlpatterns = [
    path('', views.index, name="index"),
    path('pokemon/', get_info_pokemon, name="get_pokemon_info"),
    path('equipe/', views.equipe, name="equipe"),
]