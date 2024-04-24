import React from 'react'

export default function MentorsInfo({data}) {
    const mentorList = data.map((item) => {
        const mentorName = `${item.profile?.first_name} ${item.profile.last_name}`
        return (
            <div className="mentorsContainer">
            <div className="mentorInfo">
                <h2 className="mentorName">{mentorName}</h2><span className="mentorNumbers">50 members</span>
                <p className="mentorDescription">
                  Software Engineer at Meta</p>
                <p className="mentorDescription">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  <h1>Hello it's me</h1>
                </p>
            </div>
            <div className="mentorButtonContainer row-btn">
                <button className="btn-collection warning col-btn">Cancel Meeting</button>
``            </div>
          </div>
    
        )
    })
  return (
    <div></div>
  )
}
