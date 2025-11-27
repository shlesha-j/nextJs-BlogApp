'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from "next/image";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // default light
  const [menuOpen, setMenuOpen] = useState(false); // hamburger menu state
  const [activeNav, setActiveNav] = useState(""); // active link

  const navItems = [
    { name: "Blogs", href: "/Blogs" },
    { name: "BlogCreation", href: "/BlogCreation" },
    { name: "About", href: "/AboutUs" },
  ];

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

  // Hamburger menu toggle
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = !menuOpen ? "hidden" : "auto";
  };

  // Handle nav item click
  const handleNavClick = (name) => {
    setActiveNav(name);
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <nav className={`navbar ${isScrolled ? 'nav-shadow scrolled' : ''}`}>
      <div className="container">
        <div className="main-nav">
          <div className="logo-wrap">
            <Link href="/" className='logo'>
              FYREE MAGAZINE
              {/* <Image src="/images/FyrreMagazine.png" alt="Fyrre Magazine Logo" width={200} height={18} /> */}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className={`nav-links xinder-links ${menuOpen ? "active" : ""}`}>
            <ul>
              {navItems.map(item => (
                <li key={item.name} className={`nav-item ${activeNav === item.name ? "active" : ""}`}>
                  <Link href={item.href} className="nav-link" onClick={() => handleNavClick(item.name)}>
                    {item.name}
                  </Link>
                </li>
              ))}

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

          {/* Hamburger menu */}
          <div className={`ham-menu ${menuOpen ? "active" : ""}`} onClick={handleMenuToggle}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
