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
    serializer = MentorSessionSerializer(query_set)
    return serializer.data


def create_mentor_meeting(mentor_session:uuid, meeting_schedule:str) -> MentorSession:
    """Creates a mentor meeting
    Args:
        mentor_session (uuid): session id
        meeting_schedule (str): meeting schedule

    Returns:
        MentorSession: mentor session
    """
    mentor_session.meeting_schedule = meeting_schedule
    meeting_id = generate_meeting_id()
    mentor_session.save()
    mentor_session.meeting_id = meeting_id
    serializer = MentorSessionSerializer(mentor_session)
    return serializer.data