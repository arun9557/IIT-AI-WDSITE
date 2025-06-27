"use client";
import React, { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (cursorRef.current) {
        if (target.tagName === 'H1' || target.tagName === 'H2') {
          cursorRef.current.classList.add('cursor-name');
          cursorRef.current.classList.remove('hidden');
        } else if (target.tagName === 'A' || target.tagName === 'BUTTON') {
          cursorRef.current.classList.add('cursor-text');
          cursorRef.current.classList.remove('hidden');
        }
      }
    };

    const handleMouseOut = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-text', 'cursor-name');
        cursorRef.current.classList.add('hidden');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden" />;
} 