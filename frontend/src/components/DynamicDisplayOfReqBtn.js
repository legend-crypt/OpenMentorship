import React, { useEffect, useState } from 'react'

const DynamicDisplayOfReqBtn = ({ currentMentorId, allPendingMentorRequests, allAcceptedMentors }) => {
    const [mentorReqStatus, setMentorReqStatus] = useState(null);

    useEffect(() => {
        allPendingMentorRequests.forEach((pendingMentorReq) => {
            if (currentMentorId === pendingMentorReq.user_id) {
                setMentorReqStatus("pending");
            }
        })

        if (mentorReqStatus === null) {
            allAcceptedMentors.forEach((acceptedMentor) => {
                if (currentMentorId === acceptedMentor.user_id) {
                    setMentorReqStatus("accepted");
                }
            })
        }
    }, [])

    return (
        <div>
            {mentorReqStatus === null ?
                <p>Send request</p>
                : mentorReqStatus === "accepted" ? 
                   <p> Request accepted</p> 
                   : 
                   <p>Request already sent</p>
            }
        </div>
    )
}

export default DynamicDisplayOfReqBtn