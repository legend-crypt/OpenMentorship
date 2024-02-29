/*
  The `User` React component is a presentational component responsible for rendering information about a mentor. It takes in the mentor's name, bio, and other details as props and displays them in a structured format.

  Component:
  - User: Renders information about a mentor, including their name, bio, and additional details.

  Key Functionalities:
  - Displays the mentor's name in a heading (h2) element with the class 'mentorName'.
  - Shows a span element with the class 'mentorNumbers' indicating the number of members associated with the mentor (e.g., "50 members").
  - Displays a paragraph element with the class 'mentorDescription' providing information about the mentor's role (e.g., "Software Engineer at Meta").
  - Renders the mentor's bio in a paragraph element with the class 'mentorDescription'.

  Note: The component is designed for reusability, allowing it to be easily integrated into different parts of the application where mentor information needs to be displayed.
*/

import React from 'react'

export default function User({name, bio,}) {
  return (
        <div className="mentorInfo">
            <h2 className="mentorName">{name}</h2>
            {/* <span className="mentorNumbers">50 members</span>
            <p className="mentorDescription">Software Engineer at Meta</p> */}
            <p className="mentorDescription text-left">
              {bio}
            </p>
        </div>
  )
}
