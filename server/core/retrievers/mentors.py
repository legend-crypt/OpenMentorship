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
    if mentor and mentor.role == "Mentor":
        return mentor
    else:
        return None
    
def get_mentor_session_by_id(id):
    try:
        return MentorSession.objects.get(pk=id)
        
    except Mentor.DoesNotExit:
        return None
    

def get_mentor_requests(mentor: YelloUser)-> MentorSession:
    """ Get mentor pending requests

    Args:
        mentor (YelloUser): mentor

    Returns:
        MentorSession: mentor session
    """
    try:
        return MentorSession.objects.filter(mentor=mentor, status="pending")
    except MentorSession.DoesNotExist:
        return None

def get_student_meeting(student: YelloUser) -> MentorSession:
    """Get student meeting

    Args:
        student (YelloUser): student

    Returns:
        MentorSession: mentor session
    """
    try:
        return MentorSession.objects.filter(student=student, status="accepted")
    except MentorSession.DoesNotExist:
        return None
    
def get_mentor_session_by_student_id(id: uuid) -> MentorSession:
    """Get mentor session by student id

    Args:
        id (uuid): student id

    Returns:
        MentorSession: mentor session object
    """
    try:
        return MentorSession.objects.get(student=id)
    except MentorSession.DoesNotExist:
        return None
    
def get_mentor_meeting(mentor: YelloUser) -> MentorSession:
    """Get student meeting

    Args:
        student (YelloUser): student

    Returns:
        MentorSession: mentor session
    """
    try:
        return MentorSession.objects.filter(mentor=mentor, status="accepted")
    except MentorSession.DoesNotExist:
        return None

def get_mentor_schedule_meeting(user: YelloUser) -> MentorSession:
    """Get mentor schedule meeting

    Args:
        student (YelloUser): student

    Returns:
        MentorSession: mentor session
    """
    try:
        return MentorSession.objects.filter(mentor=user, status="scheduled")
    except MentorSession.DoesNotExist:
        return None


def get_student_schedule_meeting(user: YelloUser) -> MentorSession:
    """Get mentee schedule meeting

    Args:
        student (YelloUser): user

    Returns:
        MentorSession: mentor session
    """
    try:
        return MentorSession.objects.filter(student=user, status="scheduled")
    except MentorSession.DoesNotExist:
        return None

    
    