import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import MentorList from "../components/MentorList";
import Cta from "../components/Cta";
import MentorSessionList from "../components/MentorSessionList";
import MentorToggleButton from "../components/MentorToggleButton";
import {useSelector, useDispatch} from "react-redux";

// meant for the users who are actually mentee
// listing - users mentors

function MyMentors({ isToggled, handleToggle, toggleOptions }) {
  
  const {reqAcceptedMentors} = useSelector((state)=> state.mentors);

  return (
    <div className="container min-h-screen">
      <div className="header--toggle">
        <div className="toggleContainer">
          <MentorToggleButton handleToggle={handleToggle} isToggled={isToggled} toggleOptions={toggleOptions} />
        </div>
        <h1>Hello</h1>
      </div>
    <DataFetcher url="mentors/students-requests/?status=accepted" cacheKey="studentMentors" render={
      (data) =>
        <MentorSessionList data={data} />
      }
      />
    </div>

  );
}

export default MyMentors;
