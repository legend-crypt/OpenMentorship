from core.models import *
from core.retrievers.accounts import *
from core.senders.accounts import *
from core.serializers import MentorSessionSerializer


def get_mentorSession_information(mentorSession: MentorSession) -> MentorSessionSerializer:
    """Get mentor session information

    Args:
        mentorSession (MentorSession): mentor session

    Returns:
        MentorSessionSerializer: mentor session serializer
    """
    serializer = MentorSessionSerializer(mentorSession, many=True)
    return serializer.data
    
    
def get_mentor_by_email(email):
    mentor = get_user_by_email(email)
    if mentor.role == "mentor":
        return mentor
    
def get_mentor_by_id(id):
    try:
        return MentorSession.objects.get(pk=id)
        
    except Mentor.DoesNotExit:
        return None
    

def get_mentor_requests(mentor: YelloUser):
    try:
        return MentorSession.objects.filter(mentor=mentor, status="pending")
    except MentorSession.DoesNotExist:
        return None

def get_mentee_request(student: YelloUser):
    try:
        return MentorSession.objects.filter(student=student)
    except MentorSession.DoesNotExist:
        return None
    
    