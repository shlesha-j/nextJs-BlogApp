import React from 'react'
import Link from "next/link";
function BlogCard({ blog }) {
    return (
        <Link href={`/BlogDetails/${blog.id}`} className="blog-card">
            {/* <div id="overlay"></div> */}
            <div className="blog-img-wrap">
                <img src={blog.photo_url} alt={blog.title} width="400" height="400" />
            </div>
            <div className="blog-content-wrap">
                <p className="blog-title"><b>{blog.title}</b></p>
                <p className="blog-desc">{blog.description}</p>
                {/* <p>{blog.category}</p> */}
            </div>
            <p className="readMoreBtn" href={"/BlogDetails"}>Read More</p>
            
            
            {/* <button  >Read More</button> */}
            {/* <Image src={blog.image} alt="Description of my image" width={500}  height={300} /> */}
        </Link>
    )
}

export default BlogCard