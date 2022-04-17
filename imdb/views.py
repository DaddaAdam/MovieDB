from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

# Create your views here.

@api_view(['GET'])
def getTop250TV(request): 
    url = "https://imdb-api.com/en/API/Top250TVs/k_w2ktz9yi"

    headers= {}
    payload = {}

    response = requests.request("GET", url, headers=headers, data = payload)
    return Response(response.json())

