"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Projects() {
  const projects = [
    {
      title: "AI-Powered Portfolio",
      description: "This very website! Built with Next.js, React, and AI assistance. Features dynamic animations, theme switching, and responsive design.",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      image: "/portfolio-preview.jpg",
      link: "#",
      github: "#"
    },
    {
      title: "Handwritten Notes Collection",
      description: "Comprehensive collection of handwritten notes covering various programming concepts, algorithms, and best practices.",
      tech: ["Documentation", "Learning", "Knowledge Sharing"],
      image: "/notes-preview.jpg",
      link: "#",
      github: "#"
    },
    {
      title: "GitHub Projects",
      description: "Various coding projects and experiments showcasing different technologies and problem-solving approaches.",
      tech: ["JavaScript", "Python", "Web Development"],
      image: "/github-preview.jpg",
      link: "#",
      github: "#"
    }
  ];

  return (
    <section id="projects" className="theme-box max-w-5xl mx-auto mt-16 px-8 rounded-xl p-10 shadow-2xl border border-white/10 backdrop-blur-md">
      <h2 className="uppercase text-xs tracking-wide text-[var(--portfolio-accent)]">
        Portfolio
      </h2>
      <h3 className="text-2xl mt-2 mb-8 font-semibold">Some of my recent work</h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{
              y: -8,
              boxShadow: `0 12px 32px rgba(0, 188, 212, 0.3)`,
            }}
          >
            <div className="project-image">
              <div className="w-full h-48 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{project.title}</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-[var(--portfolio-accent)]/20 text-[var(--portfolio-accent)] rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.link}
                  className="px-4 py-2 bg-[var(--portfolio-accent)] text-white rounded-lg hover:bg-[var(--portfolio-accent)]/80 transition"
                >
                  View Project
                </a>
                <a
                  href={project.github}
                  className="px-4 py-2 border border-[var(--portfolio-accent)] text-[var(--portfolio-accent)] rounded-lg hover:bg-[var(--portfolio-accent)] hover:text-white transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 