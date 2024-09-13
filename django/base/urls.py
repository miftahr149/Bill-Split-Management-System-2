from . import views

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
  TokenRefreshView
)

urlpatterns = [
  path('', views.getRoutes, name='get_routes'),
  path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
  path('userImage/', views.UserProfileImageViews.as_view(), name='user_image'),
  path('userImage/get', views.GetProfileImageViews.as_view(), 
       name='get_user_image'),
  path('billSplit/user', views.UserBillSplitView.as_view(), name='tag'),
  
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)