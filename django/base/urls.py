from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
  TokenRefreshView
)

urlpatterns = [
  path('', views.getRoutes, name='get_routes'),
  path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
  path('userImage/', views.UserProfileImageViews.as_view(), name='user_image'),
  path('tag', views.TagViews.as_view(), name='tag'),
]