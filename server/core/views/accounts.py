from rest_framework import viewsets, status
from rest_framework.permissions import isAuthenticated
from rest_framework.response import Response
from core.senders.accounts import *
import threading
from core.retrievers.accounts import *
from core.utils import *

class AccountCreationViewSet(viewsets.ViewSet):
    def create(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if email is None or password is None:
            context = {
                "error": "Please provide both email and password"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        if YelloUser.objects.filter(email=email).exists():
            context = {
                "error": "Email already exists"
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        
        user = create_user(email=email, password=password)
        context = {
            "detail": "User created successfully",
            "user" : get_user_information(user)
        }
        thread = threading.Thread(target=email_verification, args=(email, 4))
        thraed.start()
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
        if not account:
            context = {"detail": "No account associated with this email"}
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        if user.verified:
            context = {"detail": "Your account has already been verified"}
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)

        otp_detail = VerificationToken.objects.get(email=email)
        if otp == otp_detail.token:
            if UTC.localize(datetime.now()) < otp_detail.time + timedelta(
                minutes=10
            ):
                account.verified = True
                account.save()
                otp_detail.delete()
                email_thread = threading.Thread(
                    target=verification_confirmation_email, args=[email]
                )

                email_thread.start()
                context = {
                    "detail": "Your email has been verified successfully",
                    "user": get_user_information(account),
                }

                return Response(context, status=status.HTTP_200_OK)

            else:
                otp_detail.delete()
                context = {"detail": "This otp has expired Request a new one"}
                return Response(context, status=status.HTTP_400_BAD_REQUEST)

        context = {"detail": "The otp you have provided is invalid"}
        return Response(context, status=status.HTTP_400_BAD_REQUEST)