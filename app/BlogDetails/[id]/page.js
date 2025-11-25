"use client";

import { use, useEffect, useState } from "react";
import { fetchBlogs, deleteBlog, updateBlog } from "@/app/utils/BlogApi";
import { useRouter } from "next/navigation";

export default function BlogDetailPage({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
   const router = useRouter();

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

  // async function deleteBlogFn() {
  //   const sure = confirm("Are you sure you want to delete this blog?");
  //   if (!sure) return;
  //   try {
  //     await deleteBlog(id);
  //     alert("Blog deleted successfully!");
  //     router.push("/");   
  //   } catch (error) {
  //     alert("Failed to delete blog");
  //   }
  // }

  return (
    <div className="container blogdetail">
      <h2>{blog.title}</h2>
      <img src={blog.photo_url} width={600} height={400} />
      <p>{blog.description}</p>
      <p>{blog.content}</p>
      {/* <div className="actionBtn-grp">
        <button className='editBtn'>📝</button>
        <button className='deleteBtn' onClick={deleteBlogFn}>🗑️</button>
      </div> */}
    </div>
  );
}
