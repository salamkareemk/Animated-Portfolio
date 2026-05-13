"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 120; // 000 to 119

const currentFrame = (index: number) =>
  `/new_sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;

/** Draw an image onto a canvas using "cover" fill mode (like background-size: cover) */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasW / canvasH;

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

  if (imgAspect > canvasAspect) {
    // Image is wider — crop sides
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    // Image is taller — crop top/bottom
    sh = img.naturalWidth / canvasAspect;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef(0);

  const { scrollYProgress } = useScroll();
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Resize canvas to always fill the viewport exactly
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw current frame after resize
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = images[currentFrameIndexRef.current];
    if (img && img.complete && img.naturalWidth > 0) {
      drawCover(ctx, img, canvas.width, canvas.height);
    }
  }, [images]);

  // Listen for resize
  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    // Once the first frame loads, resize and draw
    loadedImages[0].onload = () => {
      setImages(loadedImages);
    };
  }, []);

  // Draw initial frame when images are loaded
  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = images[0];
    if (img.complete && img.naturalWidth > 0) {
      drawCover(ctx, img, canvas.width, canvas.height);
    } else {
      img.onload = () => drawCover(ctx, img, canvas.width, canvas.height);
    }
  }, [images]);

  // Update canvas on scroll
  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      if (images.length === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const idx = Math.round(Math.max(0, Math.min(FRAME_COUNT - 1, latest)));
      currentFrameIndexRef.current = idx;
      const img = images[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        drawCover(ctx, img, canvas.width, canvas.height);
      }
    });
  }, [frameIndex, images]);

  const canvasOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0.3]);

  return (
    <motion.div
      style={{ opacity: canvasOpacity }}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden bg-black"
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      {/* Gradient overlay for text readability — stronger on mobile */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      {/* Side vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
    </motion.div>
  );
}
