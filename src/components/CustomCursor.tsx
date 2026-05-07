"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const trailsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.style.cursor = "auto";
      return;
    }

    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    const trails = trailsRef.current;
    
    if (!cursor || !follower || !ring || !textEl) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    trails.forEach(t => t && gsap.set(t, { xPercent: -50, yPercent: -50, x: -100, y: -100 }));

    let mouseX = -100;
    let mouseY = -100;
    let customCursorX = -100;
    let customCursorY = -100;
    let isHovering = false;
    let isInitialized = false;
    
    // 1. Idle breathing pulse animation
    const idlePulse = gsap.to(ring, {
      scale: 1.15,
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!isInitialized) {
        customCursorX = e.clientX;
        customCursorY = e.clientY;
        isInitialized = true;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      if (!isHovering) {
        gsap.to(ring, { scale: 0.5, borderWidth: "3px", duration: 0.2, ease: "power2.out" });
        gsap.to(cursor, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 0.8, borderRadius: "20%", duration: 0.2, ease: "power2.out" });
      }
      
      // 2. Burst Ripple Effect on Click
      const ripple = document.createElement('div');
      ripple.className = 'fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference';
      ripple.style.width = '40px';
      ripple.style.height = '40px';
      ripple.style.border = '2px solid white';
      document.body.appendChild(ripple);
      
      gsap.set(ripple, { x: customCursorX, y: customCursorY, xPercent: -50, yPercent: -50, scale: 0.5, opacity: 1 });
      gsap.to(ripple, {
        scale: 3,
        opacity: 0,
        borderWidth: "0px",
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          if (document.body.contains(ripple)) {
            ripple.remove();
          }
        }
      });
    };

    const onMouseUp = () => {
      if (!isHovering) {
        gsap.to(ring, { scale: 1, borderWidth: "1px", duration: 0.4, ease: "elastic.out(1, 0.3)" });
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1, borderRadius: "12px", duration: 0.4, ease: "elastic.out(1, 0.3)" });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest("a, button, input, textarea, [role='button']") as HTMLElement;
      
      if (interactiveEl || window.getComputedStyle(target).cursor === "pointer") {
        isHovering = true;
        idlePulse.pause();
        
        const cursorText = interactiveEl?.getAttribute('data-cursor-text');
        
        // 3. Hover Morphing
        if (cursorText) {
          textEl.textContent = cursorText;
          gsap.to(textEl, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" });
          gsap.to(ring, {
            scale: 3,
            opacity: 1,
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: "transparent",
            borderRadius: "50%",
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.5)"
          });
          gsap.to(follower, { mixBlendMode: "normal" });
          gsap.to(cursor, { opacity: 0, duration: 0.2 });
        } else {
          textEl.textContent = "";
          gsap.to(textEl, { opacity: 0, scale: 0, duration: 0.2 });
          gsap.to(ring, {
            scale: 1.5,
            opacity: 1,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px", // Morph to rounded diamond
            rotation: 45, // Rotate to diamond shape
            backdropFilter: "blur(4px)",
            duration: 0.4,
            ease: "back.out(1.5)"
          });
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        }
      }
    };

    const handleMouseOut = () => {
      isHovering = false;
      idlePulse.play();
      
      gsap.to(textEl, { opacity: 0, scale: 0, duration: 0.2 });
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 1)",
        borderRadius: "50%",
        backdropFilter: "blur(0px)",
        rotation: 0,
        borderWidth: "1px",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(follower, { mixBlendMode: "difference" });
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    const render = () => {
      if (!isInitialized) return;

      const velX = mouseX - customCursorX;
      const velY = mouseY - customCursorY;

      customCursorX += velX * 0.25;
      customCursorY += velY * 0.25;

      // 4. Velocity Stretch Effect
      const speed = Math.sqrt(velX * velX + velY * velY);
      const angle = Math.atan2(velY, velX) * (180 / Math.PI);

      if (!isHovering) {
        const scaleX = Math.min(1 + speed * 0.005, 1.8);
        const scaleY = Math.max(1 - speed * 0.005, 0.4);
        
        gsap.set(follower, {
          x: customCursorX,
          y: customCursorY,
          rotation: angle,
          scaleX: scaleX,
          scaleY: scaleY,
        });
      } else {
        // Reset stretch when hovering
        gsap.set(follower, {
          x: customCursorX,
          y: customCursorY,
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
        });
      }

      // 5. Tiny Trailing Dots
      trails.forEach((trail, i) => {
        if (trail) {
          gsap.to(trail, {
            x: customCursorX,
            y: customCursorY,
            duration: 0.15 + i * 0.05,
            ease: "power2.out",
          });
        }
      });
    };

    gsap.ticker.add(render);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(render);
      idlePulse.kill();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Trails */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998] mix-blend-difference overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { trailsRef.current[i] = el; }}
            className="absolute top-0 left-0 rounded-full bg-white"
            style={{ 
              width: `${5 - i}px`,
              height: `${5 - i}px`,
              opacity: 0.6 - i * 0.2
            }}
          />
        ))}
      </div>

      {/* Outer Follower Wrapper (Velocity Rotation & Scaling) */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference origin-center flex items-center justify-center"
      >
        {/* Inner Ring (Hover Morphing, Idle Pulse) */}
        <div 
          ref={ringRef}
          className="w-10 h-10 rounded-full border border-white flex items-center justify-center origin-center overflow-hidden"
        >
          <span 
            ref={textRef} 
            className="text-black text-[10px] font-bold uppercase tracking-[0.15em] opacity-0 scale-0 origin-center whitespace-nowrap px-2"
          />
        </div>
      </div>
      
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference"
      />
    </>
  );
}
