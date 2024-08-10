from core.models import Meeting


def get_user_meetings(user):
    """Get user meetings

    Args:
        user (User obj): user object

    Returns:
        Meeting: meeting
    """
    try:
        if user.role == "Mentor":
            meeting = Meeting.objects.filter(mentor=user)
        else:
            meeting = Meeting.objects.filter(mentee=user)
        return meeting

    except Meeting.DoesNotExist:
        return None


def get_meeting_by_id(id):
    """Get meeting by id

    Args:
        id (uuid): meeting id

    Returns:
        Meeting: meeting
    """
    try:
        return Meeting.objects.get(id=id)
    except Meeting.DoesNotExist:
        return None


def get_meeting_information(meeting_obj):
    """Get meeting information

    Args:
        meeting (Meeting obj): meeting object

    Returns:
        dict: meeting information
    """
    meetings = []
    for meeting in meeting_obj:
        meetings.append(
            {
                "id": meeting.meeting_id,
                "mentor": meeting.mentor.full_name,
                "mentee": meeting.mentee.full_name,
                "mentee_id": meeting.mentee.user_id,
                "time": meeting.meeting_time,
                "meeting_link": meeting.meeting_link,
                "mentor_image": (
                    meeting.mentor.profile.profile_picture.url
                    if meeting.mentor.profile
                    else None
                ),
                "mentee_image": (
                    meeting.mentee.profile.profile_picture.url
                    if meeting.mentee.profile
                    else None
                ),
            }
        )
    return meetings
