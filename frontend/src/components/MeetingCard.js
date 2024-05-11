import "../css/meeting_card.css";
import { mediaRootUrl } from "../utils/axios";



const MeetingCard = ({ name, image }) => {


  return (
    <div className="meeting-card">
      <img src={`${mediaRootUrl}${image}`} alt="Profile image" />
      <div className="meeting-details">
        <p>{name}</p>
        <span>Fullstack Developer</span>
      </div>
    </div>
  );
};

export default MeetingCard;