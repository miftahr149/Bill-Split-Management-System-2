from . import models, serializer

from django.http import JsonResponse

from typing import TypedDict

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/token',
    'api/token/refresh'
  ]

  return JsonResponse(routes, safe=False)

class TokenObtainPairView(TokenObtainPairView):
  serializer_class = serializer.TokenObtainPairSerializer

class UserProfileImageViews(APIView):
  
  def post(self, response: Response):
    profile_image_serializer = serializer.UserProfileImageSerializer(
      response.FILES['image'])