from django.shortcuts import render

from home.controller.pokedexController import get_all_pokemons


# Create your views here.

def index(request):
    return render(request, "home/index.html")


def equipe(request):
    return render(request, "home/equipe.html")
