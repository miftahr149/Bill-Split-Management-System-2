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
class TokenObtainPairView(TokenObtainPairView):
  serializer_class = serializer.TokenObtainPairSerializer

class UserProfileImageViews(generics.ListCreateAPIView):
  """
  Use to return a link of a user's image with authtentication tokens
  """
  
  parser_classes = (FileUploadParser, MultiPartParser)
  permission_classes = [IsAuthenticated]
  queryset = models.UserProfileImage.objects.all()
  serializer_class = serializer.UserProfileImageSerializer

  def list(self, request: Request):
    queryset = self.get_queryset()
    _serializer = serializer.UserProfileImageSerializer(queryset, many=True)
    return Response(_serializer.data)

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

class TagsView(generics.ListCreateAPIView):
  """
  Use for create tags and get all the tags in the backend
  """
  permission_classes = [IsAuthenticated]
  queryset = models.Tag.objects.all()
  serializer_class = serializer.TagSerializer

class GetUsersView(generics.ListAPIView):
  """
  get all the user
  """
  permission_classes = [IsAuthenticated]
  queryset = models.User.objects.all()
  serializer_class = serializer.UserSerializer
