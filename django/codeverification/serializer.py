from . import models
from rest_framework import serializers
from django.contrib.auth.models import User

class CodeVerificationSerializer(serializers.ModelSerializer):
  code_verification = serializers.CharField(required=False)

  class Meta:
    model = models.CodeVerification
    fields = '__all__'

class VerifyCodeVerificationSerializer(serializers.Serializer):
  code_verification = serializers.CharField(max_length=4)
  user = serializers.CharField()

  def validate_user(self, value):
    try:
      User.objects.get(username=value)
      return value
    except User.DoesNotExist:
      return serializers.ValidationError("username can't be found")


  def create(self, validated_data):
    user = User.objects.get(username=validated_data.pop('user'))
    return models.CodeVerification.objects.get(user=user, **validated_data)