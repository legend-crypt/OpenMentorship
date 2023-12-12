from core.models import *
from core.serializers import CleaningServiceSerializer, VerificationTokenSerializer, PasswordTokenSerializer


def get_user_information(email):
    """Get user information"""
    user = get_user_by_email(email)
    serializer = YelloUserSerializer(user)
    return serializer.data

def get_user_by_email(email):
    """Get user by email"""
    try:
        return YelloUser.objects.get(email=email)
    except YelloUser.DoesNotExist:
        return None

def get_user_by_id(user_id):
    """Get user by id"""
    try:
        return YellowUser.objects.get(user_id=user_id)
    except YelloUser.DoesNotExist:
        return None


def get_all_users():
    """Get all users"""
    queryset = YelloUser.objects.all()
    serializer = YelloUserSerializer(queryset, many=True)
    return serializer.data



def get_verification_token(email):
    """Get verification token"""
    try:
        return VerificationCode.objects.get(email=email)
    except VerificationCode.DoesNotExist:
        return None


def get_password_token(email):
    """Get password token"""
    try:
        return PasswordResetCode.objects.get(email=email)
    except PasswordResetCode.DoesNotExist:
        return None

def get_profile_by_id(id):
    try:
        return YelloUserProfile.objects.get(profile_id=id)
    except YelloUserProfile.DoesNotExist:
        return None