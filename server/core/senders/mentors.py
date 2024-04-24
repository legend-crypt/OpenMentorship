from core.models import *
from core.serializers import MentorRequestSerializer
from core.utils import *

def create_mentor_request(student:AccountUser, mentor:AccountUser) -> MentorRequest:
    """Creates a mentor request

    Args:
        student (AccountUser): student
        mentor (AccountUser): mentor

    Returns:
        MentorRequest: mentor session
    """
    query_set = MentorRequest.objects.create(student=student, mentor=mentor)
    return query_set
