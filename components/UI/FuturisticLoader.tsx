"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldAlert, Cpu, Activity, ShieldCheck } from "lucide-react";

interface FuturisticLoaderProps {
  onComplete: () => void;
}

const MATRIX_LOGS = [
  "⚡ CONNECTING: Matrix Interface terminal host...",
  "🔒 ACCESS: Requesting secure token...",
  "✓ AUTHORIZED: Connection accepted by Sentinel.",
  "🌐 NODE: Establishing green code feed [192.168.1.104]...",
  "💾 ALLOCATING: Digital memory arrays...",
  "🧬 INJECTING: Identity vectors into system module...",
  "✓ VECTOR: Core avatar blueprint mapping loaded.",
  "🔍 SCANNING: Resolving physical pixels to binary matrix...",
  "✓ RESOLVED: Neural networks aligned at L1 Cache.",
  "🔑 DECRYPTING: Pawan Kumar signature data...",
  "✓ SIGNATURE: Authentication verified.",
  "🚀 ESTABLISHING: Matrix connection final handshake..."
];

export function FuturisticLoader({ onComplete }: FuturisticLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState(MATRIX_LOGS[0]);
  const [stage, setStage] = useState(0); // 0: Syncing, 1: Decrypted, 2: Done
  const [scrambledText, setScrambledText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const targetText = "PAWAN KUMAR // MATRIX ESTABLISHED";
  const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ1023456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // 1. Matrix Digital Rain Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const fontSize = 14;
    const columns = Math.floor(width / 16);
    const yPositions = Array(columns).fill(0).map(() => Math.random() * -height);

    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      ctx.fillStyle = "rgba(9, 9, 11, 0.08)"; // Trail fading background
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < yPositions.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = yPositions[i];

        // Randomize white leading glow
        if (Math.random() > 0.975) {
          ctx.fillStyle = "#ffffff";
        } else {
          ctx.fillStyle = "#10b981"; // Emerald Green
        }

        ctx.fillText(char, x, y);

        if (y > height + Math.random() * 1000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 16;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Loading Progress, Telemetry Logs, and Lifecycle states
  useEffect(() => {
    const totalSteps = 100;
    const stepDuration = 22; // ~2.2s total progress duration
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(currentStep, totalSteps);
      setProgress(nextProgress);

      // Change connecting status logs dynamically based on progress ranges
      const logIdx = Math.floor((nextProgress / 100) * MATRIX_LOGS.length);
      if (MATRIX_LOGS[logIdx]) {
        setLogText(MATRIX_LOGS[logIdx]);
      }

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStage(1); // Start scramble decryption
        }, 300);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // 3. Text Decrypt Scrambler
  useEffect(() => {
    if (stage !== 1) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledText(() => {
        return targetText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      if (iterations >= targetText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStage(2);
          setTimeout(onComplete, 600); // Complete and trigger fade transition
        }, 500);
      }

      iterations++;
    }, 40);

    return () => clearInterval(interval);
  }, [stage, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-between p-6 select-none overflow-hidden font-mono text-zinc-400"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.15,
        filter: "brightness(2.5) contrast(1.2)",
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* 1. Matrix falling code canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 size-full block z-0" />

      {/* Futuristic CRT scanlines */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none z-10" />

      {/* CSS Scanner animations */}
      <style>{`
        @keyframes scanner-sweep {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-scanner-sweep {
          animation: scanner-sweep 2.8s ease-in-out infinite;
        }
        .matrix-glow {
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.15), inset 0 0 15px rgba(16, 185, 129, 0.1);
        }
        .avatar-glow {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.35);
        }
      `}</style>

      {/* Top HUD Header Panel */}
      <div className="w-full max-w-7xl flex items-center justify-between border-b border-emerald-500/10 pb-4 text-[9px] text-emerald-500/60 uppercase tracking-widest z-10">
        <div className="flex items-center gap-2 font-bold">
          <ShieldCheck className="size-3.5 text-emerald-400 animate-pulse" />
          <span>Matrix Protocol Active</span>
        </div>
        <div className="hidden sm:block font-semibold">
          Proxy Address: <span className="text-emerald-400 font-bold">sentinel://node.04</span>
        </div>
        <div>
          SYS_STAGE: <span className="text-emerald-400 font-bold">INITIALIZING</span>
        </div>
      </div>

      {/* Centered Hologram Split (Avatar + Metrics) */}
      <div className="w-full max-w-xl flex-1 flex flex-col items-center justify-center space-y-6 z-10 py-6">
        
        {/* Hologram Avatar Box */}
        <div className="relative flex flex-col items-center justify-center p-8 bg-zinc-950/80 border border-emerald-500/20 rounded-2xl matrix-glow w-full max-w-md">
          {/* Neon Corner Brackets */}
          <div className="absolute top-3 left-3 size-3 border-t border-l border-emerald-500/50" />
          <div className="absolute top-3 right-3 size-3 border-t border-r border-emerald-500/50" />
          <div className="absolute bottom-3 left-3 size-3 border-b border-l border-emerald-500/50" />
          <div className="absolute bottom-3 right-3 size-3 border-b border-r border-emerald-500/50" />
          
          {/* Pulsating Matrix Scanner Ring Behind Avatar */}
          <div className="absolute size-40 rounded-full border border-emerald-500/10 animate-ping opacity-60" />
          
          {/* Profile Image & Avatar */}
          <div className="relative size-32 rounded-xl overflow-hidden border-2 border-emerald-500/40 p-1 bg-zinc-950/90 avatar-glow group">
            {/* Emerald matrix screen tint filter */}
            <div className="absolute inset-0 bg-emerald-500/15 mix-blend-overlay z-10 pointer-events-none" />
            
            {/* Cyber Scanning Laser Line */}
            <div className="absolute left-0 right-0 h-0.5 bg-emerald-400 opacity-90 z-20 shadow-[0_0_10px_#10b981] animate-scanner-sweep" />
            
            <img
              src="/avatar.png"
              alt="Pawan Kumar Matrix Avatar"
              className="w-full h-full object-cover rounded opacity-80 brightness-110 contrast-125 saturate-100"
            />
            
            {/* Retro Matrix grid mesh tint */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none opacity-[0.07]" 
              style={{
                backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
                backgroundSize: '3px 3px',
              }}
            />
          </div>

          {/* Identity & Scrambler Details */}
          <div className="text-center mt-6 space-y-3 w-full">
            <div className="h-6 flex items-center justify-center font-mono">
              {stage >= 1 ? (
                <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/5 border border-emerald-500/15 px-4 py-1.5 rounded-full select-all shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  {stage === 1 ? scrambledText : targetText}
                </span>
              ) : (
                <span className="text-[10px] tracking-widest text-emerald-500/70 font-semibold animate-pulse">
                  DECODING DIGITAL MATRIX...
                </span>
              )}
            </div>

            {/* Matrix connection log ticker */}
            <div className="font-mono text-[9px] text-zinc-500 border border-dashed border-zinc-900 bg-zinc-950 p-2.5 rounded-lg flex items-center gap-1.5 min-h-[38px] text-left">
              <Terminal className="size-3 text-emerald-500 animate-pulse shrink-0" />
              <span className="leading-normal truncate text-zinc-400">&gt; {logText}</span>
            </div>
          </div>
        </div>

        {/* Sync Progress Indicator */}
        <div className="w-full max-w-md space-y-2 select-none">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-emerald-500/60 font-semibold">
            <span className="flex items-center gap-1.5"><Cpu className="size-3 text-emerald-500/50" /> Synchronization</span>
            <span className="tabular-nums font-bold text-emerald-400">{progress}%</span>
          </div>
          
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden border border-emerald-500/5 relative">
            <div 
              className="h-full bg-emerald-500 transition-all duration-100 ease-out shadow-[0_0_8px_#10b981]" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>

      {/* Bottom Status Ticker */}
      <div className="w-full max-w-7xl flex items-center justify-between border-t border-emerald-500/10 pt-4 text-[9px] text-emerald-500/40 uppercase tracking-widest z-10 font-bold">
        <span>sys_mode: sentinel_direct</span>
        <span>© 2026 MATRIX_REV.04</span>
        <span>encryption: sha-512_crypt</span>
      </div>

    </motion.div>
  );
}
