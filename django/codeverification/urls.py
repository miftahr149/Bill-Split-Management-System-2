from django.urls import path, include
from . import views

urlpatterns = [
  path('generate', views.GenerateCodeVerificationView.as_view()),
  path('verify', views.VerifyCodeVerification.as_view())
]