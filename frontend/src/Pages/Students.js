import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import Cta from "../components/Cta";
import MentorSessionList from "../components/MentorSessionList";
import Modal from "../components/Modal";

function Students({isToggled, handleToggle}) {

  const [scheduleId, setScheduleId] = React.useState();
  console.log(`scheduleId is ${scheduleId}`);

  const clickHandler = (item) => {
    setScheduleId(item);
  }

  return (

    <div className="container">
      <div className="header--toggle">
        <div className="toggleContainer">
          <div
            className={`toggleBackground ${isToggled ? "toggled" : ""}`}
            onClick={handleToggle}
          >
            <span className="leftText">Mentee Requests</span>
            <span className="rightText">Mentees</span>
            <div className="toggleAccentContainer">
              <div className={`toggleAccent ${isToggled ? "toggled" : ""}`} />
            </div>
          </div>
        </div>
      </div>
      <DataFetcher url="mentors/meetings/" cacheKey="mentorMeetings" render={
        (data) => 
          <MentorSessionList data={data} divClass="mentorButtonContainer row-btn" entity="student">
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
