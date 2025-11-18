"use client";
import { useEffect, useState } from "react";
import { fetchBlogs } from "./utils/BlogApi"; 
import Image from 'next/image'
export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    })();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.map((blog, index) => (
        <div key={index}>
          <p><b>{blog.title}</b></p>
          <p>{blog.description}</p>
          {/* <Image src={blog.image} alt="Description of my image" width={500}  height={300} /> */}
        </div>
      ))}
    </div>
  );
}
