from django.urls import path, include
from . import views

urlpatterns = [
  path('codeverification/generate', views.GenerateCodeVerificationView.as_view()),
]