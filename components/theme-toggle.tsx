"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--portfolio-bg', '#0a0a0a');
      root.style.setProperty('--portfolio-text', '#ffffff');
      root.style.setProperty('--portfolio-accent', '#00bcd4');
    } else {
      root.style.setProperty('--portfolio-bg', '#ffffff');
      root.style.setProperty('--portfolio-text', '#0a0a0a');
      root.style.setProperty('--portfolio-accent', '#00bcd4');
    }
  }, [isDark]);

  return (
    <motion.button
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--portfolio-accent)]/20 backdrop-blur-md border border-[var(--portfolio-accent)]/30 flex items-center justify-center text-[var(--portfolio-accent)] hover:bg-[var(--portfolio-accent)]/30 transition-all duration-300"
      onClick={() => setIsDark(!isDark)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <span className="text-xl">
        {isDark ? '☀️' : '🌙'}
      </span>
    </motion.button>
  );
} 