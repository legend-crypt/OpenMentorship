/*
  The `AcceptStudents` React component is responsible for displaying and managing mentee requests. It utilizes the `MentorSessionList` component to render a list of mentor-mentee session information. The component includes buttons for accepting and denying mentee requests, allowing mentors to take action on pending requests.

  Component:
  - AcceptStudents: Manages and displays mentee requests, allowing mentors to accept or deny them.

  Key Functionalities:
  - Utilizes the `MentorSessionList` component to display a list of mentor-mentee session information.
  - Includes buttons for accepting and denying mentee requests within each session item.
  - Uses a `DataFetcher` to fetch and render pending mentee requests.
  - Provides a flexible structure for managing and responding to mentee requests.

  Note: This component enhances the mentor's experience by providing a clear interface for handling mentee requests with options to accept or deny each request.
*/



import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import Cta from "../components/Cta";
import MentorSessionList from "../components/MentorSessionList";
import MentorToggleButton from "../components/MentorToggleButton";

function AcceptStudents({isToggled, handleToggle, toggleOptions}) {
  const clickHandler = () => {

  }


  return (
    <div className="container min-h-screen">
      <div className="header--toggle">
        <div className="toggleContainer">
          <MentorToggleButton handleToggle={handleToggle} toggleOptions={toggleOptions} />
          {/* <div
            className={`toggleBackground ${isToggled ? "toggled" : ""}`}
            onClick={handleToggle}
          >
            <span className="leftText">Mentee Requests</span>
            <span className="rightText">Mentees</span>
            <div className="toggleAccentContainer">
              <div className={`toggleAccent ${isToggled ? "toggled" : ""}`} />
            </div>
          </div> */}
          {/* <div className="profileImage"><img src="/profile.png"/></div> */}
        </div>
      </div>
      <div className="mentorsContainer">
          <div className="mentorInfo">
            <h2 className="mentorName">Mentor Name</h2><span className="mentorNumbers">50 members</span>
            <p className="mentorDescription">
              Software Engineer at Meta</p>
            <p className="mentorDescription">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        <div className="mentorButtonContainer row-btn">
        <button className="btn-collection danger col-btn">Deny</button>
          <button className="btn-collection col-btn">Accept</button>
      </div>
    </div>
    <DataFetcher url="mentors/mentor-requests/?status=pending" cacheKey="pendingRequests" render={
      (data) => 
      <MentorSessionList data={data} divClass="mentorButtonContainer row-btn">
        {(item) => 
          <>
            <Cta btnClass="btn-collection col-btn" clickHandler={() => clickHandler(item)}>Accept</Cta>
            <Cta btnClass="btn-collection danger col-btn" clickHandler={() => clickHandler(item)}>Deny</Cta>
          </>
        }
      </MentorSessionList>
     }
     />
    </div>
  
  );
}

export default AcceptStudents;
