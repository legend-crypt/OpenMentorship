from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from core.senders.accounts import *
import threading
from core.retrievers.accounts import *
from core.utils import *
from rest_framework_simplejwt.tokens import RefreshToken
import json
import os
class AccountCreationViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        role = request.data.get('role')
        if email is None or password is None:
            context = {
                "error": "Please provide both email and password"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        if AccountUser.objects.filter(email=email).exists():
            context = {
                "error": "Email already exists"
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        
        user = create_user(email=email, password=password, role=role)
        context = {
            "detail": "User created successfully",
            "user" : get_user_information(email)
        }

        thread = threading.Thread(target=email_verification, args=(email, 4))
        thread.start()
        return Response(context, status=status.HTTP_201_CREATED)
    
    def send_verification_email(self, request):
        """Send verification email

        Args:
            request (http): http request

        Returns:
            http Response: http response
        """
        email = request.data.get('email')
        if email is None:
            context = {
                "error": "Please provide email"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        user = get_user_by_email(email)
        if user.verified:
            context = {
                "error": "Account already verified"
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        otp_object = get_verification_token(email)
        if otp_object:
            otp_object.delete()
        if email_verification(email, 4):
            context = {
                "detail": "Verification email sent successfully"
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response("Could not send otp", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
    def verify_email(self, request):
        """Verify email

        Args:
            request (http): http request

        Returns:
            Http Response: http response
        """
        
        email = request.data.get("email")
        otp = request.data.get("otp")

        user = get_user_by_email(email)
        if not user:
            context = {"error": "No account associated with this email"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        if user.verified:
            context = {"error": "Your account has already been verified"}
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)

        otp_detail = VerificationCode.objects.get(email=email)
        if otp == otp_detail.otp:
            if UTC.localize(datetime.now()) < otp_detail.time + timedelta(
                minutes=10
            ):
                user.verified = True
                user.save()
                otp_detail.delete()
                email_thread = threading.Thread(
                    target=verification_confirmation_email, args=[email]
                )

                email_thread.start()
                context = {
                    "detail": "Your email has been verified successfully",
                    "user": get_user_information(email),
                }

                return Response(context, status=status.HTTP_200_OK)

            else:
                otp_detail.delete()
                context = {"detail": "This otp has expired Request a new one"}
                return Response(context, status=status.HTTP_400_BAD_REQUEST)

        context = {"error": "The otp you have provided is invalid"}
        return Response(context, status=status.HTTP_400_BAD_REQUEST)
    
    
class SignIn(viewsets.ViewSet):
    
    def post(self, request):
        """Sign in user with email and password
        

        Args:
            request (http): http request

        Raises:
            AuthenticationFailed: If user does not exist or password is incorrect
        Returns:
            http response: http response
        """
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            raise AuthenticationFailed("Missing required login credential")

        user = get_user_by_email(email)

        if not user:
            context = {"error": "User not found"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)

        if user.check_password(password) and user.is_active:
            token = RefreshToken.for_user(user)
            user_data = get_user_information(user)
            context = {
                "detail": "Sign in successful",
                "user": user_data,
                "token": {"access": str(token.access_token), "refresh": str(token)},
            }
            response = Response(context, status=status.HTTP_200_OK)
            return response
        else:
            return  Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
