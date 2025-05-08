from django.urls import path
from .views import *

urlpatterns = [
    path('same/squad/<int:squad>/', same_squad, name='same_squad'),
    path('create_me/', create_me, name='create_me'),
]