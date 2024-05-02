import React, {useEffect, useState} from 'react'
import OSProjectCard from '../components/OSProjectCard';
import '../css/osproject.css';
import axios from '../utils/axios';

function OSProject() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/projects/')
    .then(res => {
      setProjects(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className='container osp min-h-screen'>
        <h1 className='osp-heading'>Open Source Projects</h1>
        <p className='osp-text'>Open source projects are a great way to learn and contribute to the community. Here are some beginner of the projects that you can contribute to.</p>
        <div className='osp-cards'>
          {projects.map(project => (
            <OSProjectCard
            key={project.project_id} name={project.name} description={project.description} image={project.thumnail} link={project.link}
            />
          ))}
        </div>

    </div>
  )
}

export default OSProject