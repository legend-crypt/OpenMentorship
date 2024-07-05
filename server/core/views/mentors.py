from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.utils import *
from core.retrievers.mentors import *
from core.senders.mentors import *
from core.serializers import MentorRequestSerializer
import json
from core.models import MentorRequest



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
            check_Request = MentorRequest.objects.filter(student=user, mentor=mentor)
            if check_Request:
                context = {
                    "detail": "Request already sent",
                }
                return Response(context, status=status.HTTP_208_ALREADY_REPORTED)
            elif user == mentor:
                context = {
                    "detail": "You can't send a request to yourself",
                }
                return Response(context, status=status.HTTP_400_BAD_REQUEST)
            elif MentorRequest.objects.filter(student=user):
                context = {
                    "detail": "You can't send more than one request",
                }
                return Response(context, status=status.HTTP_400_BAD_REQUEST)
            else:
                mentor_request = create_mentor_request(user, mentor)
                data = MentorRequestSerializer(mentor_request).data
                context = {
                    "detail": "Request successfully sent",
                    "data": data
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
        
        id = request.data.get("mentorRequest_id")
        mentor = get_mentor_Request_by_id(id)
        
        if mentor:
            mentor.status = "accepted"
            mentor.save()
            context = {
                "detail": "Request Accepted Successfully",
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
                obj = MentorRequest.objects.filter(mentor=mentor, status=status_name)

            data = get_mentor_MentorRequest_information(obj)
                
            context = {
                "detail": "Requests retrieved successfully",
                "data": data
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    
    def get_student_mentor_requests(self, request):
        """ Get student mentor Request requests
        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        student = get_user_from_jwttoken(request)
        status_name = request.query_params.get("status")
        if student:
            if status_name:
                obj = MentorRequest.objects.filter(student=student, status=status_name)
            else:
                obj = MentorRequest.objects.filter(student=student)
            data = get_student_MentorRequest_information(obj)
            context = {
                    "detail": "Requests retrieved successfully",
                    "data": data
                }
            return Response(context, status=status.HTTP_200_OK)