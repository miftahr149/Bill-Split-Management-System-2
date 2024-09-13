from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models

class TokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['username'] = user.username
    return token

class UserProfileImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.UserProfileImage
    fields = ['image']

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Tag
    fields = ['name']


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.User
    fields = ['username']

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
    fields = '__all__'