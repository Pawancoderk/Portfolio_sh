"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { DashedFrame } from "@/components/UI/DashedFrame";
import { Diagnostics } from "@/components/Widgets/Diagnostics";
import { AIPlayground } from "@/components/Widgets/AIPlayground";
import { CodeDiff } from "@/components/Widgets/CodeDiff";
import { ExperienceLogs } from "@/components/Widgets/ExperienceLogs";
import { ProjectsGrid } from "@/components/Widgets/ProjectsGrid";
import { Move, Info, Terminal, RotateCcw, Eye, EyeOff, Activity, Maximize2 } from "lucide-react";
import { TextScramble } from "@/components/UI/TextScramble";

export function ConsoleView() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [showGuides, setShowGuides] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Sync coords state with motion values for rulers
  useEffect(() => {
    const unsubscribeX = x.on("change", (latest) => {
      setCoords((prev) => ({ ...prev, x: latest }));
    });
    const unsubscribeY = y.on("change", (latest) => {
      setCoords((prev) => ({ ...prev, y: latest }));
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  // Center canvas back to (0, 0) with a smooth spring animation
  const resetCoordinates = () => {
    animate(x, 0, { type: "spring", stiffness: 90, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 90, damping: 20 });
  };

  return (
    <div className="w-full flex flex-col border border-zinc-800 bg-zinc-950/80 backdrop-blur-md rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 animate-neon-pulse">
      
      {/* 1. Futuristic IDE Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 select-none">
        {/* Left window controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="size-3 rounded-full bg-red-500/80 hover:bg-red-400 border border-red-600/50 cursor-pointer transition-colors"
            title="Toggle Collapse"
          />
          <button 
            onClick={resetCoordinates}
            className="size-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 border border-yellow-600/50 cursor-pointer transition-colors"
            title="Recenter Workspace"
          />
          <button 
            className="size-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 border border-emerald-600/50 cursor-pointer transition-colors"
            title="Workspace Active"
          />
          <span className="text-[10px] font-mono text-zinc-500 ml-2 select-none hidden sm:inline">
            SYSTEM_WS_v1.2.0
          </span>
        </div>

        {/* Center Title Path */}
        <div className="font-mono text-[10px] text-zinc-400 flex items-center gap-1.5">
          <Terminal className="size-3.5 text-accent" />
          <span>pawan@portfolio-dev: ~/workspace</span>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-400 hidden xs:inline uppercase tracking-wider">Kernel: Running</span>
        </div>
      </div>

      {/* Main Workspace Frame container */}
      <div 
        ref={constraintsRef} 
        style={{ height: isMinimized ? "0px" : "80vh" }}
        className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing bg-zinc-950/95 transition-all duration-500 ease-in-out"
      >
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none z-30" />

        {/* 2. Top-Left intersection origin indicator */}
        <div className="absolute top-0 left-0 w-6 h-6 border-r border-b border-zinc-900 bg-zinc-950 z-30 flex items-center justify-center pointer-events-none font-mono text-[7px] text-accent">
          +
        </div>

        {/* 3. Horizontal Coordinate Ruler */}
        <div className="absolute top-0 left-6 right-0 h-6 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm z-20 overflow-hidden pointer-events-none select-none flex items-center">
          <div 
            className="relative flex items-end h-full pb-0.5" 
            style={{ transform: `translateX(${coords.x}px)`, width: "2400px", left: "calc(50% - 1200px)" }}
          >
            {Array.from({ length: 25 }).map((_, i) => {
              const val = (i - 12) * 100;
              return (
                <div key={i} className="absolute flex flex-col items-center" style={{ left: `${i * 100}px` }}>
                  <span className="text-[7px] text-zinc-600 mb-0.5 font-mono">{val}</span>
                  <div className="w-[1px] h-1.5 bg-zinc-800" />
                </div>
              );
            })}
          </div>
          {/* Virtual Center Crosshair marker */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-accent/35 z-20 pointer-events-none" />
        </div>

        {/* 4. Vertical Coordinate Ruler */}
        <div className="absolute top-6 left-0 bottom-0 w-6 border-r border-zinc-900 bg-zinc-950/80 backdrop-blur-sm z-20 overflow-hidden pointer-events-none select-none flex justify-center">
          <div 
            className="relative w-full" 
            style={{ transform: `translateY(${coords.y}px)`, height: "1600px", top: "calc(50% - 800px)" }}
          >
            {Array.from({ length: 17 }).map((_, i) => {
              const val = (i - 8) * 100;
              return (
                <div key={i} className="absolute flex items-center justify-end w-full pr-1.5" style={{ top: `${i * 100}px` }}>
                  <span className="text-[7px] text-zinc-600 mr-1 font-mono">{val}</span>
                  <div className="h-[1px] w-1.5 bg-zinc-800" />
                </div>
              );
            })}
          </div>
          {/* Virtual Center Crosshair marker */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-accent/35 z-20 pointer-events-none" />
        </div>

        {/* 5. Infinite Grid Background Plane */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.05}
          dragMomentum={true}
          style={{ x, y }}
          className="absolute w-[2400px] h-[1600px] bg-dot-grid bg-dither top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {/* Grid Origin Guide lines */}
          {showGuides && (
            <>
              {/* Origin X Axis */}
              <div className="absolute left-0 right-0 top-[800px] h-[1px] border-t border-dashed border-accent/15 pointer-events-none" />
              {/* Origin Y Axis */}
              <div className="absolute top-0 bottom-0 left-[1200px] w-[1px] border-l border-dashed border-accent/15 pointer-events-none" />
              
              {/* Target lock crosshairs at origin */}
              <div className="absolute top-[785px] left-[1185px] size-30 border border-dashed border-accent/10 rounded-full flex items-center justify-center animate-spin [animation-duration:20s] pointer-events-none" />
              <div className="absolute top-[795px] left-[1195px] size-10 border border-accent/20 rounded-full pointer-events-none" />
            </>
          )}

          {/* Central Core Bio widget */}
          <div 
            className="absolute top-[680px] left-[1020px] w-[360px] z-10"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DashedFrame title="Core.Profile" showLeds active>
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    Open for Opportunities
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground leading-tight">
                  <TextScramble text="Pawan Kumar" />
                </h2>
                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                  Full Stack Developer • AI Builder • Computer Science Student
                </p>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-sans">
                  Building accessible, high-speed interfaces, containerized APIs, and intelligent LLM-orchestrated products.
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-dashed border-zinc-800/30 font-mono text-[9px] text-zinc-650">
                  <Terminal className="size-3" />
                  <span>Double-click or pan to explore widgets.</span>
                </div>
              </div>
            </DashedFrame>
          </div>

          {/* AI Playground Widget */}
          <div 
            className="absolute top-[620px] left-[520px] w-[460px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DashedFrame title="AI.Assistant.SH" showLeds>
              <AIPlayground />
            </DashedFrame>
          </div>

          {/* Code Diff Widget */}
          <div 
            className="absolute top-[620px] left-[1420px] w-[460px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DashedFrame title="Git.Commit.Review" showLeds>
              <CodeDiff />
            </DashedFrame>
          </div>

          {/* Projects Bento Grid Widget */}
          <div 
            className="absolute top-[200px] left-[750px] w-[900px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DashedFrame title="Production.Index" showLeds>
              <ProjectsGrid />
            </DashedFrame>
          </div>

          {/* Experience Timeline Widget */}
          <div 
            className="absolute top-[1030px] left-[920px] w-[560px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DashedFrame title="Milestones.Log" showLeds>
              <ExperienceLogs />
            </DashedFrame>
          </div>

          {/* Diagnostics & Stats Widget */}
          <div 
            className="absolute top-[390px] left-[520px] w-[460px] h-[190px]"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DashedFrame title="Diag.Console" showLeds>
              <Diagnostics dragX={coords.x} dragY={coords.y} />
            </DashedFrame>
          </div>
        </motion.div>

        {/* 6. Floating Canvas HUD Dock - Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-zinc-900/90 backdrop-blur border border-zinc-850 rounded-xl p-1.5 flex items-center gap-4 shadow-xl pointer-events-auto select-none">
          <div className="flex items-center gap-2 px-2 border-r border-zinc-800 font-mono text-[9px] text-zinc-500">
            <Move className="size-3 text-zinc-400 animate-pulse" />
            <span>PAN MODE ACTIVE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetCoordinates}
              className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-accent rounded transition-all cursor-pointer flex items-center gap-1 font-mono text-[9px]"
              title="Reset coordinates back to origin (0, 0)"
            >
              <RotateCcw className="size-3" />
              <span>Center</span>
            </button>

            <button
              onClick={() => setShowGuides(!showGuides)}
              className={`p-1.5 rounded transition-all cursor-pointer flex items-center gap-1 font-mono text-[9px] ${
                showGuides ? "bg-accent/10 text-accent" : "hover:bg-zinc-800 text-zinc-400"
              }`}
              title="Toggle central axes guidelines"
            >
              {showGuides ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
              <span>Guides</span>
            </button>
          </div>

          <div className="flex items-center gap-1 px-2 border-l border-zinc-800 font-mono text-[9px] text-accent font-bold">
            <Activity className="size-3 text-accent" />
            <span className="tabular-nums">X: {coords.x.toFixed(0)}px Y: {coords.y.toFixed(0)}px</span>
          </div>
        </div>

        {/* 7. Hover Info HUD - Bottom Right */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none select-none bg-zinc-900/80 backdrop-blur border border-zinc-850 px-2.5 py-1.5 rounded-lg text-zinc-500 font-mono text-[9px] flex items-center gap-1.5">
          <Info className="size-3 text-zinc-400" />
          <span>CANVAS WIDGETS ARE FULLY INTERACTIVE</span>
        </div>
      </div>
    </div>
  );
}
