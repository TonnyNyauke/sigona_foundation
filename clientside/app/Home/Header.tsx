'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import { 
  Home,
  Info,
  Calendar,
  Users,
  HandHelping,
  BookOpen,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/aboutus", label: "About Us", icon: Info },
    { href: "/programs", label: "Programs", icon: Users },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/get-involved", label: "Get Involved", icon: HandHelping },
    { href: "/blogs", label: "Blogs", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: MessageCircle },
  ];

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
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Navigation Links */}
        <nav
          className={`fixed top-0 left-0 h-full w-72 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:w-auto md:items-center md:bg-transparent
          ${isOpen ? 'bg-green-700' : ''} z-50`}
        >
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute top-4 right-4 text-white p-2"
            aria-label="Close navigation"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Mobile Logo */}
          <div className="md:hidden p-6 border-b border-green-600">
            <span className="text-xl font-bold text-white">
              Sigona Thomas Foundation
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6 p-6 md:p-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 py-3 px-4 md:px-0 md:py-0 
                    ${isOpen ? 'text-white hover:bg-green-600' : 'text-gray-800 hover:text-green-700'}
                    md:hover:bg-transparent rounded-lg transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 md:hidden" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;