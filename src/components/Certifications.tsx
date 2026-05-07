"use client";

import { motion } from "framer-motion";

const CERTIFICATIONS = [
  "Microsoft LinkedIn Generative AI",
  "Infosys AI/NLP/Deep Learning",
  "GUVI Google Certifications",
  "IT Specialist Python & JavaScript",
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full py-32 px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Licenses & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Certifications</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative px-8 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-400/50 flex items-center justify-center text-center group cursor-default transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              <span className="relative text-lg font-medium text-neutral-200 group-hover:text-white z-10">
                {cert}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
