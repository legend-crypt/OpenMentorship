import { Link } from "react-router-dom";
import "../css/meeting_card.css";
import axios from "axios";
import person from "../assets/images/mentor.jpg";

const MeetingCard = ({ name, expertPicture, expertId }) => {

  const onclickHandler = (expertId) => {
    console.log("clicked");
    const token = localStorage.getItem("INTERVIEW-IQ%USER");
    axios
      .post(
        `http://127.0.0.1:8000/api/connectionrequests/request/submit/`,
        {
          expert: expertId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${user.token.access}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="meeting-card">
      <img src={person} alt="Profile image" />
      <div className="meeting-details">
        <p>Mark</p>
        <span>Fullstack Developer</span>
      </div>
    </div>
  );
};

export default MeetingCard;