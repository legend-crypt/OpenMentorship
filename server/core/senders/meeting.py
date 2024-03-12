from core.models import MeetingDetail


def create_meeting(session, time):
    """Create a meeting"""
    meeting = MeetingDetail.objects.create(session=session, time=time)
    return meeting

def up_meeting(session, time):
    """Update a meeting"""
    meeting = MeetingDetail.objects.get(session=session)
    meeting.time = time
    meeting.save()
    return meeting