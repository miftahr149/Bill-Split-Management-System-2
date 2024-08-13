from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . import models

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.User
    fields = '__all__'

class TokenObtainPairSerializer(TokenObtainPairSerializer):
  @classmethod
  def get_token(cls, user):
    token = super().get_token(user)
    token['username'] = user.username
    return token
