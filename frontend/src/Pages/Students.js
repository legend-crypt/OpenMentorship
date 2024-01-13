/*
  The `Students` React component represents a section of the application dedicated to handling mentee requests. It utilizes the `DataFetcher` component to fetch data related to mentor-mentee meetings and displays it through the `MentorSessionList` component. Additionally, it incorporates a toggle switch and a modal for scheduling meetings with mentees.

  Component:
  - Students: Manages mentee requests, displays a toggle switch, and utilizes DataFetcher for fetching meeting data.

  Key Functionalities:
  - Displays a toggle switch allowing users to switch between mentee requests and viewing mentees.
  - Utilizes the DataFetcher component to fetch mentor-mentee meeting data.
  - Renders the fetched meeting data using the MentorSessionList component, providing buttons for scheduling meetings and removing mentees.
  - Utilizes a modal (Modal component) for scheduling meetings when the "Schedule Meeting" button is clicked.

  Note: This component follows a modular and reusable design, enhancing the overall maintainability and readability of the code.
*/



import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import Cta from "../components/Cta";
import MentorSessionList from "../components/MentorSessionList";
import Modal from "../components/Modal";
import MentorToggleButton from "../components/MentorToggleButton";

function Students({isToggled, handleToggle, toggleOptions}) {

  const [scheduleId, setScheduleId] = React.useState();
  console.log(`scheduleId is ${scheduleId}`);

  const clickHandler = (item) => {
    setScheduleId(item);
  }

  return (

    <div className="container">
      <div className="header--toggle">
        <div className="toggleContainer">
          <MentorToggleButton toggleOptions={toggleOptions} handleToggle={handleToggle} />
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
        </div>
      </div>
      <DataFetcher url="mentors/mentor-students/" cacheKey="mentorMeetings" render={
        (data) => 
          <MentorSessionList data={data} divClass="mentorButtonContainer row-btn">
            {(item) => 
            <>
              <Cta btnClass="btn-collection col-btn" clickHandler={()=> clickHandler(item.mentor_session_id)}>Schedule Meeting</Cta>
              <Cta btnClass="btn-collection danger col-btn">Remove Student</Cta>
            </>
            }

          </MentorSessionList>
      }
      />
      {scheduleId &&
       (<Modal onClose={() => setScheduleId(null)} title="Schedule Meeting" content="Select a date and time" confirmText="Schedule" isDateTimeInput={true} 
       meetingId={scheduleId}/>)}
    </div>
  
  );
}

export default Students;
