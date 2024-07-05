import React, {useState, useEffect} from 'react'
import '../css/Blog.css';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';



function Blog() {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState({});
    useEffect(() => {
        axios.get(`/blogs/${blogId}/`)
        .then((res) => {
            setBlogData(res.data.data);
        })
        .catch(() => {
            toast.error('Something went wrong! Please try again.');
        })
    }, [])
  return (
    <div className='min-h-screen'>
    <div className='blog-post'>
        <div className="container">
            <span className='blog-post--tagline'>
                <h1>{blogData?.title}</h1>
                <span className='blog-post--author'>
                    <img src={`${blogData?.author_image}`} alt='person'></img>
                    <span>
                        <p>By: {blogData?.author}</p>
                        <p>8 mins read</p>
                    </span>
                </span>
            </span>
            <img src={`${blogData?.thumbnail}`} alt='thumbnail'
            className='blog-post--thumnail'/>
        </div>
    </div>
    <div className='blog-post-content' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(blogData?.content)}}>
    </div>
    </div>
  )
}

export default Blog