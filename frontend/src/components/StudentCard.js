import React from 'react'
import { Link } from "react-router-dom";
import "../css/mentor-card.css";
import axios from "../utils/axios";
import person from "../assets/images/mentor.jpg";
import { toast } from 'react-toastify';


function StudentCard({name , image, id}) {

  const acceptOnclickHandler = (id) => {
    axios
      .post(
        'mentors/accept/',
        {
          mentorRequest_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`,
          },
        }
      )
      .then(() => {
        toast.success("Request accepted successfully");
      })

      .catch(() => {
        toast.error('Something went wrong! Please try again.');
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
      .then(() => {
        toast.success("Request rejected successfully");
      })

      .catch(() => {
        toast.error('Something went wrong! Please try again.');
      });
  }
  return (
    <div className="mentor-card">
      <img src={image? `${image}` : person} alt="Profile" />
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