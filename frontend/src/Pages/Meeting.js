import MeetingCard from '../components/MeetingCard';
import calender from '../assets/images/calender.svg';
import '../css/meeting.css';
import React, {useState, useEffect} from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner'


export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date();
  const userRole = useSelector((state) => state.userRole.role)

useEffect(() => {
  axios.get('/meeting/retrieve/', {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
    }
  })
    .then(res => {
      setMeetings(res.data.data);
      setLoading(false);
    })
    .catch(() => {
      toast.error('Failed to retrieve meetings');
      setLoading(false);
    });
  setLoading(true);
},[])
const formatDate = (datetimeString) => {
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  const dateTime = new Date(datetimeString);
  const date = dateTime.toLocaleDateString('en-US', options);
  const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return { date, time };
};

  return (
    
    <div className='container meeting min-h-screen'>
      {
        loading ? (
        <TailSpin
          color="#00BFFF"
          height={200} width={200} 
          wrapperClass='flex items-center justify-center'
        />
        ) : (
      <>
        {
          meetings.length === 0 ? (
            <h1>No meetings scheduled</h1>
          ) : (
            <h1>Hello, you have a meeting with</h1>
        )}
          <div className="container--grid">
            {meetings.map((data) => (
              <span key={data.id}>
                <MeetingCard name={userRole === 'Mentor' ? data.mentee : data.mentor} image={userRole === 'Mentor' ? data.mentee_image : data.mentor_image}/>
                <div className='calendar'>
                  <img src={calender} alt='calender'/>
                  <span className="details">
                      <p>{formatDate(data.time).date}</p>
                      <p>{formatDate(data.time).time}</p>
                  </span>
                  {today >= new Date(data.time) && 
                  <button className='btn-meeting'><Link to={data.meeting_link}>Join Meeting</Link></button>}
                </div>

              </span>
              
            ))}
            
          </div>
            <p>Please ensure that you have a stable internet connection and are in a quiet environment durings meeting. This will help to minimize disruptions and ensure a smooth communication experience.</p>
        </>
      )}
    </div>
  )
}
