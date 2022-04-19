from django.urls import path
from . import views

urlpatterns = [
    path('top250TV/', views.getTop250TV),
    path('trending-tv/', views.getTrendingTV),
    path('actor/<str:actor_name>/', views.getActorByName),
    path('movies/<str:actor_name>/', views.getMoviesByActor)
]
