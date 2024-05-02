import React, {useState, useEffect} from 'react';
import '../css/Blogs.css';
import BlogCard from '../components/BlogCard';
import axios from '../utils/axios'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Blogs() {
  const [blogData, setBlogData] = useState([]);
  const userRole = useSelector(state => state.userRole.role);

  useEffect(() => {
    axios.get('/blogs/')
    .then((res) => {
      setBlogData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
        <div className='blogs'>
            {/* https://stackoverflow.blog/2020/08/03/getting-started-with-contributing-to-open-source/ */}
            <h1 className='blogs-heading'>openMentors.blogs()</h1>
            <p>For Developers, by the community</p>
        </div>
        {userRole === 'Mentor' &&
          <Link to='/create-blog' className='flex items-center'>
              <button className='p-2 bg-blue-400 rounded mt-4 ml-auto mr-auto text-white'>Create Blog</button>
          </Link>
        }
        <div className='blogs-container container min-h-screen'>
          {blogData.map((data) => (
            <Link to={`/blog/${data.id}`}>
              <BlogCard
              key={data.id}
              title={data.title}
              author={data.author}
              content={data.content}
              thumbnail={data.thumbnail}
              authorImage={data.author_image}
              />
             </Link>
          ))}
        </div>
    </>
  )
}
