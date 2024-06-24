import React from 'react';
import '../css/BlogCard.css';
import DOMPurify from 'dompurify';


function BlogCard({ title, content, author, thumbnail, authorImage }) {
  return (
    <div className='blog-card hover:translate-x-1'>
      <div>
        <img className='blog-card-img' src={`${thumbnail}`} alt='thumnail' />
      </div>
      <div className='blog-card-details'>
        <h3 className='blog-card-title'>{title}</h3>
        <p className='blog-card-text' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content?.slice(0, 150)) }}></p>
      </div>
      <div className='blog-card-footer'>
        <img src={`${authorImage}`} alt='person' />
        <span>
          <p>By: {author}</p>
          {/* <p>10th April 2024</p> */}
        </span>
      </div>
    </div>
  );
}

export default BlogCard;
