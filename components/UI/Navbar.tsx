"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { useTheme } from "next-themes";

interface NavbarProps {
  onScrollToSection: (id: string) => void;
}

export function Navbar({ onScrollToSection }: NavbarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { theme, setTheme } = useTheme();

  // Navigation items mapping
  const navLinks = [
    { label: "About", id: "aboutme" },
    { label: "Projects", id: "projects" },
    { label: "Engineering", id: "deep-dive" },
    { label: "GitHub", id: "github" },
    { label: "Contact", id: "contact" },
  ];

  // Scroll detection to morph navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Platform detection for search shortcut
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(window.navigator.platform.toUpperCase().indexOf("MAC") >= 0);
    }
  }, []);

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const sections = ["hero", "aboutme", "projects", "deep-dive", "github", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Dispatch global keydown to toggle CommandMenu
  const handleOpenSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: !isMac,
      metaKey: isMac,
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  };

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  // Check if navbar should have capsule appearance (either hovered or scrolled)
  const isCapsule = isHovered || isScrolled || isMobileMenuOpen;

  return (
    <>
      {/* Outer Floating Wrapper */}
      <div className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        {/* Inner Capsule Container */}
        <header
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setHoveredLink(null);
          }}
          className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full flex items-center justify-between px-6 py-2.5 ${
            isCapsule
              ? "bg-zinc-950/60 dark:bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md shadow-lg shadow-black/20"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Brand/Logo Area */}
          <button
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-2 group cursor-pointer text-left"
            aria-label="Scroll to home page"
          >
            {/* Green Indicator Dot */}
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse group-hover:scale-125 transition-transform" />
            <div className="text-sm font-sans tracking-tight">
              <span className="font-bold text-foreground transition-colors group-hover:text-accent">Pawan</span>
              <span className="text-zinc-600 dark:text-zinc-400 mx-1.5 font-light">/</span>
              <span className="font-semibold text-foreground group-hover:text-accent transition-colors">dev</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 cursor-pointer rounded-full ${
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-zinc-400 hover:text-foreground"
                  }`}
                >
                  {/* Sliding Hover Background */}
                  {hoveredLink === link.id && (
                    <motion.span
                      layoutId="navbar-hover-bg"
                      className="absolute inset-0 bg-zinc-850/60 dark:bg-zinc-900/60 border border-zinc-800/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active Indicator Underline Dot */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-dot"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Command Search Button Pill */}
            <button
              onClick={handleOpenSearch}
              className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-800/40 text-[10px] font-mono text-zinc-400 hover:text-foreground transition-all cursor-pointer shadow-sm active:scale-95"
              title="Open search menu"
            >
              <Search className="size-3 text-zinc-500" />
              <span>{isMac ? "⌘ K" : "Ctrl K"}</span>
            </button>

            {/* Circular Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-zinc-800/80 p-2 flex items-center justify-center bg-zinc-900/40 hover:bg-zinc-800/40 text-zinc-400 hover:text-foreground transition-all cursor-pointer shadow-sm active:scale-95 size-8"
              aria-label="Toggle visual theme"
            >
              <div className="relative size-4 flex items-center justify-center">
                <Sun className="absolute transition-all duration-300 dark:scale-0 dark:opacity-0 scale-100 opacity-100 size-4 text-orange-400" />
                <Moon className="absolute transition-all duration-300 dark:scale-100 dark:opacity-100 scale-0 opacity-0 size-4 text-emerald-400" />
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-full border border-zinc-800/80 p-2 flex items-center justify-center bg-zinc-900/40 hover:bg-zinc-800/40 text-zinc-400 hover:text-foreground transition-all cursor-pointer size-8"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Glassmorphic Navigation Panel Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] mx-4 z-35 md:hidden bg-zinc-950/80 dark:bg-zinc-950/80 border border-zinc-850/80 rounded-2xl p-5 backdrop-blur-lg shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full py-2.5 px-4 text-left rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-zinc-900 text-foreground font-semibold border-l-2 border-accent pl-3"
                        : "text-zinc-400 hover:text-foreground hover:bg-zinc-900/50"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}

              <div className="h-px bg-zinc-850 my-2" />

              {/* Command search button inside mobile menu */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(handleOpenSearch, 200);
                }}
                className="w-full flex items-center justify-between py-2.5 px-4 rounded-lg text-sm font-medium text-zinc-400 hover:text-foreground hover:bg-zinc-900/50 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="size-4 text-zinc-500" />
                  <span>Search Terminal</span>
                </div>
                <span className="text-xs font-mono border border-zinc-800 px-2 py-0.5 rounded bg-zinc-900/50">
                  {isMac ? "⌘K" : "Ctrl+K"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
