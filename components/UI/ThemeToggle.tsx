"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border border-dashed border-zinc-850 hover:bg-zinc-800/20 active:scale-95 transition-all text-zinc-400 hover:text-foreground cursor-pointer rounded"
      aria-label="Toggle visual theme"
    >
      <div className="relative size-4 flex items-center justify-center">
        <Sun className="absolute transition-all duration-300 dark:scale-0 dark:opacity-0 scale-100 opacity-100 size-4" />
        <Moon className="absolute transition-all duration-300 dark:scale-100 dark:opacity-100 scale-0 opacity-0 size-4" />
      </div>
    </button>
  );
}
