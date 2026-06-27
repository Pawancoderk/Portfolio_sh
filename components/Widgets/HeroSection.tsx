"use client";

import React from "react";
import { Mail, Sparkles, FileText, FolderGit2, ArrowRight, Cpu, Layers, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/UI/CardSpotlight";
import { MagneticButton } from "@/components/UI/MagneticButton";
import { TextScramble } from "@/components/UI/TextScramble";
import { TiltCard } from "@/components/UI/TiltCard";
import { DevStudio } from "./DevStudio";

// Custom SVG GithubIcon to match lucide standard style
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom SVG LinkedinIcon to match lucide standard style
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// CNN features grid animator
function CnnVisualizer() {
  return (
    <div className="grid grid-cols-6 gap-0.5 size-11 bg-zinc-950/60 p-1 border border-zinc-900 rounded shrink-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div
          key={i}
          className="size-1 rounded-[0.5px]"
          animate={{
            opacity: [0.2, 1.0, 0.2],
            backgroundColor: i % 3 === 0 ? "#818cf8" : i % 2 === 0 ? "#6366f1" : "#4f46e5"
          }}
          transition={{
            duration: 1.2 + (i % 4) * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// 3D wireframe house schematic builder animator
function SchematicVisualizer() {
  return (
    <div className="relative size-11 bg-zinc-950/60 border border-zinc-900 rounded flex items-center justify-center shrink-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
      <svg viewBox="0 0 24 24" className="size-6 stroke-accent fill-none" strokeWidth="1.2">
        <motion.path
          d="M12 2L4 6L12 10L20 6L12 2Z M4 6V14L12 18V10 M20 6V14L12 18"
          animate={{
            strokeDasharray: ["0, 40", "40, 0", "0, 40"],
            opacity: [0.4, 1.0, 0.4]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

interface HeroSectionProps {
  onViewProjectsClick: () => void;
}

export function HeroSection({ onViewProjectsClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[82vh] w-full flex items-center justify-center py-10 md:py-20 select-none z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* LEFT COLUMN: Narrative & Intros */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start text-left space-y-7"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-[10px] font-mono font-bold tracking-wider text-accent uppercase select-none transition-all duration-300 hover:bg-accent/10 hover:border-accent/40 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--accent)_25%,transparent)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>NexisWorx Software Developer Intern</span>
          </div>

          {/* Heading with metallic gradient scramble typography */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] pb-1">
              <TextScramble
                text="Pawan Kumar"
                fontClass="font-sans bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent tracking-tighter"
              />
            </h1>
            
            {/* Styled tags chips layout */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-[10px] sm:text-xs font-mono text-zinc-550 font-medium">
              <span className="px-3 py-1 rounded-full border border-dashed border-zinc-300 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm">
                Full Stack Developer
              </span>
              <span className="text-zinc-450/40 select-none">•</span>
              <span className="px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent flex items-center gap-1.5 shadow-[0_2px_8px_color-mix(in_srgb,var(--accent)_5%,transparent)]">
                <Sparkles className="size-3.5 animate-pulse text-accent" />
                AI Builder
              </span>
              <span className="text-zinc-450/40 select-none">•</span>
              <span className="px-3 py-1 rounded-full border border-dashed border-zinc-300 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm">
                B.Tech CS Student
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-lg font-sans font-normal">
            Building production-ready web applications and AI-powered products that solve real-world problems. Specialized in <span className="text-zinc-900 dark:text-zinc-200 font-semibold">full-stack architecture</span> and <span className="text-zinc-900 dark:text-zinc-200 font-semibold">machine learning pipeline integrations</span>.
          </p>

          {/* Executive Summary Grid (10-Second Recruiter scan) */}
          <div className="grid grid-cols-3 gap-3 pt-3 w-full max-w-lg font-mono text-[10px] leading-tight select-none">
            {/* Card 1: Superpower */}
            <div className="relative group flex flex-col justify-between p-4 rounded-xl border border-zinc-300/80 dark:border-zinc-800/60 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-sm hover:shadow-[0_8px_20px_color-mix(in_srgb,var(--accent)_10%,transparent)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-20 dark:opacity-10 pointer-events-none" />
              <div className="absolute -inset-px bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
              <div className="flex justify-between items-center text-zinc-550 text-[8px] font-extrabold uppercase tracking-widest z-10">
                <span>SUPERPOWER</span>
                <div className="p-1 rounded-md bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-accent group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="size-3.5 text-accent" />
                </div>
              </div>
              <div className="mt-4 z-10">
                <span className="text-zinc-800 dark:text-zinc-100 font-bold block text-xs tracking-tight group-hover:text-accent transition-colors duration-205">
                  Full-Stack AI
                </span>
                <span className="text-accent text-[9px] font-bold mt-1 block">
                  FastAPI + Next.js
                </span>
              </div>
            </div>

            {/* Card 2: Production */}
            <div className="relative group flex flex-col justify-between p-4 rounded-xl border border-zinc-300/80 dark:border-zinc-800/60 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-sm hover:shadow-[0_8px_20px_color-mix(in_srgb,var(--accent)_10%,transparent)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-20 dark:opacity-10 pointer-events-none" />
              <div className="absolute -inset-px bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
              <div className="flex justify-between items-center text-zinc-550 text-[8px] font-extrabold uppercase tracking-widest z-10">
                <span>PRODUCTION</span>
                <div className="p-1 rounded-md bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-accent group-hover:scale-110 transition-transform duration-300">
                  <Layers className="size-3.5 text-accent" />
                </div>
              </div>
              <div className="mt-4 z-10">
                <span className="text-zinc-800 dark:text-zinc-100 font-bold block text-xs tracking-tight group-hover:text-accent transition-colors duration-205">
                  Backend Intern
                </span>
                <span className="text-accent text-[9px] font-bold mt-1 block">
                  Laravel + Postgres
                </span>
              </div>
            </div>

            {/* Card 3: Metric */}
            <div className="relative group flex flex-col justify-between p-4 rounded-xl border border-zinc-300/80 dark:border-zinc-800/60 bg-zinc-100/40 dark:bg-zinc-950/40 backdrop-blur-md shadow-sm hover:shadow-[0_8px_20px_color-mix(in_srgb,var(--accent)_10%,transparent)] hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-20 dark:opacity-10 pointer-events-none" />
              <div className="absolute -inset-px bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
              <div className="flex justify-between items-center text-zinc-550 text-[8px] font-extrabold uppercase tracking-widest z-10">
                <span>METRIC</span>
                <div className="p-1 rounded-md bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-accent group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="size-3.5 text-accent" />
                </div>
              </div>
              <div className="mt-4 z-10">
                <span className="text-zinc-800 dark:text-zinc-100 font-bold block text-xs tracking-tight group-hover:text-accent transition-colors duration-205">
                  Quantized CNN
                </span>
                <span className="text-accent text-[9px] font-bold mt-1 block">
                  -75% / 42ms
                </span>
              </div>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3 w-full">
            <MagneticButton
              onClick={onViewProjectsClick}
              className="h-11 px-6 bg-accent text-background font-semibold rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_4px_20px_color-mix(in_srgb,var(--accent)_30%,transparent)] hover:shadow-[0_4px_28px_color-mix(in_srgb,var(--accent)_50%,transparent)] hover:scale-[1.02] flex items-center cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
                <span>View Projects</span>
                <ArrowRight className="size-3.5" />
              </div>
            </MagneticButton>

            <MagneticButton
              href="/resume.pdf"
              download="Pawan_Kumar_Resume.pdf"
              className="h-11 px-6 border border-zinc-300 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-950/20 hover:border-accent/40 text-zinc-650 dark:text-zinc-400 hover:text-accent font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-[0_4px_16px_color-mix(in_srgb,var(--accent)_12%,transparent)] hover:scale-[1.02] flex items-center cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
                <FileText className="size-3.5" />
                <span>Get Resume</span>
              </div>
            </MagneticButton>
          </div>

          {/* Social icons links */}
          <div className="flex items-center gap-3 pt-6 border-t border-dashed border-zinc-200/10 dark:border-zinc-850/50 w-full max-w-md">
            <a
              href="https://github.com/pawankumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-950/45 text-zinc-650 dark:text-zinc-450 hover:text-accent hover:border-accent/40 hover:shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_25%,transparent)] hover:scale-105 transition-all duration-300 cursor-pointer"
              title="GitHub Profile"
            >
              <GithubIcon className="size-4.5" />
            </a>
            <a
              href="https://linkedin.com/in/pawankumar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center size-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-950/45 text-zinc-650 dark:text-zinc-455 hover:text-accent hover:border-accent/40 hover:shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_25%,transparent)] hover:scale-105 transition-all duration-300 cursor-pointer"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="size-4.5" />
            </a>
            <a
              href="mailto:pawan@example.com"
              className="flex items-center justify-center size-10 rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-950/45 text-zinc-650 dark:text-zinc-455 hover:text-accent hover:border-accent/40 hover:shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_25%,transparent)] hover:scale-105 transition-all duration-300 cursor-pointer"
              title="Send Email"
            >
              <Mail className="size-4.5" />
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Dev Studio Mock IDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative flex flex-col gap-6 items-center lg:items-end w-full"
        >
          <DevStudio />
        </motion.div>
        
      </div>
    </section>
  );
}
