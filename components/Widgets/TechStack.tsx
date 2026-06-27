"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Database, Network, ShieldCheck, Sparkles } from "lucide-react";

// Tech stack data structure
interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "ai";
  desc: string;
  confidence: string;
  latency: string;
  version: string;
  color: string; // Tailwind accent border/text
  accentHex: string; // RGB/Hex for canvas line drawing
}

const TECH_ITEMS: TechItem[] = [
  // Frontend
  {
    id: "react",
    name: "React",
    category: "frontend",
    desc: "Component-based UI architecture with declarative virtual DOM state synchronizations.",
    confidence: "95%",
    latency: "0.8ms",
    version: "v19.0.0",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    accentHex: "#22d3ee"
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    desc: "Production-ready meta-framework offering hybrid static generation and server-side rendering routes.",
    confidence: "90%",
    latency: "1.4ms",
    version: "v15.1.0",
    color: "text-zinc-100 border-zinc-700 bg-zinc-800/20",
    accentHex: "#f4f4f5"
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    desc: "Strict type-safe javascript compiler eliminating kernel errors at design time.",
    confidence: "95%",
    latency: "0.4ms",
    version: "v5.6",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    accentHex: "#60a5fa"
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    desc: "Atomic, utility-first styling engine optimizing visual assets and design systems.",
    confidence: "95%",
    latency: "0.2ms",
    version: "v4.0.0",
    color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    accentHex: "#38bdf8"
  },
  {
    id: "framer",
    name: "Framer Motion",
    category: "frontend",
    desc: "Production-ready animation library enabling layout transitions and spring physics.",
    confidence: "88%",
    latency: "0.6ms",
    version: "v11.x",
    color: "text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10",
    accentHex: "#e879f9"
  },
  // Backend
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    desc: "Event-driven asynchronous V8 engine for running fast, high-concurrency javascript threads.",
    confidence: "90%",
    latency: "1.1ms",
    version: "v22.x",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    accentHex: "#34d399"
  },
  {
    id: "express",
    name: "Express",
    category: "backend",
    desc: "Minimalist server kernel for designing REST controllers, routing logs, and middleware stacks.",
    confidence: "88%",
    latency: "1.5ms",
    version: "v4.21",
    color: "text-neutral-400 border-neutral-500/30 bg-neutral-500/10",
    accentHex: "#a3a3a3"
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "backend",
    desc: "Robust PHP framework featuring Eloquent ORM schemas, validation middleware, and auth architectures.",
    confidence: "92%",
    latency: "3.2ms",
    version: "v11.x",
    color: "text-red-400 border-red-500/30 bg-red-500/10",
    accentHex: "#f87171"
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    desc: "High-performance Python API framework utilizing modern Pydantic classes and type notations.",
    confidence: "85%",
    latency: "1.6ms",
    version: "v0.115",
    color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    accentHex: "#2dd4bf"
  },
  {
    id: "docker",
    name: "Docker",
    category: "backend",
    desc: "Containerization engine isolating application microservices and backend clustering nodes.",
    confidence: "86%",
    latency: "1.2ms",
    version: "v27.x",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    accentHex: "#60a5fa"
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "backend",
    desc: "Distributed version control managing code branches and automation action workflows.",
    confidence: "90%",
    latency: "0.5ms",
    version: "v2.45",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    accentHex: "#fb923c"
  },
  // Databases
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "database",
    desc: "Relational database server offering ACID compliance, custom indexing, and optimized JSON queries.",
    confidence: "90%",
    latency: "2.1ms",
    version: "v16.2",
    color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    accentHex: "#818cf8"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "database",
    desc: "Document store for structured BSON objects, scale-out sharding, and flexible indexes.",
    confidence: "88%",
    latency: "1.9ms",
    version: "v7.0",
    color: "text-green-400 border-green-500/30 bg-green-500/10",
    accentHex: "#4ade80"
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "database",
    desc: "Reliable and fast relational database suited for transaction-intensive records.",
    confidence: "85%",
    latency: "2.4ms",
    version: "v8.0",
    color: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    accentHex: "#f59e0b"
  },
  {
    id: "redis",
    name: "Redis",
    category: "database",
    desc: "Ultra-low latency in-memory key-value data store for rapid backend session cache locks.",
    confidence: "88%",
    latency: "0.9ms",
    version: "v7.4",
    color: "text-red-400 border-red-500/30 bg-red-500/10",
    accentHex: "#f87171"
  },
  {
    id: "prisma",
    name: "Prisma",
    category: "database",
    desc: "Type-safe database ORM Client for building declarative SQL relational schemas.",
    confidence: "92%",
    latency: "1.3ms",
    version: "v6.x",
    color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    accentHex: "#2dd4bf"
  },
  // AI
  {
    id: "pytorch",
    name: "PyTorch",
    category: "ai",
    desc: "Machine learning library providing tensor calculations and automated differentiation models.",
    confidence: "80%",
    latency: "4.5ms",
    version: "v2.3",
    color: "text-orange-400 border-orange-500/30 bg-orange-500/10",
    accentHex: "#fb923c"
  },
  {
    id: "cnn",
    name: "CNN",
    category: "ai",
    desc: "Deep learning models specialized in spatial pattern analysis and visual classification networks.",
    confidence: "85%",
    latency: "6.2ms",
    version: "Custom",
    color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    accentHex: "#f43f5e"
  },
  {
    id: "modal",
    name: "Modal",
    category: "ai",
    desc: "Serverless runtime engine for running high-volume GPU calculations and LLM fine-tuning schedules.",
    confidence: "82%",
    latency: "2.8ms",
    version: "Active",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    accentHex: "#c084fc"
  },
  {
    id: "gemini",
    name: "Gemini API",
    category: "ai",
    desc: "Advanced LLM APIs (Gemini 2.5 Pro/Flash) for multimodal analysis, reasoning, and tool call routing.",
    confidence: "85%",
    latency: "1.8ms",
    version: "SDK v2.5",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    accentHex: "#fbbf24"
  }
];

