"use client";

import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { ConsoleView } from "@/components/Views/ConsoleView";
import { ListView } from "@/components/Views/ListView";
import { FuturisticLoader } from "@/components/UI/FuturisticLoader";
import { Navbar } from "@/components/UI/Navbar";
import { HeroBackground } from "@/components/UI/HeroBackground";
import { HeroSection } from "@/components/Widgets/HeroSection";
import { SocialProof } from "@/components/Widgets/SocialProof";
import { AboutMe } from "@/components/Widgets/AboutMe";
import { CareerTimeline } from "@/components/Widgets/CareerTimeline";
import { TechStack } from "@/components/Widgets/TechStack";
import { ProjectsGrid } from "@/components/Widgets/ProjectsGrid";
import { EngineeringDeepDive } from "@/components/Widgets/EngineeringDeepDive";
import { GithubDashboard } from "@/components/Widgets/GithubDashboard";
import { Contact } from "@/components/Widgets/Contact";
import { LayoutGrid, List, FileText, Terminal, ShieldAlert, ArrowDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { CustomCursor } from "@/components/UI/CustomCursor";
import { CommandMenu } from "@/components/UI/CommandMenu";
import { MatrixRain } from "@/components/UI/MatrixRain";
import { useTheme } from "next-themes";
import { useRef } from "react";

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [layoutMode, setLayoutMode] = useState<"console" | "list">("console");
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const typedKeys = useRef<string[]>([]);
  const sequence = useRef<string[]>([]);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Increment local storage views counter
  useEffect(() => {
    const currentViews = localStorage.getItem("pawan_portfolio_views");
    const parsed = currentViews ? parseInt(currentViews) : 1248;
    localStorage.setItem("pawan_portfolio_views", (parsed + 1).toString());
  }, []);

  // Keyboard hooks for shortcuts and easter egg matrix trigger
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) return;

      const key = e.key.toLowerCase();
      
      // Easter egg code scanner
      typedKeys.current = [...typedKeys.current, key].slice(-6);
      const typedString = typedKeys.current.join("");
      if (typedString.includes("matrix")) {
        setIsMatrixActive(true);
        typedKeys.current = [];
      } else if (typedString.includes("normal")) {
        setIsMatrixActive(false);
        typedKeys.current = [];
      }

      // Theme toggle (t)
      if (key === "t") {
        setTheme(theme === "light" ? "dark" : "light");
      }
      
      // Layout switcher (v)
      if (key === "v") {
        setLayoutMode((prev) => (prev === "console" ? "list" : "console"));
      }

      // Double character nav binds (g + x)
      sequence.current = [...sequence.current, key].slice(-2);
      if (sequence.current[0] === "g") {
        const action = sequence.current[1];
        if (action === "h") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (action === "a") {
          document.getElementById("aboutme")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "t") {
          document.getElementById("careertimeline")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "p") {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "d") {
          document.getElementById("deep-dive")?.scrollIntoView({ behavior: "smooth" });
        } else if (action === "g") {
          document.getElementById("github")?.scrollIntoView({ behavior: "smooth" });
        }
        sequence.current = [];
      }
    };

    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, [theme, setTheme]);

  const handleScrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };



  // Screen width observer (Fallback to list layout on small devices)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setLayoutMode("list");
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lenis smooth scrolling integration (for overall page smooth scroll)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToWorkspace = () => {
    const el = document.getElementById("workspace");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden transition-colors duration-300">
      
      {/* 0. Dynamic Background Layer (Spotlight + Grid + Noise) */}
      <HeroBackground />

      {/* 1. Immersive Futuristic Cybernetic Boot Splash Screen */}
      <AnimatePresence>
        {loading && (
          <FuturisticLoader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Portfolio Floating Capsule Navigation Header */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* A. Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50 pointer-events-none" style={{ scaleX }} />

      {/* B. Portals & Overlays */}
      <CustomCursor />
      <MatrixRain active={isMatrixActive} onClose={() => setIsMatrixActive(false)} />
      <CommandMenu onScrollToSection={handleScrollToSection} onSetLayoutMode={setLayoutMode} onTriggerMatrix={() => setIsMatrixActive(true)} />

      {/* 3. Main Workspace Container */}
      <div className="flex-1 flex flex-col z-10">
        
        {/* A. Hero Presentation Fold */}
        <div id="hero">
          <HeroSection onViewProjectsClick={scrollToProjects} />
        </div>

        {/* B. Social Proof Statistics Bar */}
        <SocialProof />

        {/* C. Scroll Storytelling About Me Section */}
        <div id="aboutme" className="scroll-mt-20">
          <AboutMe />
        </div>

        {/* D. Modern Career Timeline Section */}
        <div id="careertimeline" className="scroll-mt-20">
          <CareerTimeline />
        </div>

        {/* Tech Stack Visualizer Section */}
        <TechStack />

        {/* E. Scroll Indicator */}
        <div className="flex justify-center py-6 select-none animate-bounce">
          <button 
            onClick={scrollToProjects}
            className="p-2 border border-dashed border-zinc-850 rounded-full bg-zinc-900/5 hover:bg-zinc-850/20 transition-all text-zinc-500 cursor-pointer"
            aria-label="Scroll down to projects"
          >
            <ArrowDown className="size-4" />
          </button>
        </div>

        {/* F. Featured Projects Section */}
        <div id="projects" className="scroll-mt-20 w-full max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex flex-col gap-2 mb-8 text-left select-none">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Projects</h2>
            <p className="text-sm text-zinc-500 font-mono">Production-ready applications, edge tools, and open-source packages.</p>
          </div>
          <ProjectsGrid />
        </div>

        {/* G. Detailed Interactive Workspace Fold */}
        <section 
          id="workspace" 
          className="w-full max-w-[1600px] mx-auto p-6 flex flex-col justify-center scroll-mt-20"
        >
          {/* Detailed Workspace Header */}
          <div className="flex items-center justify-between border-b border-dashed border-zinc-850/80 pb-3 mb-6 select-none">
            <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="size-3.5 text-accent" />
              <span>Interactive Developer Console & Diagnostics Sandbox</span>
            </div>
            
            {/* Sync active view indicator tag */}
            <span className="text-[9px] font-mono bg-accent-muted border border-accent/20 px-2 py-0.5 rounded text-accent uppercase font-bold tracking-wide">
              Mode: {layoutMode}
            </span>
          </div>

          {/* Draggable Canvas or Timeline List rendering */}
          <AnimatePresence mode="wait">
            {layoutMode === "console" ? (
              <motion.div
                key="console-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full h-full flex flex-col"
              >
                <ConsoleView />
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <ListView />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* G. Technical Engineering Deep Dive Section */}
        <div id="deep-dive" className="scroll-mt-20">
          <EngineeringDeepDive />
        </div>

        {/* H. Public GitHub Developer Dashboard Section */}
        <div id="github" className="scroll-mt-20">
          <GithubDashboard />
        </div>

        {/* Contact Section */}
        <div id="contact" className="scroll-mt-20">
          <Contact />
        </div>
      </div>

      {/* 4. Console Bottom status bar */}
      <footer className="border-t border-dashed border-zinc-850 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-500 select-none z-10 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>PAWAN_SERVER: ONLINE (200 OK)</span>
        </div>
        <div className="flex items-center gap-4 text-center">
          <span>DESIGNED & DEVELOPED BY PAWAN KUMAR</span>
          <span>© 2026. ALL RIGHTS RESERVED</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldAlert className="size-3.5 text-zinc-650" />
          <span>SYS_MODE: PRODUCTION</span>
        </div>
      </footer>
    </div>
  );
}
