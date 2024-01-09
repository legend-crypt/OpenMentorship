/*
  The `MentorSessionList` React component is a generic component for displaying a list of mentor-mentee session information. It takes a `data` prop containing the session data and a `children` prop representing a callback function to render additional content within each session item.

  Component:
  - MentorSessionList: Displays a list of mentor-accepted request.

  Key Functionalities:
  - Maps through the provided `data` array to render individual session items.
  - Utilizes the `User` component to display mentor information within each session item.
  - Allows customization of additional content within each session item through the `children` prop.

  Note: This component promotes reusability by providing a flexible structure for displaying mentor-mentee session information with the ability to include custom content.
*/



import React from 'react'
import User from './User'

export default function ({data, children}) {
    console.log(data)
    const sessionList = data.map(item => {
        return (
            <div className='mentorsContainer' key={item.user.user_id}>
                <User name={`${item.user.profile?.first_name} ${item.user.profile?.last_name}`} bio={item.user.profile?.bio}/>
                <div className='mentorButtonContainer'>
                    {children(item)}
                </div>
            </div>
        )
    })
    console.log(sessionList)
  return (
    <div>
        {sessionList}
    </div>
  )
}
