from django.urls import path
from core.views.profile import *
from core.views.accounts import *
from core.views.reset_password import *
from core.views.mentors import *
from core.views.meeting import *
from core.views.os_project import *
from core.views.blog import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # Accounts
    path('accounts/create/', AccountCreationViewSet.as_view({'post':'create'}), name='accountcreation-create'),
    path('accounts/verify-email/', AccountCreationViewSet.as_view({'post':'verify_email'}), name='accountcreation-verify-email'),
    path('accounts/send-verification-email/', AccountCreationViewSet.as_view({'post':'send_verification_email'}), name='accountcreation-send-verification-email'),
    
    
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
    path('mentors/reject/<uuid:id>/', MentorViewset.as_view({'delete':'delete_mentor_request'})),
    
    
    #meeting
    path('meeting/create/', MeetingViewset.as_view({'post':'create'})),
    path('meeting/retrieve/', MeetingViewset.as_view({'get':'get_user_meetings'})),
    
    
    #projects
    path('projects/', ProjectViewset.as_view({'get':'list'})),
    
    
    #blogs
    path('blogs/', BlogViewSet.as_view({'get': 'list'}), name="blog-list"),
    path('blogs/<uuid:id>/', BlogViewSet.as_view({'get': 'retrieve'}), name='blog-detail'),
    path('blogs/create/', BlogViewSet.as_view({'post': 'create'}), name='blog-create'),
    path('blogs/update/<uuid:id>/', BlogViewSet.as_view({'put': 'update'}), name='blog-update'),
    
    #SignIN
    path('login/', SignIn.as_view({'post':'post'}), name='login'),
    ####websocket
    # path("<str:meeting_id>")
]
