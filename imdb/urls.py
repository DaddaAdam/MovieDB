from django.urls import path
from . import views

urlpatterns = [
    path('trending/<str:category>/', views.getTrending),
    path('actor/<str:actor_name>/', views.getActorByName),
    path('actor/<str:actor_name>/<str:category>/', views.getCreditsByActor),
    path('movies/<str:movie_name>/', views.getMoviesByName)
]
