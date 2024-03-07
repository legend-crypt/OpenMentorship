/*
  The `useDynamicLogic` custom React hook encapsulates dynamic logic related to handling data and interactions with the server. It is designed to be used in components where dynamic data manipulation and server requests are required.

  Hook:
  - useDynamicLogic: Manages dynamic logic for fetching and updating data related to mentor-student interactions.

  Key Functionalities:
  - Retrieves data from the specified URL using the provided access token and configuration.
  - Updates the local state (`dataList`) with the relevant attribute values (e.g., mentor or student user IDs).
  - Provides a click handler function (`clickHandler`) for handling user interactions, such as making requests or initiating meetings.
  - Sends requests to the server using the provided URL and updates the local state accordingly.
  - Logs relevant information for debugging purposes.

  Note: This hook promotes reusability by encapsulating logic related to server interactions and dynamic data manipulation, enhancing the maintainability of the code that utilizes it.
*/




import { useEffect, useState } from 'react';
import axios, { authInstance } from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAllMentors, addPendingRequestsToMentors, addReqAcceptedMentors, setLoading } from "../store/slices/mentors/mentorsSlice";
import { setPendingStudentRequest, setAcceptedStudents } from '../store/slices/students/studentsSlice';

export default function useDynamicLogic(url) {
  const [dataList, setDataList] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem('access_token'));

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    fetchData();
    // }, [dataList]); // this is causing an infinite loop
  }, []);

  const fetchData = () => {
    axios.get(url, config)
      .then(res => {
        if (res.data.data) {
          // meetings found
          const newDataList = res.data.data.map(item => item.user_id);
          console.log(`newDataList ${newDataList}`);
          setDataList(newDataList);
        }
        // If no meetings not found
        // response is like --> {data : {"detail": "No meetings found"}, ...other}
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clickHandler = async (item, req, url) => {
    console.log(`item click ${item}`);
    try {
      const itemAttribute = item.email;
      const formData = new FormData();
      formData.append(req, itemAttribute);

      const response = await axios.post(url, formData, config);
      // alert(response.data.detail);
      console.log(response.data.detail);

      const newItem = response.data.data; // Use atr as the key to access the dynamic attribute
      // updateLocalStorage(newItem);
      updateDataList(newItem.user.user_id);
    } catch (error) {
      // alert(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  // const updateLocalStorage = (newItem) => {
  //   const existingData = JSON.parse(localStorage.getItem(cacheKey)) || [];
  //   const updatedData = [...existingData, newItem];
  //   localStorage.setItem(cacheKey, JSON.stringify(updatedData));
  // };

  const updateDataList = (userId) => {
    setDataList(prevDataList => [...prevDataList, userId]);
  };

  return { dataList, clickHandler };
}


/* 
fetch all types of mentors (normal, accepted, pending) & update global states. This will minimize the number of api calls to fetch all types mentors. This states can be used widely in any of the components that comes under 'Mentors" component ("pages/Mentors.js")
*/

/* When user type is mentee(student) then this function loads all types of mentors for student */
export function useFetchDynamicData() {
  const [isApiResolved, setIsApiResolved] = useState(false);
  const [isError, setError] = useState(false);

  const { allMentors } = useSelector((state) => state.mentors);
  const { acceptedStudents } = useSelector((state) => state.students);
  const { userDetails } = useSelector((state) => state.userAuth);
  const userType = userDetails?.["use-role"];
  const dispatch = useDispatch();

  useEffect(() => {
    // user type is Mentee (student)
    if (userType === "Mentee") {
      if (allMentors === null) {
        // console.log("I am a mentee & mentors will be loaded");
         authInstance.get('mentors/')
          .then((response) => {
            // This will load all the mentors
            const { data } = response.data;
            // set global state
            dispatch(addAllMentors(data))
            // make next API call to retrieve pending requests 
            return authInstance.get("/mentors/students-requests?status=pending")
          })
          .then((response) => {
            // This will load all the mentors involving pending requests
            const { data } = response.data;

            // this will return unique users (because user has already made same request to same mentor for multiple times & that created duplicate user request)
            const uniqueUsers = data.reduce((acc, cur) => {
              const existingUser = acc.find(user => user.user_id === cur.user_id);
              if (!existingUser) {
                acc.push(cur);
              }
              return acc;
            }, []);

            // set global state
            dispatch(addPendingRequestsToMentors(uniqueUsers));

            //  make next API call to retrieve all accepted requests
            return authInstance.get("/mentors/students-requests?status=accepted")
          })
          .then((response) => {
            // This will load all the mentors
            const { data } = response.data;
            const uniqueUsers = data.reduce((acc, cur) => {
              const existingUser = acc.find(user => user.user_id === cur.user_id);
              if (!existingUser) {
                acc.push(cur);
              }
              return acc;
            }, []);
            // set global state
            dispatch(addReqAcceptedMentors(uniqueUsers));
          })
          .catch((error) => {
            console.log("Some error occurred", error);
            // window.alert("Some error occurred");
            dispatch(setError(true));
          })
          .finally(() => {
            setIsApiResolved(true);
            dispatch(setLoading(false));
            return
          })
      }
    } else {
      // user Type is Mentor
      // if any value is null then fetch data otherwise do not fetch
      if (acceptedStudents === null) {
        // console.log("I am a mentor & mentee will be loaded");
        // then fetch students
        authInstance.get("mentors/mentor-requests/?status=pending")
          .then((res) => {
            // loads all pending requests of students to the mentor
            const {data} = res.data;
            // incoming data may be duplicated so we will only make unique
            const uniqueUsers = data.reduce((acc, cur) => {
              const existingUser = acc.find(user => user.user_id === cur.user_id);
              if (!existingUser) {
                acc.push(cur);
              }
              return acc;
            }, []);
            dispatch(setPendingStudentRequest(uniqueUsers));

            return authInstance.get("/mentors/mentor-requests/?status=accepted")
          })
          .then((res) => {
            // loads all accepted requests of students to the mentor
            const {data} = res.data;
            const uniqueUsers = data.reduce((acc, cur) => {
              const existingUser = acc.find(user => user.user_id === cur.user_id);
              if (!existingUser) {
                acc.push(cur);
              }
              return acc;
            }, []);
            dispatch(setAcceptedStudents(uniqueUsers))
          })
          .catch((err) => {
            console.log(err);
            alert("Some error occurred");
          })
          .finally(() => {
            setIsApiResolved(true);
          })
      }
    }
  }, [])

  // after setting up global states it returns an object with error status & are all api resolved
  return { isError, isApiResolved }
}