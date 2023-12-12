from rest_framework import viewsets, status
from rest_framework.permissions import isAuthenticated
from rest_framework.response import Response
from core.senders.profile import *
from core.utils import *

class ProfileViewset(viewsets.Viewset):
    
    def create(self, request)->Response:
        """Create Profile

        Args:
            request (http): http request

        Returns:
            http Response: http response
        """
        permission_classes = [isAuthenticated]
        user = get_user_from_jwt(request)
        if user.profile:
            context = {
                "error": "Profile already exists"
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        profile = create_profile(request.data)
        user.profile = get_profile_by_id(profile['id'])
        user.save()
        context = {
            "detail": "Profile created successfully",
            "profile": profile
        }
        
        return Response(context, status=status.HTTP_201_CREATED)  
        
        
    def update(self, request)->Response:
        """Update profile

        Args:
            request (http): http request

        Returns:
            Response: http response
        """
        permission_classes = [isAuthenticated]
        user = get_user_from_jwt(request)
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