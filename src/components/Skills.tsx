"use client";

import { motion } from "framer-motion";

const ROW1 = [
  "Python", "Java", "C", "SQL", "JavaScript", "TypeScript", 
  "TensorFlow", "PyTorch", "Scikit-learn"
];
const ROW2 = [
  "OpenCV", "NumPy", "Pandas", "NLP", "Computer Vision", 
  "Flask", "Django", "Next.js", "React"
];
const ROW3 = [
  "HTML/CSS", "REST APIs", "Tailwind CSS", "Microsoft Azure AI", 
  "GitHub", "VS Code", "MySQL", "Docker"
];

const MarqueeLayer = ({ 
  skills, 
  direction = "left", 
  speed = 30 
}: { 
  skills: string[], 
  direction?: "left" | "right", 
  speed?: number 
}) => {
  return (
    <div 
      className="relative flex w-full overflow-hidden py-4"
      style={{ 
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", 
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" 
      }}
    >
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        className="flex w-max"
      >
        {[...skills, ...skills].map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center px-6 py-4 md:px-8 md:py-5 mr-4 md:mr-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:bg-white/[0.08] hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:-translate-y-1 transition-all duration-300 group cursor-default"
          >
            <span className="text-lg md:text-xl font-medium text-neutral-300 group-hover:text-cyan-300 transition-colors">
              {skill}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="relative w-full py-20 md:py-32 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">Arsenal</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Tools, languages, and frameworks I use to engineer the future.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-4 mt-8 w-full relative">
        <MarqueeLayer skills={ROW1} direction="left" speed={35} />
        <MarqueeLayer skills={ROW2} direction="right" speed={40} />
        <MarqueeLayer skills={ROW3} direction="left" speed={30} />
      </div>
    </section>
  );
}
