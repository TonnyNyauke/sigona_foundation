'use client'

import Link from 'next/link';
import React, { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-bold text-green-700 cursor-pointer">
            Sigona Thomas Foundation
          </div>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`fixed top-0 left-0 h-full w-64 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:w-auto md:items-center`}
        >
          <div className="flex flex-col md:flex-row md:space-x-6 p-6 md:p-0">
            <Link href="/" className="text-gray-800 hover:text-green-700 py-2 md:py-0">
              Home
            </Link>
            <Link href="/aboutus" className="text-gray-800 hover:text-green-700 py-2 md:py-0">
              About Us
            </Link>
            <Link href="/programs" className="text-gray-800 hover:text-green-700 py-2 md:py-0">
              Programs
            </Link>
            <Link href="/get-involved" className="text-gray-800 hover:text-green-700 py-2 md:py-0">
              Get Involved
            </Link>
            <Link href="/blog" className="text-gray-800 hover:text-green-700 py-2 md:py-0">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-green-700 py-2 md:py-0">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
