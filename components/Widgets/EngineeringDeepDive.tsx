"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Database,
  GitBranch,
  Layers,
  FileCode,
  Zap,
  BookOpen,
  ArrowRight,
  Workflow
} from "lucide-react";
import { DashedFrame } from "@/components/UI/DashedFrame";

type ProjectId = "cnn" | "saas";
type SubTabType = "writeup" | "system" | "data";

export function EngineeringDeepDive() {
  const [activeProject, setActiveProject] = useState<ProjectId>("cnn");
  const [activeTab, setActiveTab] = useState<SubTabType>("writeup");

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 scroll-mt-20 select-none">
      {/* Local SVG flows & coordinate grids animations style */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flow-line {
          to {
            stroke-dashoffset: -20;
          }
        }
        .svg-flow-active {
          stroke-dasharray: 6 4;
          animation: flow-line 1.2s linear infinite;
        }
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 2px var(--accent)) opacity(0.85);
            stroke-width: 1.5px;
          }
          50% {
            filter: drop-shadow(0 0 5px var(--accent)) opacity(1);
            stroke-width: 2px;
          }
        }
        .svg-glow-node {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        @keyframes grid-pulse {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.22; }
        }
        .svg-grid-bg {
          animation: grid-pulse 4s ease-in-out infinite;
        }
      `}} />

      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-dashed border-zinc-850/80 pb-3 mb-8">
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
          <Workflow className="size-3.5 text-accent" />
          <span>05 // System Engineering Deep Dive</span>
        </div>
        <span className="text-[9px] font-mono text-zinc-500 uppercase">
          Showcasing Systems Thinking
        </span>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* ========================================================= */}
        {/* LEFT SIDEBAR: Project Selection Tabs                      */}
        {/* ========================================================= */}
        <div className="lg:col-span-1 space-y-4">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
            Select Core Engine
          </span>
          <div className="flex flex-row lg:flex-col gap-3">
            {/* Project 1 Button (CNN Engine) */}
            <button
              onClick={() => {
                setActiveProject("cnn");
                setActiveTab("writeup");
              }}
              className={`flex-1 text-left p-4 border border-dashed rounded-xl transition-all cursor-pointer relative overflow-hidden ${
                activeProject === "cnn"
                  ? "border-accent bg-accent/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "border-zinc-850 bg-card/25 hover:border-zinc-700/80"
              }`}
            >
              {activeProject === "cnn" && (
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-accent/55 animate-scan-beam" />
              )}
              
              <div className="flex items-center justify-between gap-2 mb-2 border-b border-dashed border-zinc-900/60 pb-1.5">
                <div className="flex items-center gap-2">
                  <Cpu className={`size-4 ${activeProject === "cnn" ? "text-accent" : "text-zinc-500"}`} />
                  <span className="text-xs font-mono font-bold text-foreground">Deep Audio CNN</span>
                </div>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
              </div>

              <div className="font-mono text-[8px] space-y-1 text-zinc-500">
                <div className="flex justify-between">
                  <span>LATENCY:</span>
                  <span className="text-zinc-300 font-bold">42ms (warm)</span>
                </div>
                <div className="flex justify-between">
                  <span>QUANT:</span>
                  <span className="text-zinc-300 font-bold">INT8 QAT</span>
                </div>
                <div className="flex justify-between">
                  <span>ACCURACY:</span>
                  <span className="text-accent font-bold">94.2%</span>
                </div>
              </div>
            </button>

            {/* Project 2 Button (SaaS Engine) */}
            <button
              onClick={() => {
                setActiveProject("saas");
                setActiveTab("writeup");
              }}
              className={`flex-1 text-left p-4 border border-dashed rounded-xl transition-all cursor-pointer relative overflow-hidden ${
                activeProject === "saas"
                  ? "border-accent bg-accent/5 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                  : "border-zinc-850 bg-card/25 hover:border-zinc-700/80"
              }`}
            >
              {activeProject === "saas" && (
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-accent/55 animate-scan-beam" />
              )}
              
              <div className="flex items-center justify-between gap-2 mb-2 border-b border-dashed border-zinc-900/60 pb-1.5">
                <div className="flex items-center gap-2">
                  <Layers className={`size-4 ${activeProject === "saas" ? "text-accent" : "text-zinc-500"}`} />
                  <span className="text-xs font-mono font-bold text-foreground">Arch-Viz SaaS</span>
                </div>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
              </div>

              <div className="font-mono text-[8px] space-y-1 text-zinc-500">
                <div className="flex justify-between">
                  <span>COMPILER:</span>
                  <span className="text-zinc-300 font-bold">Three.js</span>
                </div>
                <div className="flex justify-between">
                  <span>RENDER:</span>
                  <span className="text-zinc-300 font-bold">5.8s avg</span>
                </div>
                <div className="flex justify-between">
                  <span>MODEL:</span>
                  <span className="text-accent font-bold">Sonnet 3.5</span>
                </div>
              </div>
            </button>
          </div>

          {/* Sub-tab Selectors */}
          <div className="flex flex-wrap lg:flex-col bg-zinc-950/60 p-1 border border-dashed border-zinc-850 rounded-lg gap-1 font-mono text-[9px]">
            <button
              onClick={() => setActiveTab("writeup")}
              className={`flex-1 lg:flex-initial text-center lg:text-left px-3 py-2 rounded transition-all cursor-pointer flex items-center justify-center lg:justify-start gap-1.5 ${
                activeTab === "writeup" ? "bg-zinc-850 text-accent font-bold" : "text-zinc-400 hover:text-foreground"
              }`}
            >
              <BookOpen className="size-3" />
              <span>RFC Write-up</span>
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`flex-1 lg:flex-initial text-center lg:text-left px-3 py-2 rounded transition-all cursor-pointer flex items-center justify-center lg:justify-start gap-1.5 ${
                activeTab === "system" ? "bg-zinc-850 text-accent font-bold" : "text-zinc-400 hover:text-foreground"
              }`}
            >
              <GitBranch className="size-3" />
              <span>System & API Flow</span>
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`flex-1 lg:flex-initial text-center lg:text-left px-3 py-2 rounded transition-all cursor-pointer flex items-center justify-center lg:justify-start gap-1.5 ${
                activeTab === "data" ? "bg-zinc-850 text-accent font-bold" : "text-zinc-400 hover:text-foreground"
              }`}
            >
              <Database className="size-3" />
              <span>Data & AI Pipeline</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT CONTENT PANEL: Technical Details                   */}
        {/* ========================================================= */}
        <div className="lg:col-span-3">
          <DashedFrame title={`${activeProject.toUpperCase()} // DEEP_DIVE`} showLeds active>
            <div className="min-h-[460px] p-2 select-text">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProject}-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="space-y-6"
                >
                  
                  {/* ========================================================= */}
                  {/* TAB 1: RFC Write-up (Problem, Tech Decisions, Trade-offs) */}
                  {/* ========================================================= */}
                  {activeTab === "writeup" && activeProject === "cnn" && (
                    <div className="space-y-5 text-xs sm:text-[13px] leading-relaxed text-zinc-400 font-sans text-left">
                      <div className="space-y-1">
                        <h4 className="font-mono text-xs font-bold text-foreground uppercase flex items-center gap-1.5">
                          <span className="size-1.5 bg-accent rounded-full animate-pulse" />
                          The Problem Statement
                        </h4>
                        <p>
                          Processing and classifying high-frequency 1D audio waveforms in real-time presents massive constraints. Running heavy convolutional neural networks (CNNs) locally in standard browser contexts freezes the UI rendering thread. Conversely, forwarding raw floating-point audio data to traditional API servers imposes severe network payloads and costly backend idle times on server CPUs.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 border-l-2 border-dashed border-zinc-800 pl-3">
                          <h5 className="font-mono text-[10px] text-zinc-300 uppercase font-bold">Tech Decisions & Architecture</h5>
                          <p className="text-xs">
                            We selected <strong>PyTorch</strong> over TensorFlow due to its cleaner INT8 weight quantization APIs. The API gateway was built on <strong>FastAPI</strong> for native async coroutines. Model inference runs serverless on <strong>Modal serverless GPUs</strong> (NVIDIA A10G), scaling to zero within seconds to eliminate idling costs.
                          </p>
                        </div>
                        <div className="space-y-1 border-l-2 border-dashed border-zinc-800 pl-3">
                          <h5 className="font-mono text-[10px] text-accent uppercase font-bold">Engineering Challenges</h5>
                          <p className="text-xs">
                            Quantization from FP32 to INT8 caused a 6% decay in validation accuracy. Solved by running <strong>Quantization-Aware Training (QAT)</strong>. Shape mismatch issues due to varying microphone capture lengths were resolved by implementing a fixed-width window slicer and padding zero-frequency frames.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-mono text-xs font-bold text-foreground uppercase flex items-center gap-1.5">
                          <span className="size-1.5 bg-accent rounded-full animate-pulse" />
                          Trade-offs & Constraints
                        </h4>
                        <p>
                          <strong>Auto-scaling vs Cold Start Latency:</strong> Keeping GPU containers completely scale-to-zero saves budget ($0/hr when idle) but imposes a 1.8s cold start latency on the first request. We addressed this by pre-warming a single instance container whenever the client begins microphone initialization steps, hiding cold start costs entirely behind user setup times.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-dashed border-zinc-850">
                        <div className="bg-zinc-900/10 border border-dashed border-zinc-850 p-3 rounded-lg">
                          <span className="font-mono text-[9px] text-zinc-500 uppercase block mb-1">Performance Improvements</span>
                          <p className="text-xs text-zinc-300">
                            Reduced network load by 82% by transforming 1D signals to 2D spectro-grid maps on the client side, cutting server roundtrip latency to <strong>42ms</strong>.
                          </p>
                        </div>
                        <div className="bg-zinc-900/10 border border-dashed border-zinc-850 p-3 rounded-lg">
                          <span className="font-mono text-[9px] text-zinc-500 uppercase block mb-1">Lessons Learned</span>
                          <p className="text-xs text-zinc-300">
                            Avoid running audio processing blocks synchronously on the main thread; leverage Web Audio API worklets to offload heavy calculations.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "writeup" && activeProject === "saas" && (
                    <div className="space-y-5 text-xs sm:text-[13px] leading-relaxed text-zinc-400 font-sans text-left">
                      <div className="space-y-1">
                        <h4 className="font-mono text-xs font-bold text-foreground uppercase flex items-center gap-1.5">
                          <span className="size-1.5 bg-accent rounded-full animate-pulse" />
                          The Problem Statement
                        </h4>
                        <p>
                          Creating 3D models from simple 2D blueprint drawings is a slow, manual chore requiring expensive CAD software. Running server-side rendering farms (using engines like Blender) is highly expensive. Generating complete 3D declarative layouts natively on the client using generative models often leads to broken geometric structures and layout overlap conflicts.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 border-l-2 border-dashed border-zinc-800 pl-3">
                          <h5 className="font-mono text-[10px] text-zinc-300 uppercase font-bold">Tech Decisions & Architecture</h5>
                          <p className="text-xs">
                            We selected <strong>Claude 3.5 Sonnet</strong> to generate clean declarative JSON layouts because it outperforms other LLMs on complex spatial coordinate outputs. <strong>Gemini 1.5 Pro Vision</strong> parses structural drawings. We utilized <strong>Puter.js</strong> for serverless client-side sandbox hosting, saving backend infrastructure setup.
                          </p>
                        </div>
                        <div className="space-y-1 border-l-2 border-dashed border-zinc-800 pl-3">
                          <h5 className="font-mono text-[10px] text-accent uppercase font-bold">Engineering Challenges</h5>
                          <p className="text-xs">
                            LLM-generated walls had small geometric disconnect gaps. We engineered a <strong>spatial snap algorithm</strong> that snaps node vertices together within a 5-centimeter threshold. Large context sizes in raw Three.js code generations were avoided by transferring compact coordinates and leaving compile logic to a client parser.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-mono text-xs font-bold text-foreground uppercase flex items-center gap-1.5">
                          <span className="size-1.5 bg-accent rounded-full animate-pulse" />
                          Trade-offs & Constraints
                        </h4>
                        <p>
                          <strong>Client Render vs Server-Side Pre-render:</strong> Rendering dynamic rooms entirely in client WebGL (Three.js) cuts server costs ($0.00 compute bills) but increases GPU load on client mobile devices. To balance this, the model outputs optimized low-polygon wireframes that run smoothly at 60fps on mobile while loading high-resolution assets only on desktop.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-dashed border-zinc-850">
                        <div className="bg-zinc-900/10 border border-dashed border-zinc-850 p-3 rounded-lg">
                          <span className="font-mono text-[9px] text-zinc-500 uppercase block mb-1">Performance Improvements</span>
                          <p className="text-xs text-zinc-300">
                            Decreased layout generation times from 15 seconds to under <strong>5.8 seconds</strong> by swapping to declarative JSON coordinate schemas.
                          </p>
                        </div>
                        <div className="bg-zinc-900/10 border border-dashed border-zinc-850 p-3 rounded-lg">
                          <span className="font-mono text-[9px] text-zinc-500 uppercase block mb-1">Lessons Learned</span>
                          <p className="text-xs text-zinc-300">
                            Apply strict JSON schema specifications to LLM outputs to guarantee that the client Three.js compiler never crashes on unexpected syntax.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* TAB 2: System Architecture & API Flow Diagrams            */}
                  {/* ========================================================= */}
                  {activeTab === "system" && activeProject === "cnn" && (
                    <div className="space-y-4 text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Serverless API Request & Response Sequence Diagram
                      </span>
                      
                      {/* API Sequence SVG */}
                      <div className="border border-dashed border-zinc-850 bg-zinc-950/70 p-4 rounded-xl flex items-center justify-center overflow-x-auto scrollbar-none relative">
                        <svg className="w-full min-w-[500px] h-[280px] text-zinc-400" viewBox="0 0 600 280">
                          {/* HUD Blueprint Grid Background */}
                          <g className="svg-grid-bg" opacity="0.12">
                            <pattern id="diagram-grid-seq" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dashed-line)" strokeWidth="0.5" />
                            </pattern>
                            <rect width="600" height="280" fill="url(#diagram-grid-seq)" />
                          </g>

                          {/* Lifelines */}
                          <line x1="100" y1="40" x2="100" y2="250" stroke="var(--dashed-line)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="300" y1="40" x2="300" y2="250" stroke="var(--dashed-line)" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="500" y1="40" x2="500" y2="250" stroke="var(--dashed-line)" strokeWidth="1" strokeDasharray="3 3" />

                          {/* Nodes labels */}
                          <rect x="50" y="10" width="100" height="30" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="100" y="28" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">React Client</text>

                          <rect x="250" y="10" width="100" height="30" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="300" y="28" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">FastAPI Gateway</text>

                          <rect x="450" y="10" width="100" height="30" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="500" y="28" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">Modal Serverless</text>

                          {/* Message 1 */}
                          <line x1="100" y1="70" x2="295" y2="70" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow)" />
                          <text x="200" y="64" textAnchor="middle" className="font-mono text-[8px] fill-zinc-400">1. POST /classify (Binary Spectrogram)</text>

                          {/* Message 2 */}
                          <line x1="300" y1="100" x2="495" y2="100" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow)" strokeDasharray="2 2" />
                          <text x="400" y="94" textAnchor="middle" className="font-mono text-[8px] fill-accent">2. Boot GPU instance (Cold: 1.8s / Warm: 0ms)</text>

                          {/* Message 3 */}
                          <line x1="500" y1="140" x2="500" y2="180" stroke="var(--accent)" strokeWidth="1.5" />
                          <path d="M 500 180 L 515 170 L 500 160" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
                          <text x="525" y="164" textAnchor="start" className="font-mono text-[8px] fill-zinc-400">3. Evaluate FP32 Quant weights</text>

                          {/* Message 4 */}
                          <line x1="500" y1="210" x2="305" y2="210" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow)" />
                          <text x="400" y="204" textAnchor="middle" className="font-mono text-[8px] fill-zinc-400">4. Send inference response (JSON)</text>

                          {/* Message 5 */}
                          <line x1="300" y1="240" x2="105" y2="240" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow)" />
                          <text x="200" y="234" textAnchor="middle" className="font-mono text-[8px] fill-accent font-bold">5. Render prediction result (Latency: 42ms)</text>

                          {/* Definitions for arrow marker */}
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
                            </marker>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  )}

                  {activeTab === "system" && activeProject === "saas" && (
                    <div className="space-y-4 text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Serverless Architectural Component Topology Diagram
                      </span>
                      
                      {/* Component Topology SVG */}
                      <div className="border border-dashed border-zinc-850 bg-zinc-950/70 p-4 rounded-xl flex items-center justify-center overflow-x-auto scrollbar-none relative">
                        <svg className="w-full min-w-[500px] h-[280px] text-zinc-400" viewBox="0 0 600 280">
                          {/* HUD Blueprint Grid Background */}
                          <g className="svg-grid-bg" opacity="0.12">
                            <pattern id="diagram-grid-topo" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dashed-line)" strokeWidth="0.5" />
                            </pattern>
                            <rect width="600" height="280" fill="url(#diagram-grid-topo)" />
                          </g>

                          {/* Boxes */}
                          {/* Box 1 */}
                          <rect x="20" y="100" width="100" height="50" rx="6" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="70" y="125" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">React Client</text>
                          <text x="70" y="138" textAnchor="middle" className="font-sans text-[7px] fill-zinc-500">HTML5 Canvas / Three.js</text>

                          {/* Arrows */}
                          <line x1="120" y1="125" x2="165" y2="125" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow-saas)" />

                          {/* Box 2 */}
                          <rect x="170" y="70" width="110" height="110" rx="6" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="225" y="90" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">AI Gateway</text>
                          
                          <rect x="180" y="105" width="90" height="25" rx="3" fill="var(--accent-muted)" stroke="var(--accent)" strokeWidth="0.5" />
                          <text x="225" y="120" textAnchor="middle" className="font-mono text-[8px] fill-accent font-bold">Gemini 1.5 Pro</text>
                          
                          <rect x="180" y="140" width="90" height="25" rx="3" fill="var(--accent-muted)" stroke="var(--accent)" strokeWidth="0.5" />
                          <text x="225" y="155" textAnchor="middle" className="font-mono text-[8px] fill-accent font-bold">Claude 3.5</text>

                          <line x1="280" y1="125" x2="325" y2="125" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow-saas)" />

                          {/* Box 3 */}
                          <rect x="330" y="100" width="110" height="50" rx="6" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="385" y="125" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">Puter.js</text>
                          <text x="385" y="138" textAnchor="middle" className="font-sans text-[7px] fill-zinc-500">Serverless Host Sandbox</text>

                          <line x1="440" y1="125" x2="485" y2="125" stroke="var(--accent)" strokeWidth="1.5" className="svg-flow-active" markerEnd="url(#arrow-saas)" />

                          {/* Box 4 */}
                          <rect x="490" y="100" width="90" height="50" rx="6" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="535" y="125" textAnchor="middle" className="font-mono text-[9px] font-bold fill-zinc-200">Local DB</text>
                          <text x="535" y="138" textAnchor="middle" className="font-sans text-[7px] fill-zinc-500">Render History / Logs</text>

                          {/* Explanations text nodes */}
                          <text x="142" y="115" textAnchor="middle" className="font-mono text-[7px] fill-zinc-400">PNG Upload</text>
                          <text x="302" y="115" textAnchor="middle" className="font-mono text-[7px] fill-zinc-400">JSON Graph</text>
                          <text x="462" y="115" textAnchor="middle" className="font-mono text-[7px] fill-zinc-400">Save Render</text>

                          <defs>
                            <marker id="arrow-saas" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
                            </marker>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* TAB 3: Data Schema & AI Pipeline Diagrams                 */}
                  {/* ========================================================= */}
                  {activeTab === "data" && activeProject === "cnn" && (
                    <div className="space-y-4 text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        AI Inference Pre-processing & Waveform Transform Pipeline
                      </span>
                      
                      {/* Inference Flow SVG */}
                      <div className="border border-dashed border-zinc-850 bg-zinc-950/70 p-4 rounded-xl flex items-center justify-center overflow-x-auto scrollbar-none relative">
                        <svg className="w-full min-w-[500px] h-[280px] text-zinc-400" viewBox="0 0 600 280">
                          {/* HUD Blueprint Grid Background */}
                          <g className="svg-grid-bg" opacity="0.12">
                            <pattern id="diagram-grid-data-cnn" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dashed-line)" strokeWidth="0.5" />
                            </pattern>
                            <rect width="600" height="280" fill="url(#diagram-grid-data-cnn)" />
                          </g>

                          {/* Flow Pipeline */}
                          {/* Node 1 */}
                          <rect x="20" y="110" width="90" height="40" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="65" y="130" textAnchor="middle" className="font-mono text-[8.5px] font-bold fill-zinc-200">1D Waveform</text>
                          <text x="65" y="142" textAnchor="middle" className="font-mono text-[7px] fill-zinc-500">[16000 float32]</text>

                          <line x1="110" y1="130" x2="140" y2="130" stroke="var(--accent)" strokeWidth="1.2" className="svg-flow-active" markerEnd="url(#arrow-data)" />

                          {/* Node 2 */}
                          <rect x="140" y="110" width="90" height="40" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="185" y="130" textAnchor="middle" className="font-mono text-[8.5px] font-bold fill-zinc-200">STFT Transform</text>
                          <text x="185" y="142" textAnchor="middle" className="font-mono text-[7px] fill-zinc-500">[Fourier Spect]</text>

                          <line x1="230" y1="130" x2="260" y2="130" stroke="var(--accent)" strokeWidth="1.2" className="svg-flow-active" markerEnd="url(#arrow-data)" />

                          {/* Node 3 */}
                          <rect x="260" y="110" width="90" height="40" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="305" y="130" textAnchor="middle" className="font-mono text-[8.5px] font-bold fill-zinc-200">Mel-Filterbank</text>
                          <text x="305" y="142" textAnchor="middle" className="font-mono text-[7px] fill-zinc-500">[Map to human ear]</text>

                          <line x1="350" y1="130" x2="380" y2="130" stroke="var(--accent)" strokeWidth="1.2" className="svg-flow-active" markerEnd="url(#arrow-data)" />

                          {/* Node 4 */}
                          <rect x="380" y="110" width="90" height="40" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="425" y="130" textAnchor="middle" className="font-mono text-[8.5px] font-bold fill-zinc-200">ResNet Conv Pools</text>
                          <text x="425" y="142" textAnchor="middle" className="font-mono text-[7px] fill-zinc-500">[Feature Extract]</text>

                          <line x1="470" y1="130" x2="500" y2="130" stroke="var(--accent)" strokeWidth="1.2" className="svg-flow-active" markerEnd="url(#arrow-data)" />

                          {/* Node 5 */}
                          <rect x="500" y="110" width="80" height="40" rx="4" fill="var(--card-bg)" stroke="var(--accent)" className="svg-glow-node" />
                          <text x="540" y="130" textAnchor="middle" className="font-mono text-[8.5px] font-bold fill-accent">Softmax Output</text>
                          <text x="540" y="142" textAnchor="middle" className="font-mono text-[7px] fill-zinc-500">[Probabilities]</text>

                          <defs>
                            <marker id="arrow-data" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
                            </marker>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  )}

                  {activeTab === "data" && activeProject === "saas" && (
                    <div className="space-y-4 text-left">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        System Database Entity Relationship Diagram (ERD Schema)
                      </span>
                      
                      {/* ERD SVG */}
                      <div className="border border-dashed border-zinc-850 bg-zinc-950/70 p-4 rounded-xl flex items-center justify-center overflow-x-auto scrollbar-none relative">
                        <svg className="w-full min-w-[500px] h-[340px] text-zinc-400" viewBox="0 0 600 340">
                          {/* HUD Blueprint Grid Background */}
                          <g className="svg-grid-bg" opacity="0.12">
                            <pattern id="diagram-grid-data-saas" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--dashed-line)" strokeWidth="0.5" />
                            </pattern>
                            <rect width="600" height="340" fill="url(#diagram-grid-data-saas)" />
                          </g>

                          {/* Table: Users */}
                          <rect x="20" y="20" width="150" height="90" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="30" y="40" className="font-mono text-[9px] font-bold fill-zinc-200">USERS TABLE</text>
                          <line x1="20" y1="48" x2="170" y2="48" stroke="var(--card-border)" />
                          <text x="30" y="65" className="font-mono text-[8px] fill-zinc-400">id : UUID (PK)</text>
                          <text x="30" y="80" className="font-mono text-[8px] fill-zinc-500">email : VARCHAR</text>
                          <text x="30" y="95" className="font-mono text-[8px] fill-zinc-500">created_at : TIMESTAMP</text>

                          {/* Table: Blueprints */}
                          <rect x="260" y="20" width="160" height="110" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="270" y="40" className="font-mono text-[9px] font-bold fill-zinc-200">BLUEPRINTS TABLE</text>
                          <line x1="260" y1="48" x2="420" y2="48" stroke="var(--card-border)" />
                          <text x="270" y="65" className="font-mono text-[8px] fill-zinc-400">id : UUID (PK)</text>
                          <text x="270" y="80" className="font-mono text-[8px] fill-accent">user_id : UUID (FK)</text>
                          <text x="270" y="95" className="font-mono text-[8px] fill-zinc-500">img_url : VARCHAR</text>
                          <text x="270" y="110" className="font-mono text-[8px] fill-zinc-500">coordinates_json : TEXT</text>

                          {/* Table: Three Renders */}
                          <rect x="260" y="200" width="160" height="110" rx="4" fill="var(--card-bg)" stroke="var(--card-border)" className="svg-glow-node" />
                          <text x="270" y="220" className="font-mono text-[9px] font-bold fill-zinc-200">THREE_RENDERS TABLE</text>
                          <line x1="260" y1="228" x2="420" y2="228" stroke="var(--card-border)" />
                          <text x="270" y="245" className="font-mono text-[8px] fill-zinc-400">id : UUID (PK)</text>
                          <text x="270" y="260" className="font-mono text-[8px] fill-accent">blueprint_id : UUID (FK)</text>
                          <text x="270" y="275" className="font-mono text-[8px] fill-zinc-500">code_syntax : TEXT</text>
                          <text x="270" y="290" className="font-mono text-[8px] fill-zinc-500">render_settings : TEXT</text>

                          {/* Relationships Connector Lines */}
                          {/* Users (1) -> Blueprints (N) */}
                          <line x1="170" y1="65" x2="260" y2="65" stroke="var(--accent)" strokeWidth="1.2" className="svg-flow-active" />
                          <text x="180" y="60" className="font-mono text-[8px] fill-accent font-bold">1</text>
                          <text x="245" y="60" className="font-mono text-[8px] fill-accent font-bold">N</text>

                          {/* Blueprints (1) -> Three Renders (N) */}
                          <line x1="340" y1="130" x2="340" y2="200" stroke="var(--accent)" strokeWidth="1.2" className="svg-flow-active" />
                          <text x="330" y="145" className="font-mono text-[8px] fill-accent font-bold">1</text>
                          <text x="330" y="190" className="font-mono text-[8px] fill-accent font-bold">N</text>
                        </svg>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </DashedFrame>
        </div>

      </div>
    </div>
  );
}
