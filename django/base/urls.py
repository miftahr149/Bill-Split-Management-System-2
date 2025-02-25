from . import views

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
  TokenRefreshView
)

urlpatterns = [
  path('token/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
  path('userImage/', views.UserProfileImageViews.as_view(), name='user_image'),
  path('billSplit/<str:handle>', views.BillSplitView.as_view(), 
       name='billSplit'),
  path('tag', views.TagsView.as_view(), name='tag'),
  path('getUsers', views.GetUsersView.as_view(), name='get_user'),
  path('registerUser', views.UserRegisterView.as_view(), name='register_user'),
  path('isUsernameValid', views.CheckValidUsernameView.as_view({'post':'retrieve'})),
  path('getUserProfileInfo', views.UserProfileView.as_view({'post':'retrieve'}))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)