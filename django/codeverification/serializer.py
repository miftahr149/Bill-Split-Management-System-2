from . import models
from rest_framework import serializers

class CodeVericationSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.CodeVerification
    fields = ['code_verification']