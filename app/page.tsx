'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CompleteBackgroundAnimation } from '@/components/animated-bg';
import { HeroSection } from '@/components/hero-section';
import { Navigation } from '@/components/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { CustomCursor } from '@/components/cursor';
import { FloatingElements } from '@/components/floating-elements';
import { TechStack } from '@/components/tech-stack';
import { Projects } from '@/components/projects';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  // Intro animation
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const introBoxVariants = {
    hidden: { y: '-100vh', rotateX: 90 },
    visible: {
      y: 0,
      rotateX: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: {
      y: '100vh',
      rotateX: -90,
      transition: { duration: 1, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* Background Animation */}
      <CompleteBackgroundAnimation />
      <FloatingElements />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 bg-white z-50 perspective-1000"
            variants={introBoxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <TechStack />
        <Projects />
      </main>
    </>
  );
} 