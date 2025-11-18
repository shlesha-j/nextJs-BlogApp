import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div>
        <nav>
            <div className='main-nav'>
                <div className="logo-wrap">
                    <p>Blogs</p>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                            <Link href={"/"} className='nav-link'>Home</Link>
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
        </nav>
    </div>
  )
}

export default Navbar