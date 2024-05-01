/*
  The `Mentors` React component serves as the main container for managing different sections related to mentors and mentees. It utilizes React Router for navigation and rendering of various subcomponents such as MyMentors, AcceptStudents, Students, and others. The component structure and navigation logic enhance the organization and usability of the application.

  Component:
  - Mentors: Manages navigation and rendering of different sections related to mentors and mentees.

  Key Functionalities:
  - Utilizes React Router (Link, Outlet, Routes, Route) for navigation between different mentor-related sections.
  - Incorporates subcomponents like MyMentors, AcceptStudents, Students, and others to handle specific functionalities.
  - Uses a Header component for consistent navigation and branding.
  - Manages a toggle state (`isToggled`) to control the appearance of specific UI elements.

  Note: The `handleToggle` function manages the toggle state and navigation, providing a cohesive user experience when switching between mentor-related sections.
*/



import { Link, Outlet, Routes, Route } from "react-router-dom";
// import MyMentors from "./MyMentors";
// import AcceptStudents from "./AcceptStudents";
// import Students from "./Students";
// import MeetingPrompt from "./MeetingPrompt";
// import Header from "../components/Header";
// import MentorsComponent from "./MentorsComponent";
// import { useNavigate } from "react-router-dom";
import '../css//Mentors.css';
import React, { useEffect } from "react";
import MentorCard from "../components/MentorCard";
import axios from '../utils/axios'

function Mentors() {
  const [isToggled, setIsToggled] = React.useState();
  const [mentors , setMentors] = React.useState([]);

  useEffect(() => {
    axios.get('mentors/',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
      }
    }).then((res) => {
      setMentors(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);



  return (
    <div className="container page-margin">
      <div className="container--grid">
        {mentors.map((data) => (
          <MentorCard key={data.user_id} name={data?.full_name} image={data?.profile_picture} mentorEmail={data.email} userId={data.user_id}/>
        ))}
      </div>
    </div>
  );
}

export default Mentors;
