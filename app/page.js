"use client";
import { useEffect, useState } from "react";
import { fetchBlogs } from "./utils/BlogApi";
import Image from 'next/image'
import Link from "next/link";
import BlogCard from "./components/BlogCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
// const ITEMS_PER_PAGE = 6;
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const images = [
    '/images/swipper1.png',
    '/images/swipper2.png',
    '/images/swipper3.jpg',
  ];
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const sortedBlogs = [...blogs].reverse();
  const visibleBlogs = sortedBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < sortedBlogs.length;
  useEffect(() => {
    (async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    })();
  }, []);

  return (
    <section>
      <div className="container">
        <h1 className="txt-center">Art & Life</h1>
        <div className="marquee-wrap">
          <h5 className="marquee-title">NEWS TICKERS+++</h5>
          <div className="marquee">
            <div className="marquee-content">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit +++</p>
            </div>
          </div>
        </div>
        <div className="swipper-wrap">
          <div className="swiper-content">
            <h2 className="text-cap">WHERE CREATIVITY LIVES</h2>
            <p>FYRRE Magazine is your gateway to the world of contemporary culture. We curate stories that matter—from emerging artists and design innovations to cultural conversations and lifestyle trends. Our mission is simple: to inform, inspire, and celebrate the creative spirit in all its forms.</p>
          </div>
          <div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={500}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        {/* <div className="blogs-wrap home-page">
          {blogs.map((blog, index) => (
            // <BlogCard key={index} blog={blog} />
            <div key={index} className="homePage-BlogCard">
              <img src={blog.photo_url} alt={blog.title} width="240" height="240" />
              <div className="blog-content">
                <h5>{blog.title}</h5>
                <p>{blog.description}</p>
                <span className="readmore-wrap">
                  <Link href={`/BlogDetails/${blog.id}`}>↗</Link>
                </span>


              </div>
            </div>
          ))}
        </div> */}

        <div className="blogs-wrap home-page">
          {visibleBlogs.map((blog, index) => (
            <div key={index} className="homePage-BlogCard">
              <img src={blog.photo_url} alt={blog.title} width="240" height="240" />
              <div className="blog-content">
                <h5>{blog.title}</h5>
                <p>{blog.description}</p>
                <span className="readmore-wrap">
                  <Link href={`/BlogDetails/${blog.id}`}>↗</Link>
                </span>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="load-more-wrap">
            <button onClick={loadMore} className="load-more-btn">
              Load More
            </button>
          </div>
        )}

      </div>
    </section>

  );
}


