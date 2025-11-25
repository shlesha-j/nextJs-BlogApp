import React from 'react'
import Link from "next/link";
import { deleteBlog } from "@/app/utils/BlogApi";
import { useRouter } from "next/navigation";
function BlogCard({ blog }) {
    const router = useRouter();
    async function deleteBlogFn() {
        const sure = confirm("Are you sure you want to delete this blog?");
        if (!sure) return;
        try {
            await deleteBlog(blog.id);
            alert("Blog deleted successfully!");
            router.refresh();
        } catch (error) {
            alert("Failed to delete blog");
        }   
    }

    return (
        <div className="blog-card">
            {/* <div id="overlay"></div> */}
            <div className="blog-img-wrap">
                <img src={blog.photo_url} alt={blog.title} width="400" height="400" />
            </div>
            <div className="blog-content-wrap">
                <p className="blog-title">{blog.title}</p>
                <p className="blog-desc">{blog.description}</p>
                {/* <p>{blog.category}</p> */}
            </div>
            <Link href={`/BlogDetails/${blog.id}`} className='readMoreLink'>Read More ╰┈➤</Link>
            {/* <p className="readMoreBtn" href={"/BlogDetails"}>Read More</p> */}
            <div className="actionBtn-grp">
                {/* <button className='editBtn'>
  <                 Link href={`/EditBlog/${blog.id}`}>📝</Link>
                </button> */}
                <Link href={`/EditBlog/${blog.id}`} className="editBtn">📝</Link>
                <button className='deleteBtn' onClick={deleteBlogFn}>🗑️</button>
            </div>
        </div>
    )
}

export default BlogCard