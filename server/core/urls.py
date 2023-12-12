from django.urls import path
from core.views.profile import *
from core.views.accounts import *
from core.views.reset_password import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Accounts
    path('account/create/', AccountCreationView.as_view({'post':'create'})),
    path('account/verify-email/', AccountVerificationView.as_view({'post':'verify_email'})),
    path('account/send-verification-email/', AccountVerificationView.as_view({'post':'send_verification_email'})),
    #password reset
    path('account/password-reset-request/', PasswordResetView.as_view({'post':'password_reset_request'})),
    path('account/password-reset-confirm/', PasswordResetView.as_view({'post':'password_reset_confirm'})),
    #profile
    path('profile/create/', ProfileView.as_view({'post':'create'})),
    path('profile/update/', ProfileView.as_view({'post':'update'})),
    
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
