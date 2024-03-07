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
import { useDispatch, useSelector } from 'react-redux';
import {authInstance} from "./../utils/axios"

function AcceptStudents({ isToggled, handleToggle, toggleOptions }) {


  const clickHandler = (session_id) => {
    authInstance.post(`mentors/accept/`,{
      "mentorSession_id" : `${session_id}`
    }).then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })
    .finally(()=>{
       console.log("Finally out");
    })
  }
  const { pendingStudentRequest,acceptedStudents } = useSelector((state) => state.students);

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
      {/* <div className="mentorsContainer">
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
      </div> */}
      {/* <DataFetcher url="mentors/mentor-requests/?status=pending" cacheKey="pendingRequests" render={
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
     /> */}
      {pendingStudentRequest &&
        <>
          {pendingStudentRequest.map((studentReq, index) => {
            const { full_name, user_id, id } = studentReq;
            
            return <div key={index} className="flex justify-between min-h-20 shadow-sm p-2 rounded-sm mt-2 mb-2" >
              <div>
                <h1 className="font-semibold mb-1" >{full_name}</h1>
                <p className="text-sm text-gray-500 text-left" >Tile....</p>
                <p className="text-sm text-gray-500 text-left" >Description....</p>
              </div>
              <div className="h-full flex flex-col justify-end" >
                <div >
                  <Cta btnClass="btn-collection col-btn " clickHandler={() => clickHandler(id)}>Accept</Cta>
                  <Cta btnClass="btn-collection danger col-btn" clickHandler={() => clickHandler()}>Deny</Cta>
                </div>
              </div>
            </div>
          })}
        </>
      }
    </div>

  );
}

export default AcceptStudents;
