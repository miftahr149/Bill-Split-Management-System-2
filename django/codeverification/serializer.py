from . import models
from rest_framework import serializers
from django.contrib.auth.models import User

class CodeVerificationSerializer(serializers.ModelSerializer):
  code_verification = serializers.CharField(required=False)

  class Meta:
    model = models.CodeVerification
    fields = '__all__'