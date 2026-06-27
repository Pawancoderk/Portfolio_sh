"use client";

import React, { useEffect, useRef } from "react";

interface MatrixRainProps {
  active: boolean;
  onClose: () => void;
}

export function MatrixRain({ active, onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890XYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;

    // Drops coordinates
    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.floor(Math.random() * -100); // Random offset to stagger start
    }

    const draw = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald-500 color matching theme accent
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        // Get random char
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        // Draw char
        ctx.fillText(text, x, y);

        // Reset drop to top if it reaches the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        // Increment drop Y coordinate
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center select-none font-mono">
      {/* Matrix Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />

      {/* Floating alert */}
      <div className="relative z-10 p-6 border border-dashed border-emerald-500 bg-zinc-950/80 rounded-xl max-w-sm text-center space-y-4 shadow-2xl backdrop-blur-md">
        <h3 className="text-emerald-500 text-sm font-bold animate-pulse uppercase tracking-widest">&gt; EASTER_EGG: MATRIX_MODE_ACTIVE</h3>
        <p className="text-zinc-400 text-[10px] leading-relaxed">
          You have cracked Pawan's workspace kernel. The digital rain is running.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-dashed border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] rounded transition-all cursor-pointer font-bold uppercase tracking-wider"
        >
          RESTORE NORMAL CONSOLE [normal]
        </button>
      </div>
    </div>
  );
}
