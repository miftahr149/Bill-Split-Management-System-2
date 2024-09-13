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


def profile_image_views(user: models.User) -> Response:
  try:
    profile_image = models.UserProfileImage.objects.get(user=user)
  except models.UserProfileImage.DoesNotExist:
    profile_image = models.UserProfileImage.objects.create(user=user)
  response_serializer = serializer.UserProfileImageSerializer(profile_image)
  return Response(response_serializer.data)

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
  """
  Use to return a link of a user's image with authtentication tokens
  """
  
  parser_classes = (FileUploadParser, MultiPartParser)
  permission_classes = [IsAuthenticated]
  
  def get(self, request: Request, format='jpg'):
    user = models.User.objects.get(username=request.user.username)
    return profile_image_views(user)

class GetProfileImageViews(APIView):
  """
  Use to return a link of a user's image with username as input
  """
  permission_classes = [IsAuthenticated]

  def post(self, request: Request):
    username = request.data.get('username')
    user = models.User.objects.get(username=username)
    return profile_image_views(user)

class UserBillSplitView(APIView):
  """ 
  Use to return a list of bill split that involve the user
  """
  
  permission_classes = [IsAuthenticated]
  
  def get(self, request: Request, format=None):
    user = models.User.objects.get(username=request.user.username)
    bill_splits = models.BillSplit.objects.filter(user_amount__user=user)
    bill_splits_serializer = serializer.BillSplitSerializer(bill_splits, 
                                                            many=True)
    return Response(bill_splits_serializer.data, status=status.HTTP_200_OK)