"use client";
import React, { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard';
import { fetchBlogs } from "../utils/BlogApi";

function Page() {
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    async function loadBlogs() {
        const data = await fetchBlogs();
        setBlogs(data);
    }

    useEffect(() => {
        loadBlogs();
    }, []);

    const filteredBlogs = selectedCategory === "All"
        ? [...blogs].reverse()
        : [...blogs].filter(blog => blog.category === selectedCategory).reverse();

    const categories = ["All", "Art", "Street Art", "Sculpture"];

    return (
        <section className='allBlogs'>
            <div className='container'>
                <h1 className='txt-center'>Magazine</h1>
                <div className='head'>
                    <h5>Categories</h5>
                    <div className='tags-grp'>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`tag ${selectedCategory === cat ? "active" : ""}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='blogs-wrap'>
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((blog, i) => (
                            <BlogCard key={i} blog={blog} refreshBlogs={loadBlogs} />
                        ))
                    ) : (
                        <p>No blogs available in this category.</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;
