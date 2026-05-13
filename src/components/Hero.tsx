"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
      <div className="w-full max-w-5xl mx-auto text-center pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-tight">
            Abdul Salam{" "}
            <span className="text-cyan-400">Kareem</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-base sm:text-xl md:text-3xl font-medium text-neutral-300 min-h-[2.5rem] sm:min-h-[3rem] mb-6 sm:mb-8"
        >
          <Typewriter
            words={[
              "AI Engineer",
              "Web Developer",
              "Generative AI Enthusiast",
              "Problem Solver",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-sm sm:text-base md:text-xl text-neutral-400 max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 font-light tracking-wide italic px-2 sm:px-4 md:px-0"
        >
          &ldquo;Transforming intelligent ideas into real-world digital solutions.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-6"
        >
          <a
            href="#projects"
            className="w-full xs:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full xs:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-4 sm:right-1/4 w-24 h-24 sm:w-48 md:w-64 sm:h-48 md:h-64 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-600/30 blur-3xl -z-10"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-4 sm:left-1/4 w-32 h-32 sm:w-64 md:w-96 sm:h-64 md:h-96 rounded-full bg-gradient-to-tr from-blue-600/10 to-transparent blur-3xl -z-10"
      />
    </section>
  );
}
