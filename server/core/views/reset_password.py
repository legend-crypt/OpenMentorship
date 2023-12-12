from core.models import CleaningServiceUser, PasswordToken
from rest_framework import viewsets, status
from rest_framework.response import Response
from core.senders.accounts import *
from core.retrievers.accounts import *
from core.utils import password_reset_email

class PasswordResetViewset(viewsets.ViewSet):
    """"Password Reset Viewset"""
    def password_reset_request(self, request):
        """Password Reset"""
        email = request.data.get('email')    
        user = get_user_by_email(email)
        if not user:
            context = {
                'detail': 'User does not exist'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        user_token = get_password_token(email)
        if user_token:
            user_token.delete()
        if password_reset_email(email, 4):
            context = {
                'detail': 'Password reset code sent'
            }
            return Response(context, status=status.HTTP_200_OK)
        
        
    def password_reset_confirm(self, request):
        """"Password Reset Confirmation"""
        email = request.data.get('email')
        token = request.data.get('otp')
        password = request.data.get('password')
        user = get_user_by_email(email)
        if not user:
            context = {
                'detail': 'User does not exist'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        user_token = get_password_token(email)
        if not user_token:
            context = {
                'detail': 'Password reset token does not exist'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        print(f"usertoken {user_token.token} token {token}")
        if user_token.token != token:
            context = {
                'detail': 'Password reset token is invalid'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        if datetime.now(UTC) > user_token.time + timedelta(minutes=10):
            user_token.delete()
            context = {
                'detail': 'Password reset token has expired request a new one'
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        user.set_password(password)
        user.save()
        user_token.delete()
        context = {
            'detail': 'Password reset successful'
        }
        return Response(context, status=status.HTTP_200_OK)