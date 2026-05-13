"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

export default function ChatbotGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am Abdul Salam&apos;s AI assistant. How can I help you explore this portfolio?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const currentInput = input;
    setInput("");

    // Mock bot reply
    setTimeout(() => {
      let reply = "I&apos;m a mock AI assistant for this portfolio. Abdul Salam is an incredible AI Engineer ready for new challenges!";
      if (currentInput.toLowerCase().includes("contact") || currentInput.toLowerCase().includes("email")) {
        reply = "You can contact Abdul Salam at salamkareemk@gmail.com or via the contact form at the bottom of the page.";
      } else if (currentInput.toLowerCase().includes("project")) {
        reply = "He has built amazing projects like a Traffic Sign Detection system and a Hate Speech Detection web app. Check out the &apos;Innovations&apos; section!";
      } else if (currentInput.toLowerCase().includes("skill")) {
        reply = "His tech stack includes Python, TensorFlow, PyTorch, Django, Next.js, and much more.";
      }
      setMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-[min(80vw,320px)] h-80 sm:h-96 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white font-medium">
                <Bot className="w-5 h-5 text-cyan-400" />
                AI Guide
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${msg.isBot ? "bg-white/10 text-neutral-200 rounded-tl-none border border-white/5" : "bg-cyan-500/20 text-cyan-100 rounded-tr-none border border-cyan-500/20"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center text-white relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-black rounded-full animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
