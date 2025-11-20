"use client";
import { useEffect, useState } from "react";
import { fetchBlogs } from "./utils/BlogApi";
import Image from 'next/image'
import Link from "next/link";
import BlogCard from "./components/BlogCard";
export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    })();
  }, []);

  return (
    <div className="container">
      <h2>All Blogs</h2>
      <div className="blogs-wrap">
        {blogs.map((blog, index) => (
          // <Link href={"/BlogDetails"} key={index} className="blog-card">
          //     <div className="blog-img-wrap">
          //       <img src={blog.photo_url} alt={blog.title} width="400" height="400" />
          //     </div>
          //     <div className="blog-content-wrap">
          //       <p className="blog-title"><b>{blog.title}</b></p>
          //       <p className="blog-desc">{blog.description}</p>
          //       {/* <p>{blog.category}</p> */}
          //     </div>
          //     <p className="readMoreBtn" href={"/BlogDetails"}>Read More</p>
          //     {/* <button  >Read More</button> */}
          //     {/* <Image src={blog.image} alt="Description of my image" width={500}  height={300} /> */}
          // </Link>
            <BlogCard key={index} blog={blog}/>
        ))}
      </div>

    </div>
  );
}
