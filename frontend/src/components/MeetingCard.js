import "../css/meeting_card.css";



const MeetingCard = ({ name, image }) => {


  return (
    <div className="meeting-card">
      <img src={`${image}`} alt="Profile image" />
      <div className="meeting-details">
        <p>{name}</p>
        <span>Fullstack Developer</span>
      </div>
    </div>
  );
};

export default MeetingCard;