from core.models import *
from core.serializers import *
from datetime import datetime, timedelta
import pytz
import random, string


UTC = pytz.UTC

def create_user(email:str, password:str, role:str)-> AccountUser:
    """Creates a user

    Args:
        email (str): takes in a valid email address
        password (str): password for the user

    Returns:
        AccountUser: user json object
    """
    user = AccountUser.objects.create_user(email=email, password=password, role=role)
    queryset = AccountUserSerializer(user)
    return queryset


def create_verification_token(email:str, token:str)-> VerificationCode:
    """Creates a verification token

    Args:
        email (str): takes in a valid email address
        token (str): verification token

    Returns:
        Verification: verification json object
    """
    time_generated = UTC.localize(datetime.now())
    verification_code = VerificationCode.objects.create(email=email, otp=token, time=time_generated)
    return verification_code


def update_verification_token(verification_code:VerificationCode, otp:str)-> VerificationCode:
    """Updates a verification token

    Args:
        verification_code (VerificationCode): verification code object
        otp (str): new otp

    Returns:
        VerificationCode: updated verification code object
    """
    time_generated = UTC.localize(datetime.now())
    verification_code.otp = otp
    verification_code.time = time_generated
    verification_code.save()
    return verification_code


def create_password_reset_token(email:str, token:str)-> PasswordResetCode:
    """Creates a password reset token

    Args:
        email (str): takes in a valid email address
        token (str): verification token

    Returns:
        PasswordResetCode: passwordResetCode object
    """
    time_generated = UTC.localize(datetime.now())
    password_code = PasswordResetCode.objects.create(email=email, otp=token, time=time_generated)
    return password_code


def update_password_reset_code(password_reset_code:PasswordResetCode, otp:str)-> PasswordResetCode:
    """Updates a password_reset token

    Args:
        password_reset_code (PasswordResetCode): verification code object
        otp (str): new otp

    Returns:
        PasswordResetCode: updated password reset code object
    """
    time_generated = UTC.localize(datetime.now())
    password_reset_code.otp = otp
    password_reset_code.time = time_generated
    password_reset_code.save()
    return password_reset_code




