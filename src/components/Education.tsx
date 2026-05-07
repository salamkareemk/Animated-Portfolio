"use client";

import { motion } from "framer-motion";

const EDUCATION = [
  {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    period: "Completed 2025",
    description: "Specialized in advanced machine learning algorithms, deep learning architectures, computer vision, and predictive modeling, building a strong foundation for solving complex, real-world AI problems.",
  }
];

export default function Education() {
  return (
    <section id="education" className="relative w-full py-20 md:py-32 px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Background</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Premium Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <span className="text-sm font-semibold text-pink-400 bg-pink-400/10 border border-pink-500/20 px-5 py-2 rounded-full w-fit whitespace-nowrap shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                    {edu.period}
                  </span>
                </div>
                
                <p className="text-neutral-300 leading-relaxed text-lg relative z-10">
                  {edu.description}
                </p>
                
                {/* Decorative floating elements inside card */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-500" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/30 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
