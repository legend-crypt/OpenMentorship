from core.model import YelloUser, YelloUserProfile

def get_profile_by_id(id)->YelloUserProfile:
    """Get profile by id

    Args:
        id (uuid): profile id

    Returns:
        YelloUserProfile: _description_
    """
    try:
        return YelloUserProfile.objects.get(profile_id=id)
    except YelloUserProfile.DoesNotExist:
        return None

def get_profile_by_user(user)->YelloUserProfile:
    """Get profile by user

    Args:
        user (YelloUser): user

    Returns:
        YelloUserProfile: _description_
    """
    try:
        return YelloUserProfile.objects.get(profile_user=user.profile)
    except YelloUserProfile.DoesNotExist:
        return None
    
    
def get_profile_user_email(email)->YelloUserProfile:
    """Get profile by user email

    Args:
        email (str): user email

    Returns:
        YelloUserProfile: _description_
    """
    try:
        user = get_user_by_email(email)
        return YelloUserProfile.objects.get(user.profile)
    except YelloUserProfile.DoesNotExist:
        return None
