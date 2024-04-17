import React from 'react'
import MeetingCard from '../components/MeetingCard';
import calender from '../assets/images/calender.svg';
import '../css/meeting.css';

export default function () {
  return (
    <div className='container meeting'>
        <h1>Hello, John you have a meeting with </h1>
        <MeetingCard/>
          <p>Please ensure that you have a stable internet connection and are in a quiet environment during the meeting. This will help to minimize disruptions and ensure a smooth communication experience.</p>
        <div className='calendar'>
            <img src={calender} alt='calender'/>
            <span className="details">
                <p>10TH April 2024</p>
                <p>10:00 AM</p>
            </span>
            <button className='btn-meeting'>Join Meeting</button>
        </div>
    </div>
  )
}
