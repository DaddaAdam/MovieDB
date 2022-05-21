from django.urls import path
from . import views

urlpatterns = [
    path('trending/<str:category>/', views.getTrending),
    path('actor/<str:actor_name>/', views.getActorByName),
    path('actor/<str:actor_name>/<str:category>/', views.getCreditsByActor),
    path('search/<str:media_type>/<str:query>/', views.getMultiSearch),
    path('recommendations/<int:id>/<str:media_type>/', views.getMediaRecommendations)
]
