from core.models import *
from core.serializers import MentorSessionSerializer
from core.utils import *

def create_mentor_request(student:YelloUser, mentor:YelloUser) -> MentorSession:
    """Creates a mentor request

    Args:
        student (YelloUser): student
        mentor (YelloUser): mentor

    Returns:
        MentorSession: mentor session
    """
    query_set = MentorSession.objects.create(student=student, mentor=mentor)
    return query_set

