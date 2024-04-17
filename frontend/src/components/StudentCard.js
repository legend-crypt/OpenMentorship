import React from 'react'
import { Link } from "react-router-dom";
import "../css/mentor-card.css";
import axios from "../utils/axios";
import person from "../assets/images/mentor.jpg";



function StudentCard({name , image, id}) {

  const acceptOnclickHandler = (id) => {
    axios
      .post(
        'mentors/accept/',
        {
          mentorSession_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  const rejectOnclickHandler = (id) => {
    axios
      .delete(
        `mentors/reject/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="mentor-card">
      <img src={image? `http://127.0.0.1:8000${image}` : person} alt="Profile image" />
      <div className="mentor-details">
        <Link>{name}</Link>
        <span>Fullstack Developer</span>
        <div className="request-btns">
          <button onClick={() => acceptOnclickHandler(id)}>Accept</button>
          <button className="email" onClick={() => rejectOnclickHandler(id)}>Decline</button>
        </div>
      </div>
    </div>
  )
}

export default StudentCard