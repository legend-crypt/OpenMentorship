import React, { useEffect, useState } from 'react'
import Cta from './Cta';

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
                <>
                    <Cta btnClass="btn-collection col-btn" >
                        Send request
                    </Cta>
                </>
                : mentorReqStatus === "accepted" ?
                    <>
                        <Cta btnClass="btn-collection col-btn" >
                           Request accepted
                        </Cta>
                    </>
                    :
                    <>
                    <Cta btnClass="bg-gray-300 text-white p-2 rounded" >
                       Invitation sent
                    </Cta>
                    <Cta btnClass="bg-red-500 text-white p-2 rounded" >
                       Withdraw request
                    </Cta>
                </>
            }

        </div>
    )
}

export default DynamicDisplayOfReqBtn