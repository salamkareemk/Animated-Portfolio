"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative w-full py-20 md:py-32 px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Holographic Abstract Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center h-full"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan-500/30 border-dashed"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-purple-500/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            </div>
            
            {/* Profile Photo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 h-56 md:w-72 md:h-72 border-2 border-white/10 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.2)] overflow-hidden transition-transform duration-500 hover:scale-105">
                <img src="/profile.jpg" alt="Abdul Salam Kareem" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Me</span>
            </h2>
            <div className="space-y-6 text-lg text-neutral-300 leading-relaxed font-light">
              <p>
                An innovative AI Engineer and Full-Stack Python Developer passionate about building intelligent, real-world applications. Skilled in Artificial Intelligence, Machine Learning, Django, React, and modern web technologies, with expertise in developing scalable backend systems, interactive frontends, and AI-driven solutions.
              </p>
              <p>
                Experienced in designing REST APIs, implementing secure authentication, structuring relational databases, and transforming complex problems into practical, production-ready applications. Specialized in building NLP models, computer vision systems, and dynamic web platforms that combine innovation with real-world usability.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
                Adaptable
              </div>
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
                Creative
              </div>
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
                Problem Solver
              </div>
              <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
                Leader
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
