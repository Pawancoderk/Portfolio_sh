"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  Search,
  Compass,
  Monitor,
  Moon,
  Sun,
  Flame,
  FileText,
  Terminal,
  Grid,
  ChevronRight
} from "lucide-react";

interface CommandMenuProps {
  onScrollToSection: (id: string) => void;
  onSetLayoutMode: (mode: "console" | "list") => void;
  onTriggerMatrix: () => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Interface" | "Technical Blog" | "Easter Egg";
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandMenu({
  onScrollToSection,
  onSetLayoutMode,
  onTriggerMatrix,
}: CommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen to toggle shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset indices on search or toggle
  useEffect(() => {
    setSelectedIndex(0);
  }, [search, isOpen]);

  // Autofocus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      category: "Navigation",
      label: "Go to Home / Hero Intro",
      shortcut: "g + h",
      icon: <Compass className="size-3.5 text-zinc-500" />,
      action: () => {
        onScrollToSection("hero");
        setIsOpen(false);
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      label: "Go to About Story",
      shortcut: "g + a",
      icon: <Compass className="size-3.5 text-zinc-500" />,
      action: () => {
        onScrollToSection("aboutme");
        setIsOpen(false);
      },
    },
    {
      id: "nav-timeline",
      category: "Navigation",
      label: "Go to Career Timeline",
      shortcut: "g + t",
      icon: <Compass className="size-3.5 text-zinc-500" />,
      action: () => {
        onScrollToSection("careertimeline");
        setIsOpen(false);
      },
    },
    {
      id: "nav-workspace",
      category: "Navigation",
      label: "Go to Projects Workspace Console",
      shortcut: "g + p",
      icon: <Grid className="size-3.5 text-zinc-500" />,
      action: () => {
        onScrollToSection("workspace");
        setIsOpen(false);
      },
    },
    {
      id: "nav-deepdive",
      category: "Navigation",
      label: "Go to System Engineering Deep Dive",
      shortcut: "g + d",
      icon: <Compass className="size-3.5 text-zinc-500" />,
      action: () => {
        onScrollToSection("deep-dive");
        setIsOpen(false);
      },
    },
    {
      id: "nav-github",
      category: "Navigation",
      label: "Go to GitHub Developer Dashboard",
      shortcut: "g + g",
      icon: <Compass className="size-3.5 text-zinc-500" />,
      action: () => {
        onScrollToSection("github");
        setIsOpen(false);
      },
    },
    // Interface
    {
      id: "int-theme",
      category: "Interface",
      label: `Switch Theme to ${theme === "light" ? "Dark" : "Light"} Mode`,
      shortcut: "t",
      icon: theme === "light" ? <Moon className="size-3.5 text-zinc-500" /> : <Sun className="size-3.5 text-zinc-500" />,
      action: () => {
        setTheme(theme === "light" ? "dark" : "light");
        setIsOpen(false);
      },
    },
    {
      id: "int-console",
      category: "Interface",
      label: "Switch Workspace Layout to Console Canvas Mode",
      shortcut: "v",
      icon: <Terminal className="size-3.5 text-zinc-500" />,
      action: () => {
        onSetLayoutMode("console");
        onScrollToSection("workspace");
        setIsOpen(false);
      },
    },
    {
      id: "int-list",
      category: "Interface",
      label: "Switch Workspace Layout to Chronological List Mode",
      shortcut: "v",
      icon: <Monitor className="size-3.5 text-zinc-500" />,
      action: () => {
        onSetLayoutMode("list");
        onScrollToSection("workspace");
        setIsOpen(false);
      },
    },
    // Technical Blog Articles
    {
      id: "art-pytorch",
      category: "Technical Blog",
      label: "Blog: Quantizing PyTorch ResNet CNN Models for Production",
      icon: <FileText className="size-3.5 text-indigo-400" />,
      action: () => {
        router.push("/blog/pytorch-quantization");
        setIsOpen(false);
      },
    },
    {
      id: "art-3d",
      category: "Technical Blog",
      label: "Blog: Procedural 3D Mesh Generation from JSON Layout Graphs",
      icon: <FileText className="size-3.5 text-indigo-400" />,
      action: () => {
        router.push("/blog/3d-mesh-generation");
        setIsOpen(false);
      },
    },
    {
      id: "art-all",
      category: "Technical Blog",
      label: "View All Articles Archive",
      icon: <FileText className="size-3.5 text-zinc-500" />,
      action: () => {
        router.push("/blog");
        setIsOpen(false);
      },
    },
    // Easter Egg
    {
      id: "egg-matrix",
      category: "Easter Egg",
      label: "Inject Matrix falling code rain overlay",
      shortcut: "matrix",
      icon: <Flame className="size-3.5 text-emerald-500 animate-pulse" />,
      action: () => {
        onTriggerMatrix();
        setIsOpen(false);
      },
    },
  ];

