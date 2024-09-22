from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import TypedDict
from . import models 

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



class TokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['username'] = user.username
    return token

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.User
    fields = ['username']

class UserProfileImageSerializer(serializers.ModelSerializer):
  user = UserSerializer() 
  
  class Meta:
    model = models.UserProfileImage
    fields = ['image', 'user']

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Tag
    fields = ['name']



class UserAmountSerializer(serializers.ModelSerializer):
  user = UserSerializer()
    
  class Meta:
    model = models.UserAmount
    fields = ['user', 'amount', 'receipt']

class BillSplitSerializer(serializers.ModelSerializer):
  host = UserSerializer()
  tag = TagSerializer(many=True)
  user_amount = UserAmountSerializer(many=True)
  
  class Meta:
    model = models.BillSplit
    fields = ['name', 'host', 'tag', 'description', 'user_amount', 'status']
  
  def create(self, validate_data: BillSplitDict):
    print('creating new bill split')
    host_data = validate_data.pop('host')
    host = models.User.objects.get(username=host_data['username'])


    def tag_map_func(data: TagDict):
      print(data)
      return models.Tag.objects.get(name=data['name'])
    
    tags: list[models.Tag] = map(tag_map_func, validate_data.pop('tag'))

    def user_amount_map_func(data: UserAmountDict):
      user_data = data.pop('user')
      user = models.User.objects.get(username=user_data['username'])
      return models.UserAmount.objects.create(user=user, **data)
    users_amount = map(user_amount_map_func, validate_data.pop('user_amount'))
    
    bill_split = models.BillSplit.objects.create(host=host, **validate_data)

    for tag in tags:
      bill_split.tag.add(tag)
    
    for user_amount in users_amount:
      bill_split.user_amount.add(user_amount)

    return bill_split