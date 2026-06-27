"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardSpotlight } from "@/components/UI/CardSpotlight";
import { User, Sparkles, GraduationCap, Terminal, ShieldCheck, Cpu, Code2, Globe } from "lucide-react";

export function AboutMe() {
  const [activeTab, setActiveTab] = useState<"story" | "superpowers" | "academic">("story");

  const tabs = [
    { id: "story", label: "Story.log", icon: Sparkles },
    { id: "superpowers", label: "Superpowers", icon: Terminal },
    { id: "academic", label: "Academic.log", icon: GraduationCap }
  ];

  return (
    <div id="aboutme" className="w-full max-w-5xl mx-auto px-6 py-16 relative select-none z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs mb-8 pb-3 border-b border-dashed border-zinc-800/80">
        <User className="size-3.5 text-accent animate-pulse" />
        <span>About.Me / Story.Log</span>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Column: Cyber Profile Card (1/3) */}
        <div className="md:col-span-1">
          <CardSpotlight className="h-full p-5 border border-dashed border-zinc-850 bg-card/25 backdrop-blur-xl rounded-xl flex flex-col justify-between select-none relative overflow-hidden group">
            {/* Ambient background glow inside the card */}
            <div className="absolute -top-12 -left-12 size-24 bg-accent/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              {/* Profile Image & Avatar */}
              <div className="relative size-28 mx-auto rounded-lg overflow-hidden border border-dashed border-zinc-800 bg-zinc-900/50 p-1 group-hover:border-accent/40 transition-colors">
                <img
                  src="/avatar.png"
                  alt="Pawan Kumar Cyber Avatar"
                  className="w-full h-full object-cover rounded opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Identity & Status */}
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold tracking-tight text-foreground font-sans">
                  Pawan Kumar
                </h4>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[9px] font-mono text-emerald-400 font-semibold uppercase">
                  <span className="size-1 bg-emerald-400 rounded-full animate-ping" />
                  <span>SYS_ONLINE</span>
                </div>
              </div>

              {/* Hardware / Telemetry logs readout */}
              <div className="border border-dashed border-zinc-900 bg-zinc-950/40 rounded p-3 font-mono text-[9px] space-y-2 text-zinc-400">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500">CLASS:</span>
                  <span className="font-semibold text-zinc-300">DEVELOPER_III</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-zinc-950/60 pt-1.5">
                  <span className="text-zinc-500">SPECIALIZATION:</span>
                  <span className="font-semibold text-zinc-300">FULLSTACK_AI</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-zinc-950/60 pt-1.5">
                  <span className="text-zinc-500">SYSTEM_KERNEL:</span>
                  <span className="font-semibold text-zinc-300">WIN_11_X64</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-zinc-950/60 pt-1.5">
                  <span className="text-zinc-500">ACTIVE_PORT:</span>
                  <span className="font-semibold text-accent font-bold">PORT:3000</span>
                </div>
              </div>
            </div>

            {/* Bottom status line */}
            <div className="mt-4 pt-3 border-t border-dashed border-zinc-900 font-mono text-[8px] text-zinc-500 flex justify-between items-center">
              <span>LOC: MUMBAI, IN</span>
              <span>EST. 2022</span>
            </div>
          </CardSpotlight>
        </div>

        {/* Right Column: Tabbed Dossier Panel (2/3) */}
        <div className="md:col-span-2 border border-dashed border-zinc-800/80 bg-zinc-950/30 rounded-xl p-5 flex flex-col justify-between min-h-[380px] shadow-[inset_0_12px_24px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-20" />
          
          <div className="space-y-6 relative z-10 w-full">
            {/* Dossier Tabs HUD navigation */}
            <div className="flex border border-dashed border-zinc-900 p-1 rounded-lg bg-zinc-950/50 self-start gap-1 font-mono text-[10px] max-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded relative capitalize transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? "text-accent font-semibold"
                        : "text-zinc-400 hover:text-foreground"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-accent/15 border border-accent/20 rounded-md -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="size-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab content wrapper with smooth transition */}
            <div className="min-h-[220px]">
              <AnimatePresence mode="wait">
                {activeTab === "story" && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h5 className="text-sm font-bold text-zinc-200 font-sans tracking-tight flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-accent" />
                      Engineering Journey
                    </h5>
                    <div className="space-y-3 font-sans text-xs text-zinc-400 leading-relaxed max-w-xl">
                      <p>
                        I am a <strong className="text-zinc-200">Computer Science & Engineering student</strong> driven by a passion to engineer production-ready software architectures and scale AI systems.
                      </p>
                      <p>
                        Currently working as a <strong className="text-accent">Software Developer Intern at NexisWorx</strong>, where I take charge of Laravel backend pipelines, building multi-tenant user authentication layers, secure admin consoles, and optimizing MySQL database relationships.
                      </p>
                      <p>
                        Beyond regular internships, I specialize in building serverless GPU pipelines using <strong className="text-zinc-200">Modal</strong>, training custom audio classifier CNNs in <strong className="text-zinc-200">PyTorch</strong>, and implementing interactive 3D SaaS products (React, TypeScript, Puter.js).
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "superpowers" && (
                  <motion.div
                    key="superpowers"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3.5"
                  >
                    <h5 className="text-sm font-bold text-zinc-200 font-sans tracking-tight flex items-center gap-1.5">
                      <Terminal className="size-3.5 text-accent" />
                      Core Superpowers
                    </h5>
                    
                    {/* Superpower list with animated progress meters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <SuperpowerRow
                        name="Full-Stack Engineering"
                        description="Structuring scalable MVC modules, Eloquent ORMs, middleware, and Next.js React layouts."
                        percentage={92}
                        color="#60a5fa"
                      />
                      <SuperpowerRow
                        name="AI & ML Pipelines"
                        description="Training image/audio CNN models with PyTorch and hosting serverless GPU inference routines."
                        percentage={85}
                        color="#fb923c"
                      />
                      <SuperpowerRow
                        name="Interface & Animation UX"
                        description="Designing high-fidelity animated states with Framer Motion, GSAP, and Tailwind grids."
                        percentage={90}
                        color="#22d3ee"
                      />
                      <SuperpowerRow
                        name="Database & Systems"
                        description="Developing optimized schemas, transactional ACID configurations, and redis caching routines."
                        percentage={88}
                        color="#34d399"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === "academic" && (
                  <motion.div
                    key="academic"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <h5 className="text-sm font-bold text-zinc-200 font-sans tracking-tight flex items-center gap-1.5">
                      <GraduationCap className="size-3.5 text-accent" />
                      Academic & Compilation Logs
                    </h5>
                    
                    {/* Circular gauges layout */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <CircularProgress
                        value={8.34}
                        max={10}
                        label="Academic CGPA"
                        color="#a855f7"
                      />
                      <CircularProgress
                        value={4}
                        max={6}
                        label="Intern Months"
                        color="#10b981"
                      />
                      <CircularProgress
                        value={10}
                        max={15}
                        label="Projects Built"
                        color="#3b82f6"
                      />
                      <CircularProgress
                        value={20}
                        max={30}
                        label="Active Stack"
                        color="#f59e0b"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom telemetry logs */}
          <div className="mt-4 pt-3 border-t border-dashed border-zinc-900/60 font-mono text-[9px] text-zinc-500 flex justify-between items-center relative z-10">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3 text-emerald-400" /> SECURE DOSSIER READOUT: ACTIVE
            </span>
            <span className="hidden sm:inline">tap_tabs_to_query_system_nodes</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponents helper - Superpower skill progress row
function SuperpowerRow({ name, description, percentage, color }: { name: string; description: string; percentage: number; color: string }) {
  return (
    <div className="space-y-1.5 border border-dashed border-zinc-900 p-2.5 rounded-lg bg-zinc-950/20 select-none">
      <div className="flex justify-between items-center text-[10px] font-mono">
        <span className="font-bold text-zinc-300">{name}</span>
        <span className="font-bold" style={{ color }}>{percentage}%</span>
      </div>
      <p className="text-[9px] text-zinc-550 leading-relaxed font-sans line-clamp-2">{description}</p>
      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-950/80">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// Subcomponents helper - Animated Circular Gauge
function CircularProgress({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const percentage = (value / max) * 100;
  const radius = 24;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 p-3.5 border border-dashed border-zinc-900 rounded-lg bg-zinc-950/40 w-full">
      <div className="relative size-14 flex items-center justify-center">
        <svg className="size-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            className="stroke-zinc-900 fill-none"
            strokeWidth={strokeWidth}
          />
          {/* Animated Foreground circle */}
          <motion.circle
            cx="28"
            cy="28"
            r={radius}
            className="fill-none"
            style={{ stroke: color }}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[11px] font-bold font-mono text-zinc-200">{value}</span>
      </div>
      <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider text-center">{label}</span>
    </div>
  );
}

