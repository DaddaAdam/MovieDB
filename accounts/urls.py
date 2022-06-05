from django.urls import path
from . import views

urlpatterns = [
    path('get-user-details/<str:email>/', views.getUserDetails), 
]