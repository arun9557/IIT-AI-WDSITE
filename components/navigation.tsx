"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled ? 'py-2 sm:py-3 shadow-md backdrop-blur-md bg-black/30' : 'py-4 sm:py-6 bg-transparent'
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <div className="font-bold text-lg sm:text-xl name-gradient">A₹UN</div>
        <div className="hidden md:flex gap-6 items-center absolute left-1/2 transform -translate-x-1/2">
          <a href="#" className="nav-link">Home</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#" className="nav-link">Resume</a>
          <a href="mailto:arunshekhram@gmail.com" className="nav-link">📋</a>
        </div>
        <button
          className="md:hidden text-white focus:outline-none text-xl sm:text-2xl p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span aria-hidden="true">{menuOpen ? '✖' : '☰'}</span>
        </button>
      </div>
      {menuOpen && (
        <motion.div 
          className="md:hidden flex flex-col items-center gap-4 mt-4 pb-4 px-4 bg-black/20 backdrop-blur-md border-t border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <a href="#" className="nav-link py-2 w-full text-center">Home</a>
          <a href="#projects" className="nav-link py-2 w-full text-center">Projects</a>
          <a href="#" className="nav-link py-2 w-full text-center">Resume</a>
          <a href="mailto:arunshekhram@gmail.com" className="nav-link py-2 w-full text-center">📋 Contact</a>
        </motion.div>
      )}
    </motion.nav>
  );
} 