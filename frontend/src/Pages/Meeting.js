import MeetingCard from '../components/MeetingCard';
import calender from '../assets/images/calender.svg';
import '../css/meeting.css';
import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
useEffect(() => {
  axios.get('/meeting/retrieve/',
  {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
    }
  })
  .then(res => {
      setMeetings(res.data.data)
  })
  .catch(err => {
    console.log(err);
  })
},[])
const formatDate = (datetimeString) => {
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  const dateTime = new Date(datetimeString);
  const date = dateTime.toLocaleDateString('en-US', options);
  const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return { date, time };
};

  return (
    <div className='container meeting'>
        <h1>Hello, John you have a meeting with </h1>
        <div className="container--grid">
          {meetings.map((data) => (
            
            <span>
              <MeetingCard key={data.id} name={data.mentee}/>
              <div key={data.id} className='calendar'>
                <img src={calender} alt='calender'/>
                <span className="details">
                    <p>{formatDate(data.time).date}</p>
                    <p>{formatDate(data.time).time}</p>
                </span>
                <button className='btn-meeting'><Link to="/call-room">Join Meeting</Link></button>
              </div>

            </span>
            
          ))}
          
        </div>

          <p>Please ensure that you have a stable internet connection and are in a quiet environment during the meeting. This will help to minimize disruptions and ensure a smooth communication experience.</p>
        {/* <div className='container--grid'>
          {meetings.map((data) => (
          <div className='calendar'>
            <img src={calender} alt='calender'/>
            <span className="details">
                <p>10TH April 2024</p>
                <p>10:00 AM</p>
            </span>
            <button className='btn-meeting'>Join Meeting</button>
          </div>
          ))}
        </div> */}
    </div>
  )
}
