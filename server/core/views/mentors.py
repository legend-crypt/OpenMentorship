from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.utils import *
from core.retrievers.mentors import *
from core.senders.mentors import *




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
        print(f"user {user}; mentor {mentor}")
        if user and mentor:
            student = user
            mentor_request = create_mentor_request(student, mentor)
            context = {
                "detail": "Request successfully sent",
                "data": mentor_request
            }
            return Response(context, status=status.HTTP_201_CREATED)
        return Response({"error": "Request not sent"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def accept_mentee_request(self, request):
        """ Accept mentee request

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        user = get_user_from_jwttoken(request)
        
        id = request.data.get("student_id")
        mentor = get_mentor_session_by_student_id(id)
        
        if mentor and mentor.mentor == user:
            mentor.status = "accepted"
            mentor.save()
            context = {
                "detail": "Request Accepted Successfully",
                "data": get_mentorSession_information(mentor)
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)
        
    
    def reject_mentee_request(self, request):
        """ Accept mentee request

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        id = request.data.get("mentorSession_id")
        mentor = get_mentor_by_id(id)
        if mentor:
            mentor.status = "rejected"
            mentor.save()
            context = {
                "detail": "Request rejected Successfully",
                "data": get_mentorSession_information(mentor)
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def get_mentor_meetings(self, request):
        """ Get mentor meetings

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        mentor = get_user_from_jwttoken(request)
        if mentor:
            context = {
                "detail": "Requests retrieved successfully",
                "data": get_mentorSession_information(get_mentor_meeting(mentor))
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def get_student_meetings(self, request):
        """ Get student mentor meetings

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        student = get_user_from_jwttoken(request)
        if student:
            mentor_requests = get_student_meeting(student)
            if mentor_requests:
                # mentors = [(item["mentor"], item["mentor_session_id"]) for item in get_mentorSession_information(mentor_requests)]
                # print(mentors)
                
                context = {
                    "detail": "Requests retrieved successfully",
                    "data": get_mentorSession_information(mentor_requests)
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "No meetings found"}, status=status.HTTP_200_OK)
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    
    def get_mentor_pending_requests(self, request):
        """ Get mentor requests

        Args:
            request (http request): 

        Returns:
            http response: http response
        """
        mentor = get_user_from_jwttoken(request)
        if mentor:
            mentor_requests = get_mentor_requests(mentor)
            mentor_requests = [item["student"] for item in get_mentorSession_information(mentor_requests)]
            context = {
                "detail": "Requests retrieved successfully",
                "data": mentor_requests
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
            context = {
                "detail": "Meeting scheduled successfully",
                "data": mentor
            }
            return Response(context, status=status.HTTP_200_OK)
        return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)