"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "Traffic Sign Detection & Vehicle Counting System",
    description: "Real-time CV system for automated traffic analysis and vehicle counting using YOLO and OpenCV.",
    tags: ["Computer Vision", "Python", "OpenCV", "YOLO"],
    link: "#",
    github: "#",
  },
  {
    title: "Hate Speech Detection",
    description: "NLP-driven web application using LSTM and BERT models to detect and filter toxic comments.",
    tags: ["NLP", "Deep Learning", "LSTM", "BERT"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Chatbot",
    description: "Intelligent conversational agent built with transformer models, integrating contextual memory.",
    tags: ["Generative AI", "Python", "Transformers"],
    link: "#",
    github: "#",
  },
  {
    title: "Movie Database System",
    description: "A comprehensive backend system managing cinematic data with advanced SQL queries and REST APIs.",
    tags: ["Django", "MySQL", "REST API"],
    link: "#",
    github: "#",
  },
  {
    title: "ATM Machine Simulation",
    description: "A secure and robust simulation of ATM operations focusing on transaction integrity and state management.",
    tags: ["Java", "OOP", "System Design"],
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full py-20 md:py-32 px-6 lg:px-8 z-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative block h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-500 hover:border-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative h-full flex flex-col justify-between z-10">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-base mb-6 leading-relaxed">
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
                  <a href={project.link} className="flex items-center gap-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors">
                    Live Demo <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                    GitHub <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
