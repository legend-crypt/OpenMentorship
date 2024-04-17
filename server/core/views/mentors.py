from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.utils import *
from core.retrievers.mentors import *
from core.senders.mentors import *
from core.serializers import MentorSessionSerializer
import json



class MentorViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        queryset = Mentor.objects.all()
        serializer = MentorSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def list_mentors(self, request) -> Response:
        """Get mentors

        Args:
            request (http): http request

        Returns:
            Response: http response
        """
        mentors = get_mentors()
        context = {
            "detail": "Mentors retrieved successfully",
            "data": mentors
        }
        return Response(context, status=status.HTTP_200_OK)

    
    def create_mentor_request(self, request):
        user = get_user_from_jwttoken(request)
        mentor_email = request.data.get("mentor_email")
        mentor = get_mentor_by_email(mentor_email)
        if user and mentor:
            student = user
            mentor_request = create_mentor_request(student, mentor)
            serializer = MentorSessionSerializer(mentor_request)

            context = {
                "detail": "Request successfully sent",
                "data": serializer.data
            }
            return Response(context, status=status.HTTP_201_CREATED)
        return Response({"error": "Request not sent"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete_mentor_request(self, request, id):
        """ Delete mentor request

        Args:
            request (http request): 
            id (int): mentor request id

        Returns:
            http response: http response
        """
        user = get_user_from_jwttoken(request)
        mentor = get_mentor_session_by_id(id)
        if mentor and mentor.mentor == user:
            mentor.delete()
            context = {
                "detail": "Request deleted successfully",
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)
        
    
    def accept_mentee_request(self, request):
        """ Accept mentee request

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        user = get_user_from_jwttoken(request)
        
        id = request.data.get("mentorSession_id")
        mentor = get_mentor_session_by_id(id)
        
        if mentor and mentor.mentor == user:
            mentor.status = "accepted"
            mentor.save()
            mentor_request = get_student_mentorSession_by_status(mentor.student, "accepted")
            data = get_student_mentorSession_information(mentor_request)

            context = {
                "detail": "Request Accepted Successfully",
                "data": data
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)
        
    
    def get_mentor_student_requests(self, request):
        """ Get mentor requests

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        mentor = get_user_from_jwttoken(request)
        status_name = request.query_params.get("status")
        if mentor:
            if status_name:
                obj = MentorSession.objects.filter(mentor=mentor, status=status_name)
            data = get_mentor_mentorSession_information(obj)
                
            context = {
                "detail": "Requests retrieved successfully",
                "data": data
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def schedule_meeting(self, request):
        """ Schedule meeting

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        id = request.data.get("mentor_id")
        meeting_schedule = request.data.get("time")
        mentor = get_mentor_session_by_id(id)
        if mentor:
            mentor = create_mentor_meeting(mentor, meeting_schedule)
            serializer = MentorSessionSerializer(mentor, context={'request': request})
            context = {
                "detail": "Meeting scheduled successfully",
                "data": serializer.data
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def get_student_mentor_requests(self, request):
        """ Get student mentor session requests
        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        student = get_user_from_jwttoken(request)
        status_name = request.query_params.get("status")
        if student:
            if status_name:
                obj = MentorSession.objects.filter(student=student, status=status_name)
            else:
                obj = MentorSession.objects.filter(student=student)
            data = get_student_mentorSession_information(obj)
            context = {
                    "detail": "Requests retrieved successfully",
                    "data": data
                }
            return Response(context, status=status.HTTP_200_OK)
