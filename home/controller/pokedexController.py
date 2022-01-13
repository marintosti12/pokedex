import requests
from django.http import JsonResponse

from home.models.Pokemon import Pokemon

def get_id_from_url(url):
    id = ""
    index = -2
    while url[index] != '/':
        id += url[index]
        index = index - 1

    return id[::-1]

def get_info_pokemon(request):
    id = request.GET.get('id','')
    url = "https://pokeapi.co/api/v2/pokemon/" + id + "/"
    print(url)
    response = requests.get(url)
    data = response.json()
    return JsonResponse({"data": data}, status = 200)


def get_all_pokemons():
    response = requests.get("https://pokeapi.co/api/v2/pokemon")
    data = response.json()
    pokemons = []

    for result in data["results"]:
        pokemon = Pokemon(name=result["name"], id=get_id_from_url(result["url"]))
        pokemons.append(pokemon)
    return pokemons
