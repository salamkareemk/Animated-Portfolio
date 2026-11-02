"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface ProjectItem {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  github?: string;
  link?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    title: "Centralized Placement Management System | MERN Stack",
    subtitle: "Internship Project • 2026",
    description:
      "Developed a centralized placement platform using MongoDB, Express.js, React.js, and Node.js, integrating external job APIs and Apify-based scraping to aggregate technology job opportunities. Implemented role-based dashboards, profile-based job recommendations, job management, and student application tracking to streamline recruitment and placement operations.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Apify", "REST APIs"],
    link: "https://hacaplacement.vercel.app/",
  },
  {
    title: "HACAGPT – RAG Based AI Chatbot",
    subtitle: "Internship Project • 2026",
    description:
      "Designed and developed an institutional AI chatbot using LLMs and Retrieval-Augmented Generation, implementing the full pipeline: preprocessing, document chunking, embedding generation, vector indexing, and semantic search served through an interactive Flask web application.",
    tags: ["Python", "LLM", "RAG", "Flask", "Vector DB", "Embeddings", "NLP"],
    github: "https://github.com/salamkareemk/Haca_GPT_2.0",
  },
  {
    title: "MovieWorld – React Movie Database",
    subtitle: "Personal Project • 2026",
    description:
      "Built a responsive movie discovery application consuming the TMDB API for trending, popular, and top-rated titles with search, genre filtering, detailed movie pages, and persistent Favorites and Watched lists using Local Storage, deployed to Vercel.",
    tags: ["React.js", "Vite", "JavaScript", "React Router", "TMDB API", "HTML", "CSS"],
    github: "https://github.com/salamkareemk/Movieworld_React",
  },
  {
    title: "Traffic Sign Detection & Vehicle Counting System",
    subtitle: "Academic Project",
    description: "Real-time CV system for automated traffic analysis and vehicle counting using YOLO and OpenCV.",
    tags: ["Computer Vision", "Python", "OpenCV", "YOLO"],
    github: "https://github.com/salamkareemk/Traffic-sign-detection-and-Vehicle-counting",
  },
  {
    title: "Hate Speech Detection",
    subtitle: "Internship Project",
    description: "NLP-driven web application using LSTM and BERT models to detect and filter toxic comments.",
    tags: ["NLP", "Deep Learning", "LSTM", "BERT"],
    github: "https://github.com/salamkareemk/Hatespeach-",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">Innovations</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative block h-full min-h-[320px] sm:min-h-[380px] md:min-h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-colors duration-500 hover:border-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative h-full flex flex-col justify-between z-10">
                <div>
                  {project.subtitle && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2 block">
                      {project.subtitle}
                    </span>
                  )}
                  <h3 className="text-lg sm:text-2xl font-semibold text-white mb-2 sm:mb-4">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full border border-white/20 text-cyan-300 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                    >
                      Live Demo <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
                    >
                      GitHub <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
