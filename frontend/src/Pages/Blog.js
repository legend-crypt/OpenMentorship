import React from 'react'
import '../css/Blog.css';
import StudentCard from '../components/StudentCard';

function Blog() {
  return (
    <>
    <div className='blog-post'>
        <div className="container">
            <span className='blog-post--tagline'>
                <h1>Importance of OpenSource</h1>
                <p>Open source projects are a great way to learn and contribute to the community. Here are some beginner of the projects that you can contribute to.</p>
                <span className='blog-post--author'>
                    <img src='https://images.unsplash.com/photo-1611264327630-8090373c8cef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aWxsdXN0cmF0aW9uJTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D' alt='person'></img>
                    <span>
                        <p>By: John Doe</p>
                        <p>10th April 2024 - 8 mins read</p>
                    </span>
                </span>
            </span>
            <img src='https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlsbHVzdHJhdGlvbiUyMHRlY2h8ZW58MHx8MHx8fDA%3D'
            className='blog-post--thumnail'/>
        </div>
    </div>
    <div className='blog-post-content container'>
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget
        magna fermentum iaculis. Nam sit amet urna nec odio ultricies tincidunt.
        Curabitur vitae mi nec sapien tristique fermentum. Duis id justo auctor,
        convallis elit nec, vulputate quam. Sed auctor, nunc nec tincidunt
        consectetur, nunc justo luctus risus, nec luctus libero turpis nec
        mauris. Nullam in turpis ac lacus egestas varius. Sed nec elit at lacus
        lacinia gravida. Sed vel odio ac mi posuere ultricies. Nullam ac
        consectetur nunc. Donec auctor, sapien nec laoreet varius, nunc mi
        ultricies eros, nec ultricies purus tortor nec enim. Nulla facilisi.
        Nullam auctor, nunc nec tincidunt consectetur, nunc justo luctus risus,
        nec luctus libero turpis nec mauris. Nullam in turpis ac lacus egestas
        varius. Sed nec elit at lacus lacinia gravida. Sed vel odio ac mi posuere
        ultricies. Nullam ac consectetur nunc. Donec auctor, sapien nec laoreet
        varius, nunc mi ultricies eros, nec ultricies purus tortor nec enim. Nulla
        
    </div>
    </>
  )
}

export default Blog