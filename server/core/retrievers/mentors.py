from core.models import *
from core.retrievers.accounts import *
from core.senders.accounts import *
from core.serializers import MentorRequestSerializer


def get_MentorRequest_information(MentorRequest: MentorRequest) -> MentorRequestSerializer:
    """Get mentor session information

    Args:
        MentorRequest (MentorRequest): mentor session

    Returns:
        MentorRequestSerializer: mentor session serializer
    """
    serializer = MentorRequestSerializer(MentorRequest, many=True)
    return serializer.data
    
    
def get_mentor_by_email(email):
    mentor = get_user_by_email(email)
    if mentor and mentor.role == "Mentor":
        return mentor
    else:
        return None
    
def get_mentor_Request_by_id(id):
    try:
        return MentorRequest.objects.get(mentor_request_id=id)
        
    except MentorRequest.DoesNotExist:
        return None
    

def get_mentor_requests(mentor: AccountUser)-> MentorRequest:
    """ Get mentor pending requests

    Args:
        mentor (AccountUser): mentor

    Returns:
        MentorRequest: mentor session
    """
    try:
        return MentorRequest.objects.filter(mentor=mentor, status="pending")
    except MentorRequest.DoesNotExist:
        return None

    
def get_student_MentorRequest_by_status(student: AccountUser, status) -> MentorRequest:
    """Get student mentors session by status

    Args:
        student (AccountUser): student

    Returns:
        MentorRequest: mentor session
    """
    try:
        return MentorRequest.objects.filter(student=student, status=status)
    except MentorRequest.DoesNotExist:
        return None

    
def get_mentor_session_by_student_id(id: uuid) -> MentorRequest:
    """Get mentor session by student id

    Args:
        id (uuid): student id

    Returns:
        MentorRequest: mentor session object
    """
    try:
        return MentorRequest.objects.get(student=id)
    except MentorRequest.DoesNotExist:
        return None
    

def get_mentor_schedule_meeting(user: AccountUser) -> MentorRequest:
    """Get mentor schedule meeting

    Args:
        student (AccountUser): student

    Returns:
        MentorRequest: mentor session
    """
    try:
        return MentorRequest.objects.filter(mentor=user, status="scheduled")
    except MentorRequest.DoesNotExist:
        return None


def get_student_schedule_meeting(user: AccountUser) -> MentorRequest:
    """Get mentee schedule meeting

    Args:
        student (AccountUser): user

    Returns:
        MentorRequest: mentor session
    """
    try:
        return MentorRequest.objects.filter(student=user, status="scheduled")
    except MentorRequest.DoesNotExist:
        return None

        
def get_student_MentorRequest_information(MentorRequest_obj) -> list:
    """Get student mentor session information

    Args:
        MentorRequest_obj (MentorRequest): list of mentor session object

    Returns:
        list: list of mentor session serializer
    """
    
    data_list = []
    for obj in MentorRequest_obj:
        data = {
            "user_id": obj.mentor.user_id,
            "full_name": obj.mentor.full_name,
            "id": obj.mentor_request_id,
            "title": obj.student.profile.title,
            "bio": obj.student.profile.bio

        }
        data_list.append(data)
    return data_list

def get_mentor_MentorRequest_information(MentorRequest_obj) -> list:
    """Get a mentor mentor session information

    Args:
        MentorRequest_obj (MentorRequest): list of mentor session object

    Returns:
        list: list of mentor session serializer
    """
    data_list = []
    for obj in MentorRequest_obj:
        data = {
            "user_id": obj.student.user_id,
            "full_name": obj.student.full_name,
            "id": obj.mentor_request_id,
            "profile_picture": obj.student.profile.profile_picture.url
        }
        data_list.append(data)
    return data_list
