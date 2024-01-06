import React from 'react'
import User from './User'

export default function ({data, entity, children}) {
    const sessionList = data.map(item => {
        console.log(item.mentor.profile?.first_name)
        return (
            <div className='mentorsContainer' key={item.user_id}>
                <User name={`${item[entity].profile?.first_name} ${item[entity].profile?.last_name}`} bio={item[entity].profile?.bio}/>
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
