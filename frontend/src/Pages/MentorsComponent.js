/*
  The `MentorsComponent` React component serves as the main container for managing the UI related to mentors. It includes a toggle switch allowing users to switch between finding mentors and viewing their mentor list. This component utilizes the `DataFetcher` component to retrieve mentor data from the 'mentors/' endpoint. The rendered content is then handled by the `MentorList` component.

  Components:
  - MentorsComponent: Manages the UI for finding mentors and displaying the mentor list. It includes a toggle switch and utilizes the DataFetcher component to fetch mentor data.
  - MentorList: Renders a list of mentors, using the User component to display individual mentor information. It also incorporates the useDynamicLogic hook for handling dynamic logic related to mentor-student interactions.
  - DataFetcher: A component responsible for fetching data from a specified URL endpoint and rendering the content using a provided render function.

  Key Functionalities:
  - Toggle switch for finding mentors or viewing mentor list.
  - Fetches mentor data using the DataFetcher component.
  - Dynamically manages mentor-student interactions using the useDynamicLogic hook.
  - Renders mentor information using the MentorList component.

  Note: The code follows a modular structure, promoting reusability and maintainability.
*/


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
