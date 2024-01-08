import React from 'react'
import DataFetcher from '../components/DataFetcher'

export default function MeetingSchedule() {
    const listMeeting = (data, field) => {
        const meetingList = data.map(item => {
            return (
                <div className='mentorsContainer' key={item.user_id}>
                    <p>Your meeting                     <User name={`${item[field].profile?.first_name} ${item[field].profile?.last_name}`} />
                    is schedule at {item.time}</p>
                    <p> Please join with this meeting ID :{item.meeting_id}</p>
                    <div className='mentorButtonContainer'>
                        <Cta btnClass="btn-collection col-btn" clickHandler={() => clickHandler(item, "email", "mentor_email", "mentors/create/")}>Join Meeting</Cta>
                    </div>
                </div>
            )
            return {meetingList}
        })
    }
  return (
    <div>
    </div>
  )
}
