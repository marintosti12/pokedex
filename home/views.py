from django.shortcuts import render

from home.controller.pokedexController import get_all_pokemons


# Create your views here.

def index(request):
    api_call = get_all_pokemons(request)

    return render(request, "home/index.html", api_call)


def equipe(request):
    return render(request, "home/equipe.html")
