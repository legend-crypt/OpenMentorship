from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.utils import *
from core.retrievers.accounts import get_user_by_id
from core.retrievers.meeting import *
from core.senders.meeting import *
from core.models import Meeting

class MeetingViewset(viewsets.ViewSet):
    """ viewset for Meeting
    """
    def get_user_meetings(self, request):
        """Get user meetings
        """
        user = get_user_from_jwttoken(request)
        if user:
            meetings = get_user_meetings(user)
            data = get_meeting_information(meetings)
            context = {
                "detail": "Meetings retrieved successfully",
                "data": data
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Meetings not retrieved"}, status=status.HTTP_400_BAD_REQUEST)
    
        
    def create(self, request):
        """Create meeting
        """
        mentor = get_user_from_jwttoken(request)
        time = request.data.get("time")
        mentee_id = request.data.get("mentee_id")
        meeting_link = request.data.get("meeting_link")
        mentee = get_user_by_id(mentee_id)
        if not mentee:
            return Response({"error": "Mentee not found"}, status=status.HTTP_400_BAD_REQUEST)
        if mentor:
            meeting_exist = Meeting.objects.filter(mentor=mentor, mentee=mentee)
            if meeting_exist:
                return Response({"detail": "Meeting already exists"}, status=status.HTTP_208_ALREADY_REPORTED)
            meeting = create_meeting(time=time, mentor=mentor, mentee=mentee, meeting_link=meeting_link)
            if meeting:
                context = {
                "detail": "Meeting created successfully",
                }
                return Response(context, status=status.HTTP_201_CREATED)
        return Response({"error": "Meeting not created"}, status=status.HTTP_400_BAD_REQUEST)
