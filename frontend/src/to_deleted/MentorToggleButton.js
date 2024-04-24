import React from 'react'
import { useLocation } from "react-router-dom";

const MentorToggleButton = ({ handleToggle, isToggled, toggleOptions }) => {


  const location = useLocation();
  const currentPath = location.pathname;
  const { options } = toggleOptions;
  // console.log(toggleOptions);
  return (
    <div
      // className={`toggleBackground ${isToggled ? "toggled" : ""}`}
      className={`toggleBackground ${currentPath === options.toggle1.path ? "toggled" : ""}`}
      onClick={handleToggle}
    >
      <span className="leftText">{options.toggle1.name}</span>
      <span className="rightText">{options.toggle2.name}</span>

      <div className="toggleAccentContainer">
        <div className={`toggleAccent ${currentPath === options.toggle1.path ? "toggled" : ""}`} />
      </div>
    </div>
  )
}

export default MentorToggleButton