"use client";

import React from "react";
import { DashedFrame } from "@/components/UI/DashedFrame";
import { Diagnostics } from "@/components/Widgets/Diagnostics";
import { AIPlayground } from "@/components/Widgets/AIPlayground";
import { CodeDiff } from "@/components/Widgets/CodeDiff";
import { ExperienceLogs } from "@/components/Widgets/ExperienceLogs";
import { ProjectsGrid } from "@/components/Widgets/ProjectsGrid";
import { Sparkles, Terminal } from "lucide-react";
import { TextScramble } from "@/components/UI/TextScramble";

export function ListView() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-10 px-4 md:px-0 py-6 text-left">
      {/* 1. Profile / Introduction */}
      <DashedFrame title="Core.Profile" showLeds active>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Available for Full-stack & AI roles
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            <TextScramble text="Pawan Kumar" />
          </h2>
          <p className="text-xs md:text-sm font-mono text-zinc-400">
            Full Stack Developer • AI Builder • Computer Science Student
          </p>
          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-sans max-w-2xl">
            "Although early in my career, I build production-ready full stack and AI-powered products." Specialized in designing robust modular layouts, streaming API interfaces, and persistent full-stack platforms.
          </p>
        </div>
      </DashedFrame>

      {/* Grid containing AI playground and Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. AI Assistant Playground */}
        <DashedFrame title="AI.Assistant.SH" showLeds>
          <AIPlayground />
        </DashedFrame>

        {/* 3. System Diagnostics */}
        <DashedFrame title="Diag.Console" showLeds>
          <Diagnostics dragX={0} dragY={0} />
        </DashedFrame>
      </div>

      {/* 4. Projects Showcase */}
      <DashedFrame title="Production.Index" showLeds>
        <ProjectsGrid />
      </DashedFrame>

      {/* Grid containing Code Diff and Work Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 5. Git Commit diff code changes */}
        <DashedFrame title="Git.Commit.Review" showLeds>
          <CodeDiff />
        </DashedFrame>

        {/* 6. Professional Milestones Timeline Accordion */}
        <DashedFrame title="Milestones.Log" showLeds>
          <ExperienceLogs />
        </DashedFrame>
      </div>
    </div>
  );
}
