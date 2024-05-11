from core.models import *
from core.serializers import *
from core.senders.profile import *


def get_user_information(email):
    """Get user information by email

    Args:
        email (str): user email

    Returns:
        dict: user information
    """
    user = get_user_by_email(email)
    profile = get_profile_by_id(user.profile_id)
    if profile:
        return {
            "user_id": user.user_id,
            "email": user.email,
            "role": user.role,
            "verified": user.verified,
            "profile": get_profile_information(profile)
        }
    return {
        "user_id": user.user_id,
        "email": user.email,
        "verified": user.verified,
        "role": user.role,
    }

def get_user_by_email(email):
    """Get user by email"""
    try:
        return AccountUser.objects.get(email=email)
    except AccountUser.DoesNotExist:
        return None

def get_user_by_id(user_id):
    """Get user by id"""
    try:
        return AccountUser.objects.get(user_id=user_id)
    except AccountUser.DoesNotExist:
        return None
    
def get_mentors():
    """Get mentors"""
    queryset = AccountUser.objects.filter(role="Mentor")
    serializer = AccountUserSerializer(queryset, many=True)
    data = []
    for obj in serializer.data:
        mentor_obj = {
            "user_id": obj["user_id"],
            "email": obj["email"],
            "role": obj["role"],
            "full_name": f"{obj['profile']['first_name']} {obj['profile']['last_name']}" if obj['profile'] else "",
            "title": obj["profile"]["title"] if obj["profile"] else "",
            "bio": obj["profile"]["bio"] if obj["profile"] else "",
            "profile_picture": obj["profile"]["profile_picture"] if obj["profile"] else "",
        }
        data.append(mentor_obj)
    return data


def get_all_users():
    """Get all users"""
    queryset = AccountUser.objects.all()
    serializer = AccountUserSerializer(queryset, many=True)
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
        return AccountUserProfile.objects.get(profile_id=id)
    except AccountUserProfile.DoesNotExist:
        return None