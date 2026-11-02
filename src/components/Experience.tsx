"use client";

import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    role: "Full Stack Developer – MERN",
    company: "HACA – Haris & Co., Kozhikode",
    period: "Sep 2026 – Present",
    points: [
      "Developed a placement application on the MERN stack (MongoDB, Express.js, React.js, Node.js) to help students discover relevant job opportunities.",
      "Integrated APIs to fetch and use data within the application, building both frontend and backend features.",
      "Worked on AI-related features and explored practical applications of AI within the application.",
      "Translated application requirements into practical features, solving real-world development challenges through hands-on project work.",
    ],
  },
  {
    role: "Advanced Python Django & GenAI Intern",
    company: "HACA – Haris & Co., Kozhikode",
    period: "Dec 2025 – Aug 2026",
    points: [
      "Develop backend systems in Python and Django, applying structured project architecture, reusable app design, and software development best practices.",
      "Build AI-integrated web applications that connect Django backends to LLM-based workflows for real-time, context-aware responses.",
      "Implemented document chunking, embedding generation, semantic retrieval, and chatbot integration for an institutional AI assistant.",
    ],
  },
  {
    role: "AI Intern",
    company: "SmecLabs, Kochi",
    period: "May 2024 – Jun 2024",
    points: [
      "Developed a hate speech detection web app using an LSTM-based deep learning model for real-time text classification, improving performance through preprocessing and dataset refinement.",
    ],
  },
  {
    role: "AI and Python Intern",
    company: "Codsoft (Remote)",
    period: "Jun 2024 – Jul 2024",
    points: [
      "Built multiple Python applications, including an NLP-powered chatbot and an interactive game, delivered against internship milestones.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Journey</span>
          </h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-3 sm:ml-4 md:ml-8 space-y-8 sm:space-y-12 pb-8">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative pl-6 sm:pl-8 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-lg sm:text-2xl font-semibold text-white">{exp.role}</h3>
                  <span className="text-sm font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg text-purple-400 mb-2 sm:mb-4">{exp.company}</h4>
                <ul className="space-y-2 text-neutral-400 text-sm sm:text-base">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400/80 mt-2 shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
