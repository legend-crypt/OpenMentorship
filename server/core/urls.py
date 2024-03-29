from django.urls import path
from core.views.profile import *
from core.views.accounts import *
from core.views.reset_password import *
from core.views.mentors import *
from core.views.meeting import *
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
    path('mentors/mentor-requests/', MentorViewset.as_view({'get':'get_mentor_student_requests'})),
    path('mentors/students-requests/', MentorViewset.as_view({'get': 'get_student_mentor_requests'})),
    path('mentors/meeting-schedule/', MentorViewset.as_view({'get': 'list_schedule_meetings'})),
    #meetings
    path('meeting/create/', MeetingViewset.as_view({'post':'create'})),
    path('meeting/retrieve/student/', MeetingViewset.as_view({'get':'get_student_meeting'})),
    path('meeting/retrieve/mentor/', MeetingViewset.as_view({'get':'get_mentor_meeting'})),
    path('meeting/retrieve/<uuid:id>/', MeetingViewset.as_view({'get':'retrieve'})),
    
    path('login/', SignIn.as_view({'post':'post'})),
    ####websocket
    # path("<str:meeting_id>")
]
