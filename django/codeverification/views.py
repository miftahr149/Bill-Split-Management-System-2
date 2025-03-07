from django.shortcuts import render
from . models import CodeVerification
from . serializer import CodeVericationSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Request, Response
from rest_framework import status

# Create your views here.
class GenerateCodeVerificationView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request: Request) -> Response:
    try:
      CodeVerification.objects.get(user=request.user)
      return Response({
        'message': 'you already generate code verification for your acccount'
      }, status=status.HTTP_400_BAD_REQUEST)
    except CodeVerification.DoesNotExist:
      pass
    
    data = {
      'user': request.user,
      'new_email': request.data.get('new_user')
    }
    _serializer = CodeVericationSerializer(data=data)
    return Response(_serializer.data, status=status.HTTP_200_OK)
    