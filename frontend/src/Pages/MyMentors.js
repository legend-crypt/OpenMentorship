import * as React from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import MentorList from "../components/MentorList";
import Cta from "../components/Cta";



function MyMentors({isToggled, handleToggle}) {
  
  return (
    <div className="container">
      <div className="header--toggle">
        <div className="toggleContainer">
          <div
            className={`toggleBackground ${isToggled ? "toggled" : ""}`}
            onClick={handleToggle}
          >
            <span className="leftText">Find Mentors</span>
            <span className="rightText">Mentors</span>
            <div className="toggleAccentContainer">
              <div className={`toggleAccent ${isToggled ? "toggled" : ""}`} />
            </div>
          </div>
          {/* <div className="profileImage"><img src="/profile.png"/></div> */}
        </div>
      </div>
    <DataFetcher url="mentors/students/meetings/" cacheKey="studentMentors" render={
      (data) =>
        <MentorList data={data} divClass="mentorButtonContainer row-btn" entity="mentor">
          { () =>
           <>
              <Cta btnClass="btn-collection warning col-btn">Cancel Meeting</Cta>
              <Cta btnClass="btn-collection danger col-btn">Remove Mentor</Cta>
          </>
          }
        </MentorList>
      }
      />


    </div>
  
  );
}

export default MyMentors;