  // Filter items based on search query
  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard navigation inside menu list
  useEffect(() => {
    if (!isOpen) return;

    const handleListNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleListNavigation);
    return () => window.removeEventListener("keydown", handleListNavigation);
  }, [isOpen, selectedIndex, filtered]);

  // Click outside to dismiss
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      {/* Floating HUD Indicator */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 select-none hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="px-3.5 py-2 border border-dashed border-zinc-800/80 bg-zinc-950/85 hover:bg-zinc-900 backdrop-blur-md rounded-full shadow-2xl text-[10px] font-mono text-zinc-500 hover:text-foreground cursor-pointer transition-all flex items-center gap-2"
        >
          <Search className="size-3 text-zinc-400" />
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-semibold font-mono text-zinc-300">
            ⌘K
          </kbd>
          <span>to query commands</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="command-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4 select-none"
          >
            <motion.div
              ref={menuRef}
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-lg bg-zinc-950/95 border border-dashed border-zinc-850 rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs"
            >
              {/* Input header */}
              <div className="flex items-center gap-3 p-4 border-b border-dashed border-zinc-850">
                <Search className="size-4 text-zinc-500 animate-pulse" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command to search or navigate..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-600 font-mono focus:ring-0 w-full"
                />
                <span className="text-[9px] text-zinc-650 uppercase">⌘K</span>
              </div>

              {/* Suggestions List */}
              <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-none space-y-1">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-zinc-600">
                    No matching commands found.
                  </div>
                ) : (
                  // Group by category
                  Object.entries(
                    filtered.reduce((acc, item) => {
                      if (!acc[item.category]) acc[item.category] = [];
                      acc[item.category].push(item);
                      return acc;
                    }, {} as Record<string, CommandItem[]>)
                  ).map(([category, catItems]) => (
                    <div key={category} className="space-y-1">
                      <span className="px-3 py-1.5 text-[8.5px] font-bold text-zinc-650 uppercase tracking-wider block">
                        {category}
                      </span>
                      {catItems.map((item) => {
                        const globalIndex = filtered.findIndex((fi) => fi.id === item.id);
                        const isSelected = globalIndex === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            className={`w-full p-2.5 rounded-lg flex items-center justify-between text-left cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-accent/10 text-accent font-semibold border-l-2 border-accent"
                                : "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {item.icon}
                              <span className="line-clamp-1">{item.label}</span>
                            </div>
                            {item.shortcut ? (
                              <span className="text-[8px] bg-zinc-900 border border-zinc-850 px-1 py-0.5 rounded text-zinc-500 uppercase">
                                {item.shortcut}
                              </span>
                            ) : (
                              <ChevronRight className="size-3 text-zinc-700 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer status tip */}
              <div className="p-3 border-t border-dashed border-zinc-850/80 bg-zinc-900/10 flex items-center justify-between font-mono text-[8px] text-zinc-600">
                <span>Use arrows ↑↓ and Enter to navigate</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
