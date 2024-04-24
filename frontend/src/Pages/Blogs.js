import React from 'react'
import '../css/Blogs.css';
import BlogCard from '../components/BlogCard';

export default function Blogs() {
  return (
    <>
        <div className='blogs'>
            {/* https://stackoverflow.blog/2020/08/03/getting-started-with-contributing-to-open-source/ */}
            <h1 className='blogs-heading'>openMentors.blogs()</h1>
            <p>For Developers, by the community</p>
        </div>
        <div className='blogs-container container'>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>
            <BlogCard/>

        </div>
    </>
  )
}
