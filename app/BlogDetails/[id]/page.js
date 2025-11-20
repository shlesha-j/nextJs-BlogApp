"use client";

import { use, useEffect, useState } from "react";
import { fetchBlogs } from "@/app/utils/BlogApi";

export default function BlogDetailPage({ params }) {
  const { id } = use(params); // Unwrap params Promise (Next.js 15)

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    (async () => {
      const blogs = await fetchBlogs();
      const selectedBlog = blogs.find(
        (item) => String(item.id) === String(id)
      );
      setBlog(selectedBlog);  
    })();
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <img src={blog.photo_url} width={600} height={400} />
      <p>{blog.description}</p>
      <p>{blog.content_text}</p>
    </div>
  );
}
