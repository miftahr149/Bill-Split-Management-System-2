from . import models, serializer

from django.http import JsonResponse

from typing import TypedDict

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

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
  parser_classes = (FileUploadParser, MultiPartParser)
  permission_classes = [IsAuthenticated]
  
  def get(self, request: Request, format='jpg'):
    print(request.user.username)
    user = models.User.objects.get(username=request.user.username)
    try:
      profile_image = models.UserProfileImage.objects.get(user=user)
    except models.UserProfileImage.DoesNotExist:
      profile_image = models.UserProfileImage.objects.create(user=user)
    response_serializer = serializer.UserProfileImageSerializer(profile_image)
    return Response(response_serializer.data) 

class TagViews(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request: Request, format=None):
    tags = models.Tag.objects.all()
    return Response(serializer.TagSerializer(tags, many=True).data)