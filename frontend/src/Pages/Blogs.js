import React, { useState, useEffect } from "react";
import "../css/Blogs.css";
import BlogCard from "../components/BlogCard";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

export default function Blogs() {
  const [blogData, setBlogData] = useState([]);
  const userRole = useSelector((state) => state.userRole.role);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/blogs/")
      .then((res) => {
        setLoading(false);
        setBlogData(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
      });
    setLoading(true);
  }, []);

  return (
    <>
      <div className="blogs">
        {/* https://stackoverflow.blog/2020/08/03/getting-started-with-contributing-to-open-source/ */}
        <h1 className="blogs-heading">openMentors.blogs()</h1>
        <p className="text-white">For Developers, by the community</p>
      </div>
      {userRole === "Mentor" && (
        <Link to="/create-blog" className="flex items-center">
          <button className="p-2 bg-blue-400 rounded mt-4 ml-auto mr-auto text-white">
            Create Blog
          </button>
        </Link>
      )}
      <div className="blogs-container min-h-screen">
        {loading ? (
          <TailSpin
            color="#00BFFF"
            height={200}
            width={200}
            wrapperClass="flex items-center justify-center"
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {blogData?.map((data) => (
                <Link to={`/blog/${data.id}`} key={data.id} className="my-4">
                  <BlogCard
                    title={data.title}
                    author={data.author}
                    content={data.content}
                    authorImage={data.author_image}
                    thumbnail={data.thumbnail}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
