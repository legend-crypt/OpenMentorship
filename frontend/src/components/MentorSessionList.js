import React from 'react'
import User from './User'

export default function ({data, children}) {
    const sessionList = data.map(item => {
        console.log(item.mentor.profile?.first_name)
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
