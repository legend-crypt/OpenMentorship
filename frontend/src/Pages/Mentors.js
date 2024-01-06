import { Link, Outlet, Routes, Route } from "react-router-dom";
import MyMentors from "./MyMentors";
import AcceptStudents from "./AcceptStudents";
import Students from "./Students";
import MeetingPrompt from "./MeetingPrompt";
import Header from "../components/Header";
import MentorsComponent from "./MentorsComponent";
import { useNavigate } from "react-router-dom";
import React from "react";

function Mentors() {
  const [isToggled, setIsToggled] = React.useState();

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
      <Header />
      <Routes>
        <Route index element={<MentorsComponent isToggled={isToggled} handleToggle={() => handleToggle('my-mentors')} />} />

        <Route path="my-mentors" element={<MyMentors isToggled={isToggled} handleToggle={() => handleToggle('/mentors')} />} />

        <Route path="students" element={<Students isToggled={isToggled} handleToggle={() => handleToggle('accept-students')} />} />

        <Route path="accept-students" element={<AcceptStudents isToggled={isToggled} handleToggle={() => handleToggle('students')} />} />

      </Routes>
      <Outlet />
    </div>
  );
}

export default Mentors;
