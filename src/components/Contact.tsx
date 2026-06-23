"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your email.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter a message.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 z-10 border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Let&apos;s build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">future.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-md">
            I am currently open for opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-neutral-300">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base md:text-lg">Kerala, India</span>
            </div>
            
            <a href="mailto:salamkareemk@gmail.com" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base md:text-lg break-all">salamkareemk@gmail.com</span>
            </a>

            <div className="flex gap-4 pt-6">
              <a href="https://www.linkedin.com/in/abdul-salam-kareem/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/abdul_salam_kareem/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://github.com/salamkareemk" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all">
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name</label>
            <input 
              type="text" 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
              placeholder="John Doe" 
              required
              disabled={status === "sending"}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
              placeholder="john@example.com" 
              required
              disabled={status === "sending"}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-neutral-400">Message</label>
            <textarea 
              id="message" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none" 
              placeholder="Hello..." 
              required
              disabled={status === "sending"}
            />
          </div>

          {status === "success" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-medium"
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          )}

          {status === "error" && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-medium"
            >
              {errorMessage}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={status === "sending"}
            className="mt-2 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-cyan-800 disabled:to-blue-900 disabled:text-neutral-500 text-white rounded-xl font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-[0.98] disabled:scale-100 disabled:shadow-none"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

      </div>
    </section>
  );
}
