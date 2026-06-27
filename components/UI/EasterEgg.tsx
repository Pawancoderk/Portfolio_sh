"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, X } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keySequence = useRef<string[]>([]);
  const requestRef = useRef<number | null>(null);

  // 1. Listen for Konami Code keyboard sequence
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expectedKey = KONAMI_CODE[keySequence.current.length].toLowerCase();

      if (key === expectedKey) {
        keySequence.current.push(e.key);
        if (keySequence.current.length === KONAMI_CODE.length) {
          setIsActive(true);
          keySequence.current = [];
        }
      } else {
        // Reset sequence if incorrect key pressed
        keySequence.current = [];
        // Check if the current pressed key matches the first key of the sequence to start again
        if (e.key === KONAMI_CODE[0]) {
          keySequence.current.push(e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. Run falling Matrix rain on Canvas when unlocked
  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const characters = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-/<>[]{}";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Store Y coordinates of drops
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Clear canvas with translucent black fill to create trails
      ctx.fillStyle = "rgba(4, 4, 6, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text color and font
      ctx.fillStyle = "rgba(16, 185, 129, 0.85)"; // Emerald accent
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Coordinates
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(char, x, y);

        // Reset drop coordinates if it hits screen bottom randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    requestRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#040406] flex items-center justify-center font-mono select-none"
        >
          {/* Falling Code Matrix Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

          {/* Interactive alert box overlay */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative z-10 w-full max-w-md p-6 border border-red-500/30 bg-black/90 backdrop-blur-xl rounded-xl text-left shadow-[0_0_50px_rgba(239,68,68,0.15)] space-y-4 m-4"
          >
            <div className="flex items-center gap-3 text-red-500 pb-2 border-b border-red-500/20">
              <ShieldAlert className="size-5 animate-bounce" />
              <span className="font-bold tracking-wider text-xs">SYS_ALERT: CORRUPTED_KERNEL</span>
            </div>

            <div className="text-xs text-zinc-400 space-y-2">
              <p className="text-zinc-200 font-bold">&gt; PORT HACK UNLOCKED VIA KONAMI COMMAND SEQUENCE.</p>
              <p>&gt; Connection Socket: ESTABLISHED (Root Privilege Access)</p>
              <p>&gt; System Target: portfolio_server_core.sys</p>
              <p>&gt; Memory Buffer: DUMPING COMPRESSED BINARY LOGS...</p>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setIsActive(false)}
                className="flex-1 py-2 bg-red-600 hover:bg-red-500 active:scale-98 text-white text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                <X className="size-3.5" />
                <span>DISCONNECT SOCKET</span>
              </button>
            </div>

            {/* Secret key bindings */}
            <div className="text-[9px] text-zinc-600 border-t border-dashed border-zinc-900 pt-3 flex items-center gap-1.5 justify-between">
              <span>HOST: PAWAN_SYSTEM</span>
              <span>PRESS ESC TO ABORT</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