// Inline custom tech SVGs for visual beauty
const getTechIcon = (id: string) => {
  switch (id) {
    case "react":
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" className="size-6 fill-none stroke-current" strokeWidth="1.2">
          <circle cx="0" cy="0" r="2.05" className="fill-current" />
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 128 128" className="size-5 fill-current">
          <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm31.7 93L53 43.7V89H43V39h9.7l42.6 49.3V39h10v54h-9.6z" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 128 128" className="size-5 fill-current">
          <path d="M0 0h128v128H0z" />
          <path fill="#fff" d="M106.9 83c-1.3-2.3-3.6-3.8-6.9-4.8-3.3-1-7.1-1.7-11.4-2.1-4.2-.4-7.5-.9-9.8-1.5-2.2-.6-3.7-1.4-4.5-2.4-1.2-1.5-1.8-3.4-1.8-5.8 0-2.6.9-4.6 2.8-6.1s4.6-2.2 8.1-2.2c3.4 0 6.1.8 8.1 2.5 2 1.7 3.2 4.2 3.7 7.7l10.8-1.5c-.8-6-3.3-10.4-7.6-13.4-4.3-3-9.9-4.4-16.7-4.4-7 0-12.7 1.8-16.8 5.3-4.1 3.5-6.2 8.3-6.2 14.2 0 4.8 1.1 8.7 3.3 11.6s6 5.1 11.4 6.8c5.4 1.7 10.3 2.8 14.8 3.4 4.5.6 7.6 1.3 9.4 2.1 1.8.8 3 1.8 3.7 3.1.6 1.3 1 2.9 1 4.7 0 2.9-1.1 5.2-3.3 6.9-2.2 1.7-5.3 2.5-9.3 2.5-4.2 0-7.5-.9-9.9-2.7-2.4-1.8-3.9-4.6-4.5-8.4l-11 1.7c1 6.5 3.9 11.4 8.7 14.7 4.8 3.3 11.1 4.9 19.1 4.9 7.6 0 13.7-1.8 18.2-5.4s6.7-8.6 6.7-15c0-4.8-1-8.7-3.1-11.6zM22.8 41h11.2v67H22.8zM12.2 30h32.5v11H12.2z" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 128 128" className="size-5 fill-current">
          <path d="M64 26C42.8 26 31 36.6 28.5 57.8c7.4-8.5 16-11.6 25.9-9.5 5.6 1.2 9.6 4.1 14.1 7.3 7.2 5.2 15.6 11.4 31 11.4 21.2 0 33-10.6 35.5-31.8-7.4 8.5-16 11.6-25.9 9.5-5.6-1.2-9.6-4.1-14.1-7.3-7.2-5.2-15.6-11.4-31-11.4zM28.5 70.4c-21.2 0-33 10.6-35.5 31.8 7.4-8.5 16-11.6 25.9-9.5 5.6 1.2 9.6 4.1 14.1 7.3 7.2 5.2 15.6 11.4 31 11.4 21.2 0 33-10.6 35.5-31.8-7.4 8.5-16 11.6-25.9 9.5-5.6-1.2-9.6-4.1-14.1-7.3-7.2-5.2-15.6-11.4-31-11.4z" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2Z" />
          <path d="m12 22 10-5" />
          <path d="M12 2v10" />
          <path d="m12 12 10-5" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M7 8h10M7 12h5" />
        </svg>
      );
    case "laravel":
      return (
        <svg viewBox="0 0 128 128" className="size-5 fill-current">
          <path d="M121.7 20.3L64 8.2 6.3 20.3v87.4L64 119.8l57.7-12.1V20.3zM64 110.2L16.3 99.8V28.7L64 38.6v71.6zm47.7-10.4L64 110.2V38.6l47.7-9.9v71.1z" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="6" height="6" rx="1" />
          <rect x="9" y="2" width="6" height="6" rx="1" />
          <rect x="16" y="2" width="6" height="6" rx="1" />
          <rect x="2" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
          <rect x="16" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="16" width="6" height="6" rx="1" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <path d="M18 9v2a4 4 0 0 1-4 4h-3M6 9v9" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <line x1="22" y1="12" x2="2" y2="12" />
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <path d="M3 8l9-4 9 4-9 4-9-4z" />
          <path d="M3 13l9 4 9-4M3 18l9 4 9-4" />
        </svg>
      );
    case "prisma":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <polygon points="12 2 22 17 2 17 12 2" />
          <line x1="12" y1="2" x2="12" y2="17" />
        </svg>
      );
    case "pytorch":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 1.5 2 2.5 3.5 3 2.5 1 4.5 3.5 4.5 6a5.5 5.5 0 0 1-11 0c0-1.5.5-3 2-4.5" />
        </svg>
      );
    case "cnn":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
          <circle cx="20" cy="12" r="2" />
          <line x1="6" y1="12" x2="10" y2="5" />
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="6" y1="12" x2="10" y2="19" />
          <line x1="14" y1="5" x2="18" y2="12" />
          <line x1="14" y1="12" x2="18" y2="12" />
          <line x1="14" y1="19" x2="18" y2="12" />
        </svg>
      );
    case "modal":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <line x1="12" y1="12" x2="22" y2="8.5" />
          <line x1="12" y1="12" x2="2" y2="8.5" />
        </svg>
      );
    case "framer":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3h14v8H5l7 7v6l7-7H5" />
        </svg>
      );
    case "gemini":
      return (
        <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
      );
    default:
      return <Cpu className="size-5" />;
  }
};

