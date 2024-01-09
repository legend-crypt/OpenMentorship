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
