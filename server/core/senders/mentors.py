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


def create_mentor_meeting(mentor_session:uuid, meeting_schedule:str) -> MentorRequest:
    """Creates a mentor meeting
    Args:
        mentor_session (uuid): session id
        meeting_schedule (str): meeting schedule

    Returns:
        MentorRequest: mentor session
    """
    mentor_session.meeting_schedule = meeting_schedule
    meeting_id = generate_meeting_id()
    mentor_session.meeting_id = meeting_id
    mentor_session.status = "scheduled"
    mentor_session.save()
    return mentor_session