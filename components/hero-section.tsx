"use client";
import React from "react";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center z-10 hero-name">
      <div className="relative inline-block mb-8">
        <span className="name-glow"></span>
        <span className="animated-name">A₹UN $HEKHAR</span>
      </div>
      <p className="max-w-xl mx-auto text-lg mb-6">
        Currently pursuing B.Sc Applied AI & Data Science from IIT Jodhpur (Online Program). Fresh 12th grade graduate passionate about AI, coding, and sharing knowledge through handwritten notes, GitHub projects, and innovative web experiences like this AI-powered website.
      </p>
      <div className="flex flex-row gap-6 justify-center mb-8">
        <a
          href="#projects"
          className="px-8 py-3 rounded-lg btn-hover font-semibold shadow-lg"
        >
          View My Work
        </a>
        <a
          href="/resume.pdf"
          download
          className="px-8 py-3 rounded-lg border border-[var(--portfolio-accent)] text-[var(--portfolio-accent)] font-semibold shadow-lg hover:bg-[var(--portfolio-accent)] hover:text-white transition"
        >
          Download Resume
        </a>
      </div>
      <h2 className="text-2xl sm:text-3xl font-medium mb-6 mt-2">
        AI & Data Science Student | Coding Enthusiast
      </h2>
    </section>
  );
} 