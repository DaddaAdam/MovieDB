from django.urls import path
from . import views

urlpatterns = [
    path('top250TV/', views.getTop250TV),
    path('trending-tv/', views.getTrendingTV),
    path('actor/<str:actor_name>/', views.getActorByName),
    path('actor/<str:actor_name>/all', views.getCreditsByActor),
    path('actor/<str:actor_name>/movies', views.getMoviesByActor),
    path('actor/<str:actor_name>/tv', views.getTvShowsByActor),
    path('movies/<str:movie_name>/', views.getMoviesByName)
]