export function TechStack() {
  // States
  const [activeFilter, setActiveFilter] = useState<"all" | "frontend" | "backend" | "database" | "ai">("all");
  const [selectedNode, setSelectedNode] = useState<TechItem | null>(null);
  const [hoveredNode, setHoveredNode] = useState<TechItem | null>(null);

  const activeItem = hoveredNode || selectedNode || TECH_ITEMS[0];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "frontend":
        return { label: "FRONTEND", dotColor: "bg-cyan-400" };
      case "backend":
        return { label: "BACKEND", dotColor: "bg-emerald-400" };
      case "database":
        return { label: "DATABASE", dotColor: "bg-indigo-400" };
      case "ai":
        return { label: "AI & ML", dotColor: "bg-orange-400" };
      default:
        return { label: "UNKNOWN", dotColor: "bg-zinc-400" };
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-8 text-left relative z-10 select-none">
      {/* Header & Filter HUD Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-3 border-b border-dashed border-zinc-800/80">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono mb-1">
            <Network className="size-3 text-accent animate-pulse" />
            <span>Stack.Visualizer / Core.Components</span>
          </div>
          <h3 className="text-lg font-bold tracking-tight text-foreground font-sans">
            Interactive Tech Console
          </h3>
        </div>

        {/* Filter controls HUD */}
        <div className="flex flex-wrap items-center border border-dashed border-zinc-850 p-1 rounded-lg bg-zinc-900/10 backdrop-blur-sm self-start gap-0.5 font-mono text-[9px]">
          {(["all", "frontend", "backend", "database", "ai"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                // Clear selected if it doesn't belong to the active category
                if (filter !== "all" && selectedNode && selectedNode.category !== filter) {
                  setSelectedNode(null);
                }
              }}
              className={`px-2.5 py-1 rounded capitalize transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-accent/15 text-accent font-semibold border border-accent/20"
                  : "text-zinc-400 hover:text-foreground border border-transparent"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Console Box - Grid: Left (all skills), Right (sidebar detail) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        
        {/* Left 2 Columns: Skills Matrix */}
        <div className="md:col-span-2 border border-dashed border-zinc-800/80 bg-zinc-950/40 rounded-xl p-4 flex flex-col justify-between min-h-[220px] relative overflow-hidden shadow-[inset_0_12px_24px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-30" />
          
          {/* Dashboard Matrix Grid - 3 cols mobile, 4 sm, 5 lg */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-1.5 relative z-10">
            {TECH_ITEMS.map((item) => {
              const isFiltered = activeFilter === "all" || item.category === activeFilter;
              const isSelected = selectedNode?.id === item.id;
              const isHovered = hoveredNode?.id === item.id;
              const isActive = isSelected || isHovered;
              
              const getLedColor = (cat: string) => {
                switch (cat) {
                  case "frontend": return "bg-cyan-400";
                  case "backend": return "bg-emerald-400";
                  case "database": return "bg-indigo-400";
                  case "ai": return "bg-orange-400";
                  default: return "bg-zinc-500";
                }
              };

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedNode(item)}
                  onMouseEnter={() => setHoveredNode(item)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    borderColor: isActive ? item.accentHex : undefined,
                    boxShadow: isActive ? `0 0 10px ${item.accentHex}12` : undefined,
                    color: isActive ? item.accentHex : undefined
                  }}
                  className={`p-1.5 border border-dashed rounded-lg text-left transition-all duration-200 cursor-pointer flex items-center justify-between h-[42px] sm:h-[46px] relative group select-none ${
                    isFiltered 
                      ? "bg-zinc-900/10 border-zinc-850 text-zinc-400 hover:bg-zinc-900/30" 
                      : "bg-zinc-950/5 border-zinc-900/40 text-zinc-650 opacity-20"
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {/* Icon wrapper */}
                    <span className={`p-1 bg-zinc-900/40 border border-zinc-850 rounded text-[9px] flex items-center justify-center shrink-0 ${
                      isActive ? "bg-accent/5" : ""
                    }`}>
                      {getTechIcon(item.id)}
                    </span>
                    
                    {/* Name + Version Stack */}
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[10px] sm:text-[11px] font-bold font-sans tracking-tight leading-tight group-hover:translate-x-0.5 transition-transform truncate">
                        {item.name}
                      </span>
                      <span className="text-[7.5px] font-mono text-zinc-500 leading-none truncate hidden sm:block">
                        {item.version}
                      </span>
                    </div>
                  </div>
                  
                  {/* Led Status Dot */}
                  <span className="flex h-1.5 w-1.5 relative shrink-0 ml-1">
                    {isActive && (
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${getLedColor(item.category)} opacity-75`} />
                    )}
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getLedColor(item.category)}`} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom status line */}
          <div className="mt-4 pt-2.5 border-t border-dashed border-zinc-900/60 font-mono text-[9px] text-zinc-500 flex justify-between items-center relative z-10">
            <span>SYS_NODES_ACTIVE: {TECH_ITEMS.filter(t => activeFilter === "all" || t.category === activeFilter).length}/{TECH_ITEMS.length}</span>
            <span className="hidden sm:inline">tap_tile_to_query_hardware_stats</span>
          </div>
        </div>

        {/* Right 1 Column: Metadata Diagnostics Sidebar */}
        <div className="border border-dashed border-zinc-850 bg-card/15 backdrop-blur-xl p-4 rounded-xl flex flex-col justify-between text-left shadow-2xl">
          <div className="space-y-3">
            
            {/* Sidebar Title */}
            <div className="flex items-center gap-2 border-b border-dashed border-zinc-850/80 pb-2">
              <Terminal className="size-3.5 text-accent animate-pulse" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                Diag.Metadata
              </span>
            </div>

            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3.5 font-mono text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`size-1.5 rounded-full ${
                        activeItem.category === "frontend" ? "bg-cyan-400" :
                        activeItem.category === "backend" ? "bg-emerald-400" :
                        activeItem.category === "database" ? "bg-indigo-400" : "bg-orange-400"
                      }`} />
                      <span className="text-[8.5px] text-zinc-500 font-bold uppercase tracking-widest">
                        {activeItem.category}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-foreground mt-0.5 flex items-center gap-1.5 font-sans">
                      {activeItem.name}
                      <span className="text-[8px] font-mono border border-zinc-800 bg-zinc-900/50 px-1 rounded text-zinc-400">
                        {activeItem.version}
                      </span>
                    </h4>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans min-h-[44px] line-clamp-3 py-1 border-y border-dashed border-zinc-900/30">
                    {activeItem.desc}
                  </p>

                  {/* Cyber diagnostics readings */}
                  <div className="border border-dashed border-zinc-850 rounded p-2.5 bg-zinc-900/10 space-y-1.5 text-[9.5px]">
                    <div className="flex items-center justify-between text-zinc-455">
                      <span>SYS_STATUS:</span>
                      <span className="text-accent flex items-center gap-1 font-bold">
                        <ShieldCheck className="size-3" /> ONLINE
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-455">
                      <span>LATENCY:</span>
                      <span className="text-zinc-200 font-semibold">{activeItem.latency}</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-455">
                      <span>COMPILER_LOAD:</span>
                      <span className="text-zinc-200 font-semibold">STABLE</span>
                    </div>
                  </div>

                  {/* Stability Progress bar visualizer */}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between text-[8.5px] text-zinc-500">
                      <span>COMPILER_STABILITY</span>
                      <span className="text-accent font-semibold">{activeItem.confidence}</span>
                    </div>
                    <div className="h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: activeItem.confidence }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full bg-accent"
                        style={{ width: activeItem.confidence, backgroundColor: activeItem.accentHex }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="py-6 text-center text-zinc-500 font-sans text-xs">
                  Select a skill tile to inspect telemetry parameters.
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom stats readout */}
          <div className="border-t border-dashed border-zinc-850/80 pt-3 font-mono text-[9px] text-zinc-650 flex items-center justify-between">
            <span>SYS_CLUSTER: stable</span>
            <span>MUMBAI-AWS</span>
          </div>
        </div>

      </div>
    </div>
  );
}
