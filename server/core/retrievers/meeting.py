from core.models import MeetingDetail

def get_meeting_by_id(meeting_id) -> MeetingDetail:
    """Get meeting details by id

    Args:
        meeting_id (str): meeting id

    Returns:
        MeetingDetails: meeting details
    """
    try:
        return MeetingDetail.objects.get(meeting_id=meeting_id)
    except MeetingDetail.DoesNotExist:
        return None
    

def get_all_student_meeting(student)->list:
    """Get all student meeting

    Args:
        student (AccountUser): user object

    Returns:
        list: student meeting list
    """
    meetings = MeetingDetail.objects.filter(session__student=student)
    data = []
    for obj in meetings:
        data.append({
            "meeting_id": obj.meeting_id,
            "time": obj.time,
            "mentor": obj.session.mentor.email
        })
    return data


def get_all_mentor_meeting(mentor)->list:
    """Get all mentor meeting

    Args:
        mentor (AccountUser): user object

    Returns:
        list: mentor meeting list
    """
    meetings = MeetingDetail.objects.filter(session__mentor=mentor)
    data = []
    for obj in meetings:
        data.append({
            "meeting_id": obj.meeting_id,
            "time": obj.time,
            "mentee": obj.session.student.email
        })
    return data
    