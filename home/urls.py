from django.urls import path, include
from . import views
from home.controller.pokedexController import get_info_pokemon
from home.controller.pokedexController import get_all_pokemons

urlpatterns = [
    path('', views.index, name="index"),
    path('pokemons/', get_all_pokemons, name="get_all_pokemons"),
    path('pokemon/', get_info_pokemon, name="get_pokemon_info"),
    path('equipe/', views.equipe, name="equipe"),
]