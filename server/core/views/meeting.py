from rest_framework import viewsets, status
from rest_framework.response import Response
from core.retrievers.meeting import *
from core.senders.meeting import *
from core.models import MeetingDetail
from core.retrievers.mentors import get_mentor_Request_by_id
from core.utils import get_user_from_jwttoken
from core.serializers import MeetingDetailSerializer

class MeetingViewset(viewsets.ViewSet):
    
    def create(self, request):
        """ create a meeting object"""
        id = request.data.get("id") ## mentor request id
        time = request.data.get("time") ## meeting time
        session = get_mentor_Request_by_id(id)
        if not session:
            context = {
                "detail": "Mentor request not found",
            }
            return Response(context, status=status.HTTP_404_NOT_FOUND)
        check_meeting = MeetingDetail.objects.filter(session=session)
        if check_meeting:
            context = {
                "detail": "Meeting already created",
            }
            return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
        meeting = create_meeting(session, time)
        context = {
            "detail": "Meeting created successfully",
        }
        return Response(context, status=status.HTTP_201_CREATED)
    
    def get_student_meeting(self, request):
        """Get student meeting"""
        user = get_user_from_jwttoken(request)
        if user:
            meetings = get_all_student_meeting(user)
            context = {
                "detail": "Student meeting retrieved successfully",
                "data": meetings
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Meeting not found"}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_mentor_meeting(self, request):
        """Get mentor meeting"""
        user = get_user_from_jwttoken(request)
        if user:
            meetings = get_all_mentor_meeting(user)
            context = {
                "detail": "Mentor meeting retrieved successfully",
                "data": meetings
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Meeting not found"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete_meeting(self, request):
        """Delete meeting"""
        id = request.data.get("id")
        meeting = get_meeting_by_id(id)
        if meeting:
            meeting.delete()
            context = {
                "detail": "Meeting deleted successfully",
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Meeting not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def retrieve(self, request, id):
        """Retrieve meeting"""
        id = request.data.get("id")
        meeting = get_meeting_by_id(id)
        if meeting:
            context = {
                "detail": "Meeting retrieved successfully",
                "data": MeetingDetailSerializer(meeting).data
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Meeting not found"}, status=status.HTTP_404_NOT_FOUND)