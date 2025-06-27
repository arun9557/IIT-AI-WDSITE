"use client";
import React from "react";

export function CompleteBackgroundAnimation() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      {/* SVG Waves Background */}
      <svg className="absolute bottom-0 left-0 w-full" height="220" viewBox="0 0 1440 320">
        <path
          fill="#00bcd4"
          fillOpacity="0.18"
          d="M0,160L80,170.7C160,181,320,203,480,197.3C640,192,800,160,960,154.7C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>
      
      {/* Additional decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-purple-400 rounded-full opacity-25 animate-pulse"></div>
    </div>
  );
} 