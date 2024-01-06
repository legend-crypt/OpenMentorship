import React from 'react'
import User from './User'
import Cta from './Cta'
import useDynamicLogic from '../utils/useDynamicLogic'


export default function MentorList({data}) {
    const {dataList, clickHandler} = useDynamicLogic(
        'mentors/students/meetings/', "mentor"
        )
    console.log(`dataList ${dataList}`)
    const mentorList = data.map(item => {
        return (
            <div className='mentorsContainer' key={item.user_id}>
                <User name={`${item.profile?.first_name} ${item.profile?.last_name}`} bio={item.profile?.bio}/>
                {!dataList.includes(item.user_id) && <div className='mentorButtonContainer'>
                    <Cta btnClass="btn-collection col-btn" clickHandler={() => clickHandler(item, "email", "mentor_email", "mentors/create/")}>Request Mentoring</Cta>
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
