import React from 'react'
import Link from "next/link";
import { deleteBlog } from "@/app/utils/BlogApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BlogCard({ blog, refreshBlogs  }) {
    const router = useRouter();
    // async function deleteBlogFn() {
    //     const sure = confirm("Are you sure you want to delete this blog?");
    //     if (!sure) return;
    //     try {
    //         await deleteBlog(blog.id);
    //         toast.success("Blog deleted successfully!")
    //         // router.push("/Blogs");
    //         router.refresh(); 
    //     } catch (error) {
    //         toast.warning("Failed to delete blog");
    //     }   
    // }

    async function deleteBlogFn() {
        const sure = confirm("Are you sure you want to delete this blog?");
        if (!sure) return;

        try {
            await deleteBlog(blog.id);
            toast.success("Blog deleted successfully!");

            await refreshBlogs(); 
        } catch (error) {
            toast.warning("Failed to delete blog");
        }
    }

    return (
        <div className="blog-card">
            {/* <div id="overlay"></div> */}
            <div className='rel-info'>
                <p>16. March 2022</p>
                <span className='tag'>{blog.category}</span>
            </div>
            
            <div className="blog-img-wrap">
                <img src={blog.photo_url || "/placeholder.jpg"} alt={blog.title} width="400" height="400" />
                <div className="img-overlay"></div>
                <div className="actionBtn-grp">
                <Link href={`/EditBlog/${blog.id}`} className="editBtn">📝</Link>
                <button className='deleteBtn' onClick={deleteBlogFn}>🗑️</button>
            </div>
            </div>
            <div className="blog-content-wrap">
                <p className="blog-title">{blog.title}</p>
                <p className="blog-desc">{blog.description}</p>
                {/* <p>{blog.category}</p> */}
            </div>
            <Link href={`/BlogDetails/${blog.id}`} className='readMoreLink'>Read More ╰┈➤</Link>
            {/* <p className="readMoreBtn" href={"/BlogDetails"}>Read More</p> */}
            
        </div>
    )
}

export default BlogCard