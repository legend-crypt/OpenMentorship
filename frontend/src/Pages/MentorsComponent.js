import "../assets/styles/Mentors.css";
import DataFetcher from "../components/DataFetcher";
import MentorList from "../components/MentorList";
function MentorsComponent({isToggled, handleToggle}) {


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
          </div>
        </div>
        <DataFetcher url="mentors/" cacheKey="mentors" render={
          (data) => 
            <MentorList  data={data} divClass="mentorButtonContainer"/>
        }
        /> 
  </div>
  
  );
}

export default MentorsComponent;
