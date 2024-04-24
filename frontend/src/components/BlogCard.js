import React from 'react'
import '../css/BlogCard.css';

function BlogCard() {
  return (
    <div className='blog-card'>
        <div>
            <img className='blog-card-img' src='https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlsbHVzdHJhdGlvbiUyMHRlY2h8ZW58MHx8MHx8fDA%3D' alt='thumnail'/>
        </div>
        <div className='blog-card-details'>
            <h3 className='blog-card-title'>Linux</h3>
            <p className='blog-card-text'>Linux is a family of open-source Unix-like operating systems based on the Linux kernel, an... </p>
        </div>
        <div className='blog-card-footer'>
            <img src='https://images.unsplash.com/photo-1611264327630-8090373c8cef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aWxsdXN0cmF0aW9uJTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D' alt='person'></img>
            <span>
              <p>By: John Doe</p>
              <p>10th April 2024</p>
            </span>
        </div>
    </div>
  )
}

export default BlogCard