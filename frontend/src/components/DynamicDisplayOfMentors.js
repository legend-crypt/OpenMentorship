import React, { useEffect, useState } from 'react'
import { authInstance } from "../utils/axios"
import User from './User';
import DynamicDisplayOfReqBtn from "./DynamicDisplayOfReqBtn";


const DynamicDisplayOfMentors = () => {

    const [allMentors, setAllMentors] = useState(null);
    const [pendingMentors, setPendingMentors] = useState(null);
    const [acceptedMentors, setAcceptedMentors] = useState(null);
    const [isApiResolved, setIsApiResolved] = useState(false);

    useEffect(() => {
        authInstance.get('mentors/')
            .then((response) => {
                // This will load all the mentors
                const { data } = response.data;
                setAllMentors(data)
                // console.log("All mentors", data);

                // make next API call to retrieve pending requests 
                return authInstance.get("/mentors/students-requests?status=pending")
            })
            .then((response) => {
                // This will load all the mentors
                const { data } = response.data;
                setPendingMentors(() => {
                    // this will return unique users (because user has already made same request to same mentor for multiple times & that created duplicate user request)
                    const uniqueUsers = data.reduce((acc, cur) => {
                        const existingUser = acc.find(user => user.user_id === cur.user_id);
                        if (!existingUser) {
                            acc.push(cur);
                        }
                        return acc;
                    }, []);


                    return uniqueUsers
                });
                // console.log("Pending requests", data);

                //  make next API call to retrieve all accepted requests
                return authInstance.get("/mentors/students-requests?status=accepted")
            })
            .then((response) => {
                // This will load all the mentors
                const { data } = response.data;
                setAcceptedMentors(data);
                // console.log("Accepted mentors", data);
            })
            .catch((error) => {
                console.log("Some error occurred", error);
                window.alert("Some error occurred");
            })
            .finally(() => {
                setIsApiResolved(true);
            })
    }, [])

    return (
        <div>
            {isApiResolved === false ?
                <h1>I am loading</h1> :
                <>
                    {allMentors.map(item => {
                        return (
                            <div className='mentorsContainer m-2 border p-2 border-red-500' key={item.user_id}>
                                <User name={`${item.profile?.first_name} ${item.profile?.last_name}`} bio={item.profile?.bio} />

                                <DynamicDisplayOfReqBtn currentMentorId={item.user_id} allAcceptedMentors={acceptedMentors} allPendingMentorRequests={pendingMentors} />
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}

export default DynamicDisplayOfMentors