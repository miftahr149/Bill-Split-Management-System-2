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

# Typed Dict
class UserDict(TypedDict):
  username: str

class TagDict(TypedDict):
  name: str

class UserAmountDict(TypedDict):
  user: UserDict
  receipt: str
  amount: int

class BillSplitDict(TypedDict):
  name: str
  host: UserDict
  tag: list[TagDict]
  description: str
  user_amount: list[UserAmountDict]
  status: str

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

class BillSplitView(APIView):
  """
  Class that handle an api regarding Bill Split models

  get: retrieve bill-split data based on the variable 'handle'
  post: create bill-split data
  """
  permission_classes = [IsAuthenticated]
  serializer_class = serializer.BillSplitSerializer
  queryset = models.BillSplit.objects.all()

  def create_bill_split(self, validate_data: BillSplitDict):
    print('creating new bill split')
    host_data = validate_data.pop('host')
    host = models.User.objects.get(username=host_data['username'])

    def tag_map_func(data: TagDict):
      return models.Tag.objects.get(name=data['name'])
    
    tags: list[models.Tag] = map(tag_map_func, validate_data.pop('tag'))

    def user_amount_map_func(data: UserAmountDict):
      user_data = data.pop('user')
      user = models.User.objects.get(username=user_data['username'])
      return models.UserAmount.objects.create(user=user, **data)
    
    users_amount = map(user_amount_map_func, validate_data.pop('user_amount'))
    
    bill_split = models.BillSplit.objects.create(host=host, **validate_data)
    for tag in tags: bill_split.tag.add(tag)
    for user_amount in users_amount: bill_split.user_amount.add(user_amount)

    return bill_split

  def get(self, request: Request, handle: str = 'user'):
    data: models.BillSplit

    if handle == 'user':
      user = models.User.objects.get(username=request.user.username)
      data = self.queryset.filter(user_amount__user=user)
    
    _serializer = self.serializer_class(data, many=True)
    return Response(_serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request: Request, handle: str = None):
    bill_split_data = {
      **request.data.copy(),  
      'status': 'Ongoing' if request.user.is_superuser else 'Pending'
    }

    self.create_bill_split(bill_split_data)
    return Response({}, status=status.HTTP_200_OK)
    
    


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
