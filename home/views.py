from django.shortcuts import render

from home.controller.pokedexController import get_all_pokemons


# Create your views here.

def index(request):
    passed_data = {
        'pokemons': get_all_pokemons()
    }
    return render(request, "home/index.html", passed_data)


def equipe(request):
    return render(request, "home/equipe.html")
