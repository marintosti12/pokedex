import json

import requests
from django.core import serializers
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
    url_langages = "https://pokeapi.co/api/v2/pokemon-species/" + id
    data["name"] = get_french_name(url_langages, data["name"])
    return JsonResponse({"data": data}, status = 200)

def get_french_name(url, default):
    response = requests.get(url)
    data = response.json()
    for d in data["names"]:
        if d["language"]["name"] == "fr":
            return d["name"]

    return default


def get_all_pokemons(request):
    pagination = int(request.GET.get('pagination', 0))
    state = request.GET.get('state', '')

    if state == 'add':
        pagination = pagination + 20

    if state == 'remv':
        pagination = pagination - 20
        if pagination < 0:
            pagination = 0

    response = requests.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset="+str(pagination))
    data = response.json()
    pokemons = []

    for result in data["results"]:
        url_langages = "https://pokeapi.co/api/v2/pokemon-species/"+get_id_from_url(result["url"])
        pokemon = Pokemon(name=get_french_name(url_langages, result["name"]), id=get_id_from_url(result["url"]))
        pokemons.append(pokemon)

    result = {
        'pokemons': serializers.serialize('json', pokemons),
        'pagination': pagination,
        'next': pagination + 20
    }
    return JsonResponse(result, status=200)
