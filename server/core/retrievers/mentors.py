from core.models import *
from core.retrievers.accounts import *
from core.senders.accounts import *
from core.serializers import MentorRequestSerializer

    
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
