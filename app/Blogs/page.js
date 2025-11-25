"use client";
import React, { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard';
import { fetchBlogs } from "../utils/BlogApi";
function page() {
    const [blogs, setBlogs] = useState([]);
    const sortedBlogs = [...blogs].reverse();
    useEffect(() => {
        (async () => {
            const data = await fetchBlogs();
            setBlogs(data);
        })();
    }, []);

    return (
        <section>
            <div className='container'>
                <h1 className='txt-center'>Magazine</h1>
                <div className='blogs-wrap'>
                    {sortedBlogs.map((blog, i) => (
                        <BlogCard key={i} blog={blog} />
                    ))}
                </div>
            </div>
        </section>

    )
}

export default page