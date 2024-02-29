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
import MyMentors from "./MyMentors";
import AcceptStudents from "./AcceptStudents";
import Students from "./Students";
import MeetingPrompt from "./MeetingPrompt";
import Header from "../components/Header";
import MentorsComponent from "./MentorsComponent";
import { useNavigate } from "react-router-dom";
import React from "react";
import {useFetchAllTypesOfMentors} from "../utils/useDynamicLogic"

function Mentors() {
  const [isToggled, setIsToggled] = React.useState();

  const fetchMentors = useFetchAllTypesOfMentors(); // not necessary to store values

  const menteeToggleOptions = {
    userType : "mentee",
    options : {
      toggle1 : {
        name : "Find Mentors",
        path : "/mentors"
      },
      toggle2:{
        name : "Mentors",
        path : "/mentors/my-mentors"
      }
    }
  }

  const mentorToggleOptions = {
    userType : "mentor",
    options : {
      toggle1:{
        name : "Mentees",
        path : "/mentors/students"
      },
      toggle2 : {
        name : "Mentee Requests",
        path : "/mentors/students"
      },
    }
  }

  const navigate = useNavigate()

  const handleToggle = (path) => {
    setIsToggled((prev) => !prev);
    navigate(path)
  };

  return (
    <div>
      <nav>
        <Link to="mentors/accept-student" />
      </nav>
      {/* <Header />  */} {/* header is kept common for all pages content will change dynamically based on user status */}
      <Routes>
        {/* -- When user is a Mentee (student) ---*/}
        {/* path :: http://localhost:3000/mentors/ */}
        <Route index element={<MentorsComponent isToggled={isToggled} handleToggle={() => handleToggle('my-mentors')} toggleOptions={menteeToggleOptions} />} />

        {/* path :: http://localhost:3000/mentors/my-mentors  */}
        <Route path="my-mentors" element={<MyMentors isToggled={isToggled} handleToggle={() => handleToggle('/mentors')} toggleOptions={menteeToggleOptions} />} />

        {/* -- When user is a Mentor ---*/}
        {/* Path :: http://localhost:3000/mentors/students */}
        <Route path="students" element={<Students isToggled={isToggled} handleToggle={() => handleToggle('accept-students')} toggleOptions={mentorToggleOptions} />} />

        {/* Path :: http://localhost:3000/mentors/accept-students */}
        <Route path="accept-students" element={<AcceptStudents isToggled={isToggled} handleToggle={() => handleToggle('students')} toggleOptions={mentorToggleOptions} />} />

      </Routes>
      <Outlet />
    </div>
  );
}

export default Mentors;
