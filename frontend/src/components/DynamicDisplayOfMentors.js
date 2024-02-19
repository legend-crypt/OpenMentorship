import React from 'react'
import User from './User';
import DynamicDisplayOfReqBtn from "./DynamicDisplayOfReqBtn";
import { useSelector } from 'react-redux';


const DynamicDisplayOfMentors = () => {


    const { allMentors, pendingRequestsToMentors, reqAcceptedMentors, isLoading } = useSelector((state) => state.mentors)

    return (
        <div>
            {isLoading ? <h1>Loading...</h1> : allMentors !== null && pendingRequestsToMentors !== null && reqAcceptedMentors !== null &&
                allMentors.map(item => {
                    return (
                        <div className='mentorsContainer m-2 border p-2 shadow-md mt-1 mb-1' key={item.user_id}>
                            <User name={`${item.profile?.first_name} ${item.profile?.last_name}`} bio={item.profile?.bio} />

                            <DynamicDisplayOfReqBtn currentMentorId={item.user_id} allAcceptedMentors={reqAcceptedMentors} allPendingMentorRequests={pendingRequestsToMentors} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DynamicDisplayOfMentors