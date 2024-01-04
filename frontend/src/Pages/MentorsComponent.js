import React, { useEffect, useState } from "react";
import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import MentorList from "../components/MentorList";
import Cta from "../components/Cta";
import useDynamicLogic from "../utils/useDynamicLogic";
function MentorsComponent({isToggled, handleToggle}) {

  const {dataList, clickHandler} = useDynamicLogic("mentors/create/", "email", "studentMentors", "mentor_email");
  console.log(dataList)

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
        <DataFetcher url="mentors/" cacheKey="mentors" render={
          (data) => 
            <MentorList data={data} divClass="mentorButtonContainer" disablebutton={(mentorId) => dataList.includes(mentorId)}>
              {(item) => 
                  <Cta btnClass="mentorButton" clickHandler={() => clickHandler(item)}>Request Mentoring</Cta>
              }
            </MentorList>
        }
        /> 
  </div>
  
  );
}

export default MentorsComponent;
