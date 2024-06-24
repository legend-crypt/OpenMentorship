import React from 'react'
import '../css/OSProjectCard.css';


function OSProjectCard({name, description, image, link}) {
  return (
    <div className='osp-card'>
        <div className='osp-card-img'>
            <img src={`${image}`} alt='osp'/>
        </div>
        <div className='osp-card-details'>
            <h3>{name} </h3>
            <p>{description.slice(0, 110)}...</p>
            <button className='osp-card-btn'><a href={link} target='_blank'>Learn More</a></button>
        </div>
    </div>
  )
}

export default OSProjectCard