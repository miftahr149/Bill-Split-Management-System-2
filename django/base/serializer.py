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
    fields = '__all__'
