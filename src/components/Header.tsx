"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{ position: 'fixed', width: '100%' }} className="top-0 z-50">
      <nav style={{ boxShadow: '0 0 5px #555555' }} className="bg-[#1d293b] text-white p-4 md:pl-16 md:pr-16 w-full md:max-w-[800px] md:mx-auto md:rounded-tl-none md:rounded-tr-none md:rounded-bl-[75px] md:rounded-br-[75px] flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/yum-icon.png"
            alt="Yum Logo"
            width={42}
            height={54}
            className="h-10 w-[42px]"
          />
        </Link>

        {/* Hamburger Icon and Menu */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg
                className="h-8 w-8 text-[#d1823b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8 text-[#d1823b]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-10">
          <Link href="/" className="hover:underline text-base">
            Home
          </Link>
          <Link href="/about" className="hover:underline text-base">
            About
          </Link>
        </div>
      </nav>

      {isMenuOpen && (
        <div className={`sm:hidden bg-[rgba(0,0,0,.75)] text-white p-4 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-2 text-right">
            <Link href="/" onClick={toggleMenu} className="text-2xl active:text-[#d1823b] focus:text-[#d1823b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              Home
            </Link>
            <Link href="/about" onClick={toggleMenu} className="text-2xl active:text-[#d1823b] focus:text-[#d1823b] focus:underline focus:underline-offset-4 transition-colors duration-300 py-1">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}