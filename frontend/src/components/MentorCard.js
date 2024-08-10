import { Link } from "react-router-dom";
import "../css/mentor-card.css";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MentorCard = ({ name, image, mentorEmail, userId }) => {
  const [userMentors, setUserMentors] = useState("");

  useEffect(() => {
    axios
      .get("mentors/students-requests/", {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("access_token")
          )}`,
        },
      })
      .then((res) => {
        res.data.data.map((data) => setUserMentors(data.user_id));
      })
      .catch((err) => {});
  }, [userMentors]);

  const onclickHandler = (mentorEmail) => {
    const token = localStorage.getItem("access_token");
    axios
      .post(
        `mentors/create/`,
        {
          mentor_email: mentorEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        toast.success("Request sent successfully");
        setUserMentors(res.data.data.mentor.user_id);
      })

      .catch((err) => {
        toast.error(err.response.data.detail);
      });
  };

  return (
    <div className="mentor-card">
      <img src={`${image}`} alt="Profile" />
      <div className="mentor-details">
        <Link>{name}</Link>
        <span>Fullstack Developer</span>
        <div className="mentor-details-rate">
          <div className="">
            <p>4.3</p>
            <span>Ratings</span>
          </div>
          <div className="">
            <p>800</p>
            <span>Candidates</span>
          </div>
          <div className="">
            <p>61</p>
            <span>Requests</span>
          </div>
        </div>
        <div className="request-btns">
          {!userMentors.includes(userId) ? (
            <button onClick={() => onclickHandler(mentorEmail)}>Request</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
