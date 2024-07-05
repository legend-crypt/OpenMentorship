import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import "../css/mentor-card.css";
import axios from "../utils/axios";
import person from "../assets/images/mentor.jpg";
import Modal from './Modal';



function AcceptStudentCard({name , image, id}) {
  const [isOpen, setIsOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    axios.get('/meeting/retrieve/',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
      }
    }
    )
    .then(res => {
      res.data.data.map((data) => {
        setMeetings((meetings) => [...meetings, data.mentee_id])
      });
    })
    .catch(err => {
    })
  },[])

  const modalOnclickHandler = () => {
    setIsOpen(true);
  }


  return (
    <div className="mentor-card">
      <img src={image? `${image}` : person} alt="Profile image" />
      <div className="mentor-details">
        <Link>{name}</Link>
        <span>Fullstack Developer</span>
        <div className="request-btns">
          <button onClick={!meetings.includes(id)? modalOnclickHandler: null}>{!meetings.includes(id) ? 'Schedule Meeting': 'Scheduled'}</button>
          {/* <button className="email" onClick={() => rejectOnclickHandler(id)}>Decline</button> */}
        </div>
      </div>
      {isOpen && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Schedule Meeting" content="Select a date and time for the meeting" confirmText="Schedule" isDateTimeInput={true} menteeId={id} />}
    </div>
  )
}

export default AcceptStudentCard