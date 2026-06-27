"use client";

import React, { useEffect, useRef } from "react";

export function HeroBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      bgRef.current.style.setProperty("--cursor-x", `${e.clientX}px`);
      bgRef.current.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Premium subtle gradient mesh drift */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--glow-color),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.06),transparent_40%)] opacity-70 animate-gradient-drift" />
      
      {/* Dotted Grid Layout */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 dark:opacity-40" />

      {/* SVG Fine-grain Noise Overlay (Stripe/Linear style) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] dark:opacity-[0.025] contrast-150 select-none">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      
      {/* Spotlight following cursor */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-opacity duration-300 opacity-60 dark:opacity-40"
        style={{
          background: "radial-gradient(800px circle at var(--cursor-x, 50vw) var(--cursor-y, 50vh), var(--glow-color), transparent 75%)",
        }}
      />
    </div>
  );
}
