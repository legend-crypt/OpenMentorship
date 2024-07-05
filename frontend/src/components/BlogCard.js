import React from 'react';
import '../css/BlogCard.css';


function BlogCard({ title, content, author, thumbnail, authorImage }) {
  const removeTags = (str) => {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  };
  return (
    <article className="flex bg-white transition hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          datetime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>2022</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>Oct 10</span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt="thumnail"
          src={`${thumbnail}`}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
            <h3 className="font-bold uppercase text-gray-900">
              {title}
            </h3>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {removeTags(content).slice(0, 250)}...
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <button type='button'
            className="block bg-blue-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-blue-400"
          >
            Read Blog
          </button>
        </div>
      </div>
    </article>
    
  );
}

export default BlogCard;
