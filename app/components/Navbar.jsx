'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from "next/image";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // default light

  // Load theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  // Scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply the selected theme
  const applyTheme = (theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  };

  // Toggle Light ↔ Dark
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div>
      <nav className={`navbar ${isScrolled ? 'nav-shadow scrolled' : ''}`}>
        <div className="container">
          <div className="main-nav">
            <div className="logo-wrap">
              <Link href="/" className='logo scrolled'>
                FYREE MAGAZINE
                {/* <Image src="/images/FyrreMagazine.png" alt="Fyrre Magazine Logo" width={200} height={18} /> */}
              </Link>
            </div>

            <div className="nav-links">
              <ul>
                <li><Link href={"/Blogs"} className='nav-link'>Blogs</Link></li>
                <li><Link href={"/BlogCreation"} className='nav-link'>BlogCreation</Link></li>
                <li><Link href={"/AboutUs"} className='nav-link'>About</Link></li>

                {/* 🌙 Light/Dark Toggle */}
                <li>
                  <button 
                    onClick={toggleTheme}
                    className="theme-toggle-btn"
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      background: "transparent",
                      border: "1px solid var(--foreground)",
                      cursor: "pointer"
                    }}
                  >
                    {theme === "light" ? "🌙" : "🌞"}
                  </button>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
