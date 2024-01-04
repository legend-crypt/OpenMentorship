import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import MentorList from "../components/MentorList";
import Cta from "../components/Cta";
import Modal from "../components/Modal";
import useDynamicLogic from "../utils/useDynamicLogic";

function Students({isToggled, handleToggle}) {
  const {dataList, clickHandler} = useDynamicLogic("mentors/create/", "email", "mentorMeetings", "mentor_email");
  const [selectedStudent, setSelectedStudent] = React.useState(null);

  const handleCTAClick = (item) => {
    setSelectedStudent(item);
  }
  console.log(dataList)
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
          <MentorList data={data} divClass="mentorButtonContainer row-btn" entity="student">
            { (item) => 
              <>
              <Cta btnClass="btn-collection col-btn" disabled={item.status === "scheduled"} onClick={() => handleCTAClick(item)}>{item.status === "scheduled"? "Meeting Scheduled": "Schedule Meeting"}</Cta>
              <Cta btnClass="btn-collection col-btn danger">Remove Student</Cta>
            </>
            }          
          </MentorList>
      }
      />
      {/* <Modal/> */}
    </div>
  
  );
}

export default Students;
