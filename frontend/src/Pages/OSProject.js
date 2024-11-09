import React, { useEffect, useState } from 'react';
import OSProjectCard from '../components/OSProjectCard';
import '../css/osproject.css';
import axios from '../utils/axios';
import { TailSpin } from 'react-loader-spinner';

function OSProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('projects/')
      .then((res) => {
        setLoading(false);
        setProjects(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }, []);

  return (
    <div className="container osp min-h-screen">
      {loading ? (
        <TailSpin
          color="#00BFFF"
          height={200}
          width={200}
          wrapperClass="flex items-center justify-center"
        />
      ) : (
        <>
          <h1 className="osp-heading">Open Source Projects</h1>
          <p className="osp-text">
            Open source projects are a great way to learn and contribute to the
            community. Here are some beginner projects that you can contribute
            to.
          </p>
          <div className="osp-cards">
            {projects?.map((project) => (
              <OSProjectCard
                key={project.project_id}
                name={project.name}
                description={project.description}
                image={project.thumnail}
                link={project.link}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OSProject;
