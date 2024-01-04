import React from 'react'


export default function MentorList({data, entity, children, divClass, disablebutton}) {
    let mentorList = []

    if (data && data.length > 0 && data[0].user_id) {
        mentorList = data.map(item => {
            const mentorName = `${item.profile?.first_name} ${item.profile?.last_name}`
            return (
                <div className="mentorsContainer" key={item.user_id}>
                    <div className="mentorInfo">
                    <h2 className="mentorName">{mentorName}</h2><span className="mentorNumbers">50 members</span>
                    <p className="mentorDescription">Software Engineer at Meta</p>
                    <p className="mentorDescription">
                        {item.profile?.bio}
                    </p>
                    </div>
                    <div className={divClass}>
                        {!disablebutton || !disablebutton(item.user_id) ? <>{children(item)}</> : null}
                    </div>
                </div>
                
            )
        })
    } else if (data && data.length > 0 && data[0].mentor_session_id) {
        mentorList = data.map(item => {
            const mentorName = `${item[entity].profile?.first_name} ${item[entity].profile?.last_name}`
            return (
                <div className="mentorsContainer" key={item.mentor_session_id}>
                    <div className="mentorInfo">
                    <h2 className="mentorName">{mentorName}</h2><span className="mentorNumbers">50 members</span>
                    <p className="mentorDescription">Software Engineer at Meta</p>
                    <p className="mentorDescription">
                        {item.mentor.profile?.bio}
                    </p>
                    </div>
                    <div className={divClass}>
                        {!disablebutton || !disablebutton(item[entity].user_id) ? <>{children(item[entity])}</> : null}
                    </div>
                </div>
                
            )
        })
    }
  return (
    <>
        {mentorList}
    </>
  )
}
