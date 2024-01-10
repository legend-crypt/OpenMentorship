/*
  The `MentorList` React component is responsible for rendering a list of mentors based on the provided data. For each mentor, it utilizes the `User` component to display the mentor's name and bio. Additionally, it incorporates the useDynamicLogic hook to manage dynamic logic related to mentor-student meetings and requests.

  Components:
  - MentorList: Renders a list of mentors and utilizes the User component to display individual mentor information. It also incorporates the useDynamicLogic hook for handling dynamic logic related to mentor-student interactions.

  Key Functionalities:
  - Renders a list of mentors with User component for name and bio.
  - Utilizes the useDynamicLogic hook for dynamic logic related to mentor-student interactions.
  - Provides a button for requesting mentorship based on the current dynamic logic.

  Note: The code promotes modularity, allowing easy integration and maintenance of mentor-related functionalities.
*/


import React from 'react'
import User from './User'
import Cta from './Cta'
import useDynamicLogic from '../utils/useDynamicLogic'


export default function MentorList({data}) {
    const {dataList, clickHandler} = useDynamicLogic(
        'mentors/scheduled-meetings/', "mentor"
        )
    console.log(`dataList ${dataList}`)
    const mentorList = data.map(item => {
        return (
            <div className='mentorsContainer' key={item.user_id}>
                <User name={`${item.profile?.first_name} ${item.profile?.last_name}`} bio={item.profile?.bio}/>
                {!dataList.includes(item.user_id) && <div className='mentorButtonContainer'>
                    <Cta btnClass="btn-collection col-btn" clickHandler={() => clickHandler(item, "mentor_email", "mentors/create/")}>Request Mentoring</Cta>
                </div>}
            </div>
        )
    })
  return (
    <>
        {mentorList}
    </>
  )
}
