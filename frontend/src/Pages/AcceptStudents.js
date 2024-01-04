import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import MentorList from "../components/MentorList";
import axios from "../utils/axios"
import Cta from "../components/Cta";
import useDynamicLogic from "../utils/useDynamicLogic";

function AcceptStudents({isToggled, handleToggle}) {
  // const {dataList, clickHandler} = useDynamicLogic("mentors/accept/", "user_id", "pendingRequests", "student_id");



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
    {/* <DataFetcher url="mentors/pending-requests/" cacheKey="pendingRequests" render={
      (data) => 
      <MentorList data={data} divClass="mentorButtonContainer row-btn" disablebutton={(studentId) => dataList.includes(studentId)}>
        {(item) => 
          <>
            <Cta btnClass="btn-collection col-btn" clickHandler={() => clickHandler(item)}>Accept</Cta>
            <Cta btnClass="btn-collection danger col-btn" clickHandler={() => clickHandler(item)}>Deny</Cta>
          </>
        }
      </MentorList>
     }
     /> */}
    </div>
  
  );
}

export default AcceptStudents;
