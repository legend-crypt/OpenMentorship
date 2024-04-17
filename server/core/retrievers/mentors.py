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
        
    except MentorSession.DoesNotExist:
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

    
def get_student_mentorSession_by_status(student: YelloUser, status) -> MentorSession:
    """Get student mentors session by status

    Args:
        student (YelloUser): student

    Returns:
        MentorSession: mentor session
    """
    try:
        return MentorSession.objects.filter(student=student, status=status)
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

        
def get_student_mentorSession_information(mentorSession_obj) -> list:
    """Get student mentor session information

    Args:
        mentorSession_obj (MentorSession): list of mentor session object

    Returns:
        list: list of mentor session serializer
    """
    
    data_list = []
    for obj in mentorSession_obj:
        data = {
            "user_id": obj.mentor.user_id,
            "full_name": obj.mentor.full_name,
            "id": obj.mentor_session_id
        }
        data_list.append(data)
    return data_list

def get_mentor_mentorSession_information(mentorSession_obj) -> list:
    """Get a mentor mentor session information

    Args:
        mentorSession_obj (MentorSession): list of mentor session object

    Returns:
        list: list of mentor session serializer
    """
    data_list = []
    for obj in mentorSession_obj:
        data = {
            "user_id": obj.student.user_id,
            "full_name": obj.student.full_name,
            "id": obj.mentor_session_id,
            "profile_picture": obj.student.profile.profile_picture.url
        }
        data_list.append(data)
    return data_list

def get_sdp_by_meetingId(meeting_id) -> MeetingDetails.sdp_offer:
    """Get sdp by meeting id

    Args:
        meeting_id (str): meeting id

    Returns:
        MeetingDetails.sdp_offer: sdp offer
    """
    try:
        return MeetingDetails.objects.get(meeting__meeting_id=meeting_id)
    except MeetingDetails.DoesNotExist:
        return None