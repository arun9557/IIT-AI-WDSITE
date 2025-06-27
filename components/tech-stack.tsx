"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function TechStack() {
  const techStack = [
    { name: 'JavaScript', logo: 'javascript' },
    { name: 'HTML', logo: 'html-5--v1' },
    { name: 'CSS', logo: 'css3' },
    { name: 'Python', logo: 'python' },
    { name: 'GitHub', logo: 'github' },
    { name: 'Kali Linux', logo: 'kali' },
    { name: 'Dark Web', logo: 'dark-web' },
    { name: 'Hx', logo: 'hacker' },
    { name: 'AI', logo: 'artificial-intelligence' },
    { name: 'Parrot OS', logo: 'parrot' },
  ];

  return (
    <section className="theme-box max-w-5xl mx-auto mt-16 px-8 rounded-xl p-10 shadow-2xl border border-white/10 backdrop-blur-md">
      <h2 className="uppercase text-xs tracking-wide text-[var(--portfolio-accent)]">
        Technologies
      </h2>
      <h3 className="text-2xl mt-2 mb-8 font-semibold">Tools I work with</h3>
      <motion.div
        className="tech-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {techStack.map(({ name, logo }, index) => (
          <motion.div
            key={index}
            className="tech-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              rotateX: 8,
              rotateY: 8,
              boxShadow: `0 8px 24px rgba(0, 188, 212, 0.4)`,
              zIndex: 10,
            }}
          >
            <Image 
              src={`https://img.icons8.com/color/36/${logo}.png`} 
              alt={`${name} logo`} 
              width={36}
              height={36}
              className="tech-logo" 
            />
            <span className="text-base">{name}</span>
          </motion.div>
        ))}
      </motion.div>
      <p className="mt-6 text-sm italic text-[var(--portfolio-accent)]">
        Always learning, always evolving
      </p>
    </section>
  );
} 