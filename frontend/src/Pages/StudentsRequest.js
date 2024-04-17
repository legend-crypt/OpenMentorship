import React from 'react';
import StudentCard from '../components/StudentCard';
import { useState, useEffect } from 'react';
import axios  from '../utils/axios';

function StudentsRequest() {
  const [students, setStudents] = useState([])
  useEffect(() => {
    axios.get('mentors/mentor-requests/?status=pending',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
      }
    }).then((res) => {
      console.log(res.data.data)
      setStudents(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <div className="container min-h-screen">
        {/* min-h-screen */}
    <div class="container--grid">
        <StudentCard/>
        <StudentCard/>
        {
          students.map((data) => (
            <StudentCard key={data.user_id} name={data.full_name} image={data.profile_picture} studentEmail={data.email} id={data.id}/>
          ))
        }
        {/* <StudentCard/>
        <StudentCard/>
        <StudentCard/> */}
    </div>
  </div>

  )
}

export default StudentsRequest