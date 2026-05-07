"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 120; // 000 to 119

const currentFrame = (index: number) =>
  `/new_sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Track scroll over the entire document
  const { scrollYProgress } = useScroll();

  // Map scroll progress to a frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw initial frame
  useEffect(() => {
    if (images.length === 0) return;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const img = images[0];

      img.onload = () => {
        canvas.width = 1920;
        canvas.height = 1080;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    };

    render();
  }, [images]);

  // Update canvas when frameIndex changes
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      if (images.length === 0) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const img = images[Math.round(latest)];
      if (img && img.complete) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    });
  }, [frameIndex, images]);

  // Apply a subtle opacity transform to fade out the canvas slightly at the very bottom
  const canvasOpacity = useTransform(scrollYProgress, [0.8, 1], [0.8, 0.2]);

  return (
    <motion.div 
      style={{ opacity: canvasOpacity }}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
      />
      {/* Dynamic gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
    </motion.div>
  );
}
