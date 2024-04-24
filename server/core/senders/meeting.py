from core.models import Meeting

def create_meeting(time, mentor, mentee, meeting_link=None):
    """Create meeting

    Args:
        user (User obj): user object
        time (DateTime): time
    """
    meeting = Meeting.objects.create(mentor=mentor, meeting_time=time, mentee=mentee, meeting_link=meeting_link)
    return meeting