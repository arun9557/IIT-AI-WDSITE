"use client";
import React from "react";

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-cyan-400 rounded-lg opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-pink-400 rounded-full opacity-15 animate-bounce"></div>
      <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-orange-400 transform rotate-45 opacity-25 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-purple-400 rounded-full opacity-10 animate-ping"></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-cyan-300 opacity-20 animate-bounce"></div>
      <div className="absolute top-1/2 left-20 w-3 h-3 bg-pink-300 opacity-30 animate-pulse"></div>
    </div>
  );
} 