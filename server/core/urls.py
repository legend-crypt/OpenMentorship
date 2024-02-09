from django.urls import path
from core.views.profile import *
from core.views.accounts import *
from core.views.reset_password import *
from core.views.mentors import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # Accounts
    path('accounts/create/', AccountCreationViewSet.as_view({'post':'create'})),
    path('accounts/verify-email/', AccountCreationViewSet.as_view({'post':'verify_email'})),
    path('accounts/send-verification-email/', AccountCreationViewSet.as_view({'post':'send_verification_email'})),
    #password reset
    path('accounts/password-reset-request/', PasswordResetViewset.as_view({'post':'password_reset_request'})),
    path('accounts/password-reset-confirm/', PasswordResetViewset.as_view({'post':'password_reset_confirm'})),
    #profile
    path('profile/retrieve/', ProfileViewset.as_view({'get':'retrieve'})),
    path('profile/create/', ProfileViewset.as_view({'post':'create'})),
    path('profile/update/', ProfileViewset.as_view({'put':'update'})),
    #mentors
    path('mentors/', MentorViewset.as_view({'get':'list_mentors'})),
    path('mentors/create/', MentorViewset.as_view({'post':'create_mentor_request'})),
    path('mentors/accept/', MentorViewset.as_view({'post':'accept_mentee_request'})),
    path('mentors/reject-request/', MentorViewset.as_view({'put':'reject_mentee_request'})),
    path('mentors/pending-requests/', MentorViewset.as_view({'get':'get_mentor_pending_requests'})),
    path('mentors/mentor-students/', MentorViewset.as_view({'get':'get_mentor_accepted_student'})),
    path('mentors/schedule-meeting/', MentorViewset.as_view({'put': 'schedule_meeting'})),
    path('mentors/students-pending-requests/', MentorViewset.as_view({'get': 'get_student_pending_requests'})),
    path('mentors/students/accept/', MentorViewset.as_view({'get': 'get_student_mentor_accept'})),
    path('mentors/meeting-schedule/', MentorViewset.as_view({'get': 'list_schedule_meetings'})),
    
    path('login/', SignIn.as_view({'post':'post'})),
    ####websocket
    # path("<str:meeting_id>")
]
