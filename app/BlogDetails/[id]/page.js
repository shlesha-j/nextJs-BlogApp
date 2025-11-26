"use client";

import { use, useEffect, useState } from "react";
import { fetchBlogs, deleteBlog, updateBlog } from "@/app/utils/BlogApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <section className="blogDetail-sec">
      <div className="container">
        <div className="head">
          <Link href={'/Blogs'}>⬅ GO BACK</Link>
          <h5>Magazine</h5>
        </div>
        <div className="blogdetail">
          <div className="blog-head">
            <h2>{blog.title}</h2>
            <p className="blog-desc">{blog.description}</p>
          </div>
          <img src={blog.detail_photo} width={600} height={400}  className="blog-detailImg"/>
          <div className="blog-body">
            <div className="autho-details">
                <div className="author-profile">
                  <img src={'../images/author.png'}/>
                  <h4>Jakob Gronberg</h4>
                </div>
                <div className="blog-extraInfo">
                  <div>
                    <h5>Date</h5>
                    <p>16. March 2022</p>
                  </div>
                  <div>
                    <h5>Read</h5>
                    <p>2 Min</p>
                  </div>
                  <div>
                    <h5>Share</h5>
                    <div className="share-platforms">
                      <Link href={'#'}>
                        <img src={'../images/ri_instagram-line.png'}/>
                      </Link>
                      <Link href={'#'}>
                        <img src={'../images/ri_twitter-fill.png'}/>
                      </Link>
                      <Link href={'#'}>
                        <img src={'../images/ri_youtube-fill.png'}/>
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
            <div className="blog-content">
              <p className="blog-desc">{blog.description}</p>
              <p className="blog-content-txt">{blog.content}</p>
            </div>
            
          </div>
          
          
          {/* <div className="actionBtn-grp">
        <button className='editBtn'>📝</button>
        <button className='deleteBtn' onClick={deleteBlogFn}>🗑️</button>
      </div> */}
        </div>

      </div>
    </section>

  );
}
