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
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

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

class ValidateToken(APIView):
  permission_classes = [IsAuthenticated]
  
  def get(self, request: Request, format=None):
    JWT_authenticator = JWTAuthentication() 
    response = JWT_authenticator.authenticate(request)
    if response is not None:
      user, token = response
      print(user, token)
      return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

class UserBillSplitView(APIView):
  """ 
  Use to return a list of bill split that involve the user
  """
  
  permission_classes = [IsAuthenticated]
  
  def get(self, request: Request, format=None):
    user = models.User.objects.get(username=request.user.username)
    bill_splits = models.BillSplit.objects.filter(user_amount__user=user)
    print(bill_splits)
    bill_splits_serializer = serializer.BillSplitSerializer(
      bill_splits, many=True)
    return Response(bill_splits_serializer.data, status=status.HTTP_200_OK)