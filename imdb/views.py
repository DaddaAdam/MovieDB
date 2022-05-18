from operator import itemgetter
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils.text import slugify
from .credentials import API_KEY
import requests

# Create your views here.

def convertActorToId(actor_name):

    actor_name = slugify(actor_name)

    url = f"https://api.themoviedb.org/3/search/person?api_key={API_KEY}&language=en-US&query={actor_name}&include_adult=false"

    response = requests.request("GET", url=url, headers={}, data={})

    actor_id= response.json()['results'][0]['id']

    return actor_id
 
@api_view(['GET'])
def getTop250TV(request): 
    url = "https://imdb-api.com/en/API/Top250TVs/k_w2ktz9yi"

    headers= {}
    payload = {}

    response = requests.request("GET", url, headers=headers, data = payload)
    return Response(response.json())


@api_view(['GET'])
def getTrendingTV(request):
    url = f"https://api.themoviedb.org/3/trending/tv/week?api_key={API_KEY}"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json())


@api_view(['GET'])
def getActorByName(request, actor_name):

    actor_name = slugify(actor_name)

    url = f"https://api.themoviedb.org/3/search/person?api_key={API_KEY}&language=en-US&query={actor_name}&include_adult=false"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json())

@api_view(['GET'])
def getCreditsByActor(request, actor_name):

    actor_id = convertActorToId(actor_name=actor_name)

    print(actor_id)

    url = f"https://api.themoviedb.org/3/person/{actor_id}/combined_credits?sort_by=popularity.desc&api_key={API_KEY}&language=en-US"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json())

@api_view(['GET'])
def getMoviesByActor(request, actor_name):

    actor_id = convertActorToId(actor_name)

    url = f"https://api.themoviedb.org/3/person/{actor_id}/movie_credits?sort_by=popularity.desc&api_key={API_KEY}&language=en-US"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json())


@api_view(['GET'])
def getTvShowsByActor(request, actor_name):

    actor_id = convertActorToId(actor_name)

    url = f"https://api.themoviedb.org/3/person/{actor_id}/tv_credits?sort_by=popularity.desc&api_key={API_KEY}&language=en-US"

    response = requests.request("GET", url=url, headers={}, data={})

    print(response.json()["cast"][0]["popularity"])

    return Response(response.json())

@api_view(['GET'])
def getMoviesByName(request, movie_name):
    movie_name = slugify(movie_name)

    url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query={movie_name}&page=1&include_adult=false"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json())
