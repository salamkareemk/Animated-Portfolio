import ScrollyCanvas from "@/components/ScrollyCanvas";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import ChatbotGuide from "@/components/ChatbotGuide";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent w-full overflow-x-hidden selection:bg-cyan-500/30 font-sans text-neutral-200">
      {/* Fixed Full-Page Scrollytelling Background */}
      <ScrollyCanvas />

      {/* Content Sections that scroll over the background */}
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />

      {/* Floating Elements */}
      <ChatbotGuide />
    </main>
  );
}
