from core.models import *
from core.serializers import *

def create_profile(data):
    """Create profile"""
    serializer = AccountUserProfileSerializer(data=data, many=False)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return serializer.errors


def update_profile(data, profile):
    "updates a user's profile takes a profile instance and the data to be updated"
    serializer = AccountUserProfileSerializer(data=data, instance=profile, partial=True, many=False)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    else:
        return None
    
def get_profile_information(profile):
    serializer = AccountUserProfileSerializer(profile)
    if serializer.is_valid:
        return serializer.data
    else:
        return serializer.error