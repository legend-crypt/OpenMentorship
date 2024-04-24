from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from core.senders.profile import *
from core.utils import *

class ProfileViewset(viewsets.ViewSet):
    def retrieve(self, request)->Response:
        """Retrieve Profile

        Args:
            request (http): http request
            id (uuid): profile id

        Returns:
            Response: http response
        """
        permission_classes = [IsAuthenticated]
        user = get_user_from_jwttoken(request)
        if user:
            try:
                profile = get_profile_by_id(user.profile.profile_id)
                data = get_profile_information(profile)
                data['use-role'] = user.role
                context = {
                    "success": True,
                    "message": "Profile found",
                    "data": data,
                }  
                return Response(context, status=status.HTTP_200_OK)
            except:
                context = {
                    "success": False,
                    "message": "Profile does not exist",
                    "data": None
                }
                return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "user does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    
    def create(self, request)->Response:
        """Create Profile

        Args:
            request (http): http request

        Returns:
            http Response: http response
        """
        parser_classes = [MultiPartParser, FormParser, JSONParser]
        permission_classes = [IsAuthenticated]
        user = get_user_from_jwttoken(request)
        if user.profile:
            context = {
                "error": "Profile already exists"
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        profile = create_profile(request.data)
        user.profile = get_profile_by_id(profile['profile_id'])
        user.save()
        context = {
            "detail": "Profile created successfully",
            "profile": profile,
            "user": get_user_information(user.email)

        }
        
        return Response(context, status=status.HTTP_201_CREATED)  
        
        
    def update(self, request)->Response:
        """Update profile

        Args:
            request (http): http request

        Returns:
            Response: http response
        """
        permission_classes = [IsAuthenticated]
        user = get_user_from_jwttoken(request)
        if not user.profile:
            context = {
                "error": "Profile does not exist"
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        profile = update_profile(request.data, user.profile)
        if not profile:
            context = {
                "error": "Profile update failed"
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        context = { 
            "detail": "Profile updated successfully",
            "profile": profile
        }
        return Response(context, status=status.HTTP_200_OK)