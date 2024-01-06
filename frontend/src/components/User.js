import React from 'react'

export default function User({name, bio,}) {
  return (
        <div className="mentorInfo">
            <h2 className="mentorName">{name}</h2><span className="mentorNumbers">50 members</span>
            <p className="mentorDescription">Software Engineer at Meta</p>
            <p className="mentorDescription">
                {bio}
            </p>
        </div>
  )
}
