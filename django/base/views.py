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
from rest_framework.viewsets import ViewSet

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

  def get(self, request: Request, handle: str = 'all'):
    data = self.queryset

    if handle == 'ongoing':
      data = data.filter(user_amount__user=request.user, 
                                  status="Ongoing")
    elif handle == 'request':
      data = data.filter(status='Pending')
    elif handle == 'pending':
      data = data.filter(host=request.user, status='Pending')
    elif handle == 'reject':
      data = data.filter(host=request.user, status='Reject')
    elif handle == 'host':
      data = data.filter(host=request.user, status='Ongoing')
    elif handle == 'all':
      data = data.all()
    else:
      response_dict = {
        'message': 'handle doesnt exist'
      }
      return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
    
    _serializer = self.serializer_class(data, many=True)
    return Response(_serializer.data, status=status.HTTP_200_OK)
  
  def post(self, request: Request, handle: str = None):
    bill_split_data = {
      **request.data.copy(),  
      'status': 'Ongoing' if request.user.is_superuser else 'Pending'
    }

    _serializer = serializer.BillSplitSerializer(data=bill_split_data)
    if _serializer.is_valid():
      _serializer.save()
      return Response({}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

  def put(self, request: Request, handle: str = None):
    update_data = request.data

    if handle == 'edit':
      update_data['status'] = 'Pending'
    elif handle == 'accept':
      update_data['status'] = 'Ongoing'
    elif handle == 'reject':
      update_data['status'] = 'Reject'
    else:
      response_dict = {
        'message': 'handle is incorrect'
      }
      print(response_dict)
      return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
    try:
      instance = self.queryset.get(pk=update_data.get('id'))
    except models.BillSplit.DoesNotExist:
      response_dict = {
        'message': 'Bill Split data does not exist'
      }
      print(response_dict)
      return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
    

    _serializer = serializer.BillSplitSerializer(instance, data=update_data, 
                                                 partial=True)
    if _serializer.is_valid():
      _serializer.save()
      response_dict = {
        'message': 'Successfully Updating Bill Split Data'
      }
      print(response_dict)
      return Response(response_dict, status=status.HTTP_200_OK)
    response_dict = {
      'message': 'bill split data is invalid',
      'errors': _serializer.errors
    }
    print(response_dict)
    return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
  
  def delete(self, request: Request, handle: str):
    try:
      instance = models.BillSplit.objects.get(id=request.data['id'])
      instance.delete()
      return Response({}, status=status.HTTP_200_OK)
    except:
      response_dict = {
        'message': 'cant find the Bill Split data',
      }
      return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)

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

class UserRegisterView(APIView):
  
  def post(self, request: Request):
    new_user_serializer = serializer.RegisterUserSerializer(data=request.data)

    if new_user_serializer.is_valid():
      new_user_serializer.save()
      new_user_object = models.User.objects.get(username=request.data.get('username'))
      profile_image = models.UserProfileImage(user=new_user_object)
      profile_image.save()
      return Response({}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


class CheckValidUsernameView(ViewSet):

  def retrieve(self, request: Request):
    username = request.data.get('username')
    query = models.User.objects.filter(username=username)
    return Response(query.count() == 0, status=status.HTTP_200_OK)
      
class UserProfileView(ViewSet):

  def retrieve(self, request: Request):
    username = request.data.get('username')

    try:
      user = models.User.objects.get(username=username)
    except models.User.DoesNotExist:
      return Response({}, status=status.HTTP_400_BAD_REQUEST)

    bank_data = models.BankData.objects.filter(owner=user)
    try:
      telegram_info = models.TelegramInfo.objects.get(user=user)
    except models.TelegramInfo.DoesNotExist:
      telegram_info = models.TelegramInfo(user=user, telegram_username="")

    return Response({
      "bank_info": serializer.BankDataSerializer(bank_data, many=True).data,
      "telegram_info": serializer.TelegramInfoSerializer(telegram_info).data,
      "email": user.email 
    }, status=status.HTTP_200_OK)