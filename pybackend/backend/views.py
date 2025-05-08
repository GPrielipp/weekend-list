from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

import sys

@api_view(['GET'])
def same_squad(request, squad):
    """Get all Users that have the squad requested"""
    if request.method != 'GET':
        return Response(status=status.HTTP_404_NOT_FOUND)

    # this should not error in future builds
    try:
        users = User.objects.get(squad=squad)
        friendlyData = UserSerializer(users)
        return Response(data=friendlyData.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(f'ERROR: {e}', file=sys.stderr)
        if squad > 3 or squad < 0:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def create_me(request):
    COVIEW = 0b100000
    CoC = 0b010000
    PLT = 0b001000
    SQD = 0b000100
    CDO = 0b000010
    WEEKEND = 0b000001

    # save a copy of my stuff to the database
    me = User(
		alpha= 265112,
		fname= 'George',
		lname= 'Prielipp',
		permissions= WEEKEND | SQD | CDO,
		company= 22,
		platoon= 4,
		squad= 3,
		phone= 9894924119,
		weekendCount= 12,
		spiritPasses= 0,
	)

    # write it to the db
    me.save()

    return Response(status=status.HTTP_201_CREATED)