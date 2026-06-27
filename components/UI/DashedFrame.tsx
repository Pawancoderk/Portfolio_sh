"use client";

import React from "react";

interface DashedFrameProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showLeds?: boolean;
  active?: boolean;
}

export function DashedFrame({
  children,
  className = "",
  title = "",
  showLeds = true,
  active = true,
}: DashedFrameProps) {
  return (
    <div
      className={`relative border border-dashed border-zinc-800/80 dark:border-zinc-800 bg-card/40 backdrop-blur-sm p-5 transition-colors duration-300 hover:border-zinc-700/80 dark:hover:border-zinc-700 ${className}`}
    >
      {/* Corner LEDs */}
      {showLeds && (
        <>
          <div
            className={`absolute -top-1.5 -left-1.5 size-3 rounded-full border border-background dark:border-background flex items-center justify-center bg-zinc-800`}
          >
            <span
              className={`size-1.5 rounded-full ${
                active ? "bg-accent animate-diagnostic-blink" : "bg-zinc-600"
              }`}
            />
          </div>
          <div
            className={`absolute -top-1.5 -right-1.5 size-3 rounded-full border border-background dark:border-background flex items-center justify-center bg-zinc-800`}
          >
            <span
              className={`size-1.5 rounded-full ${
                active ? "bg-accent animate-diagnostic-blink" : "bg-zinc-600"
              }`}
            />
          </div>
          <div
            className={`absolute -bottom-1.5 -left-1.5 size-3 rounded-full border border-background dark:border-background flex items-center justify-center bg-zinc-800`}
          >
            <span
              className={`size-1.5 rounded-full ${
                active ? "bg-accent animate-diagnostic-blink" : "bg-zinc-600"
              }`}
            />
          </div>
          <div
            className={`absolute -bottom-1.5 -right-1.5 size-3 rounded-full border border-background dark:border-background flex items-center justify-center bg-zinc-800`}
          >
            <span
              className={`size-1.5 rounded-full ${
                active ? "bg-accent animate-diagnostic-blink" : "bg-zinc-600"
              }`}
            />
          </div>
        </>
      )}

      {/* Floating Section Title Tag */}
      {title && (
        <div className="absolute -top-3 left-4 px-2 bg-background border border-dashed border-zinc-800/80 dark:border-zinc-800 text-[9px] uppercase font-mono tracking-widest text-zinc-500 rounded select-none">
          {title}
        </div>
      )}

      {children}
    </div>
  );
}
