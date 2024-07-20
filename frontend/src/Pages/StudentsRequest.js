import React from 'react';
import StudentCard from '../components/StudentCard';
import { useState, useEffect } from 'react';
import axios  from '../utils/axios';
import '../css/Mentors.css';
import AcceptStudentCard from '../components/AcceptedStudents';
import { toast } from 'react-toastify';


function StudentsRequest() {
  const [students, setStudents] = useState([])
  const [acceptedStudents, setAcceptedStudents] = useState([])
  useEffect(() => {
    axios.get('mentors/mentor-requests/?status=pending',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
      }
    }).then((res) => {
      setStudents(res.data.data)
    })
    .catch((err) => {
      toast.error('Failed to retrieve pending requests');
    });
  }, []);
  useEffect(() => {
    axios.get('mentors/mentor-requests/?status=accepted',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
      }
    }).then((res) => {
      setAcceptedStudents(res.data.data)
    })
    .catch((err) => {
      toast.error('Failed to retrieve accepted students');
    });
  }, []);
  return (
    <div className="container page-margin">
        {/* min-h-screen */}
      <div className="container--grid-uneven min-h-screen">
        <div className="requests container--grid">
          {students.length > 0 ? 
            (students.map((data) => (
              <StudentCard
              key={data.user_id}
              name={data.full_name}
              image={data.profile_picture}
              studentEmail={data.email}
              id={data.id}
              />
            ))) : <h1>No pending requests</h1>
          }
        </div>
        <div className="requests-accepted">
          {acceptedStudents.length > 0 ? acceptedStudents.map((data) => (
            <AcceptStudentCard
            name={data.full_name}
            image={data.profile_picture}
            id={data.user_id}
            key={data.id}
            />
          )): <h1>No accepted students</h1>}
        </div>
    </div>
  </div>

  )
}

export default StudentsRequest