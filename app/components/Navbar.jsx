'use client';
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { useState, useEffect } from 'react';
function Navbar() {
      const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (
        <div>
            <nav className={`navbar ${isScrolled ? 'nav-shadow' : ''}`}>
                <div className="container">
                    <div className='main-nav'>
                        <div className="logo-wrap">
                            <Link href="/">
                                <Image src="/images/FyrreMagazine.png" alt="Fyrre Magazine Logo" width={200} height={18}/>
                            </Link>
                        </div>
                        <div className="nav-links">
                            <ul>
                                <li>
                                    <Link href={"/Blogs"} className='nav-link'>Blogs</Link>
                                </li>
                                <li>
                                    <Link href={"/BlogCreation"} className='nav-link'>BlogCreation</Link>
                                </li>
                                <li>
                                    <Link href={"/AboutUs"} className='nav-link'>About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar