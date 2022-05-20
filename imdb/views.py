from rest_framework import status
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
def getTrending(request, category):

    if category not in ('movie', 'tv', 'person'):
        category = 'all'

    url = f"https://api.themoviedb.org/3/trending/{category}/week?api_key={API_KEY}"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json(), status=status.HTTP_200_OK)


@api_view(['GET'])
def getActorByName(request, actor_name):

    actor_name = slugify(actor_name)

    url = f"https://api.themoviedb.org/3/search/person?api_key={API_KEY}&language=en-US&query={actor_name}&include_adult=false"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json(), status=status.HTTP_200_OK)

@api_view(['GET'])
def getCreditsByActor(request, actor_name, category):

    actor_id = convertActorToId(actor_name=actor_name)

    if category not in ('movie', 'tv'):
        category = 'combined'


    url = f"https://api.themoviedb.org/3/person/{actor_id}/{category}_credits?sort_by=popularity.desc&api_key={API_KEY}&language=en-US"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json(), status=status.HTTP_200_OK)

@api_view(['GET'])
def getMoviesByName(request, movie_name):
    movie_name = slugify(movie_name)

    url = f"https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=en-US&query={movie_name}&page=1&include_adult=false"

    response = requests.request("GET", url=url, headers={}, data={})

    return Response(response.json(), status=status.HTTP_200_OK)
