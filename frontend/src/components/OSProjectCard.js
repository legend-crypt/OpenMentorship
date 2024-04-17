import React from 'react'
import '../css/OSProjectCard.css';

function OSProjectCard() {
  return (
    <div className='osp-card'>
        <div className='osp-card-img'>
            <img src='https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D' alt='osp'/>
        </div>
        <div className='osp-card-details'>
            <h3>Linux</h3>
            <p>Linux is a family of open-source Unix-like operating systems based on the Linux kernel, an... </p>
            <button className='osp-card-btn'><a href="">Learn More</a></button>
        </div>
    </div>
  )
}

export default OSProjectCard