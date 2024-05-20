import '../css//Mentors.css';
import React, { useEffect, useState } from "react";
import MentorCard from "../components/MentorCard";
import axios from '../utils/axios'
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';


function Mentors() {
  const [mentors , setMentors] = React.useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('mentors/',
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`
      }
    }).then((res) => {
      setLoading(false);
      setMentors(res.data.data);
    })
    .catch((err) => {
      setLoading(false);
      toast.error('Failed to retrieve mentors');
    });
    setLoading(true);
  }, []);



  return (
    <div className="container page-margin min-h-screen">
      {
        loading ? (
          <TailSpin
          color="#00BFFF"
          height={200}
          width={200}
          wrapperClass='flex items-center justify-center'
          />
        ) : (
        <div className="container--grid">
          {mentors.map((data) => (
            <MentorCard key={data.user_id} name={data?.full_name} image={data?.profile_picture} mentorEmail={data.email} userId={data.user_id}/>
          ))}
        </div>
      )}    
</div>
  );
}

export default Mentors;
