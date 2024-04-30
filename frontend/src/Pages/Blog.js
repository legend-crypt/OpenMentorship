import React, {useState, useEffect} from 'react'
import '../css/Blog.css';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';


function Blog() {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState({});
    useEffect(() => {
        axios.get(`/blogs/${blogId}/`)
        .then((res) => {
            setBlogData(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])
  return (
    <>
    <div className='blog-post'>
        <div className="container">
            <span className='blog-post--tagline'>
                <h1>{blogData?.title}</h1>
                <span className='blog-post--author'>
                    <img src={`http://127.0.0.1:8000${blogData?.author_image}`} alt='person'></img>
                    <span>
                        <p>By: {blogData?.author}</p>
                        <p>8 mins read</p>
                    </span>
                </span>
            </span>
            <img src={`http://127.0.0.1:8000${blogData?.thumbnail}`} alt='thumnail'
            className='blog-post--thumnail'/>
        </div>
    </div>
    <div className='blog-post-content container' dangerouslySetInnerHTML={{__html: blogData?.content}}>
    </div>
    </>
  )
}

export default Blog