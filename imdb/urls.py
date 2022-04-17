from django.urls import path
from . import views

urlpatterns = [
    path('top250TV', views.getTop250TV)
]
