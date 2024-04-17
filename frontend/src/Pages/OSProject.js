import React from 'react'
import OSProjectCard from '../components/OSProjectCard';
import '../css/osproject.css';

function OSProject() {
  return (
    <div className='container osp'>
        <h1 className='osp-heading'>Open Source Projects</h1>
        <p className='osp-text'>Open source projects are a great way to learn and contribute to the community. Here are some beginner of the projects that you can contribute to.</p>
        <div className='osp-cards'>
            <OSProjectCard/>
            <OSProjectCard/>
            <OSProjectCard/>
            <OSProjectCard/>
            <OSProjectCard/>
            <OSProjectCard/>
        </div>

    </div>
  )
}

export default OSProject