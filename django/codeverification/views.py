from django.shortcuts import render
from . models import CodeVerification
from . serializer import CodeVerificationSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import Request, Response
from rest_framework import status

# Create your views here.
class GenerateCodeVerificationView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request: Request) -> Response:
    print("Generating Code Verification")
    
    try:
      CodeVerification.objects.get(user=request.user)
      return Response({
        'message': 'you already generate code verification for your acccount'
      }, status=status.HTTP_406_NOT_ACCEPTABLE)
    except CodeVerification.DoesNotExist:
      pass
    
    data = {
      'user': request.user.id,
      'new_email': request.data.get('new_email')
    }
    _serializer = CodeVerificationSerializer(data=data)

    if _serializer.is_valid(raise_exception=True):
      _serializer.save()
      
      return Response({
        'code_verification': _serializer.data['code_verification'],
      }, status=status.HTTP_200_OK)
    
    print('fail to generate code verification')
    return Response({
      'message': 'fail to generate code verification'
    }, status=status.HTTP_400_BAD_REQUEST)
    