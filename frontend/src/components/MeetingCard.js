import { Link } from "react-router-dom";
import "../css/meeting_card.css";
import axios from "axios";
import person from "../assets/images/mentor.jpg";

const MeetingCard = ({ name }) => {


  return (
    <div className="meeting-card">
      <img src={person} alt="Profile image" />
      <div className="meeting-details">
        <p>{name}</p>
        <span>Fullstack Developer</span>
      </div>
    </div>
  );
};

export default MeetingCard;