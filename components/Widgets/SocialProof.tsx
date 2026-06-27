"use client";

import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "@/components/UI/CountUp";
import { Briefcase, CodeXml, Laptop, ShieldCheck } from "lucide-react";

export function SocialProof() {
  return (
    <div className="w-full border-y border-dashed border-zinc-850/80 bg-zinc-900/5 backdrop-blur-sm select-none py-6 z-10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left font-mono">
          
          {/* Stat 1: Internship months */}
          <div className="flex items-center gap-3">
            <div className="p-2 border border-dashed border-zinc-850 rounded bg-zinc-950/20 text-accent">
              <Briefcase className="size-4" />
            </div>
            <div>
              <h5 className="text-lg font-bold text-foreground tabular-nums leading-none">
                <CountUp end={4} suffix=" Months" />
              </h5>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Intern Experience</p>
            </div>
          </div>

          {/* Stat 2: Projects Built */}
          <div className="flex items-center gap-3">
            <div className="p-2 border border-dashed border-zinc-850 rounded bg-zinc-950/20 text-accent">
              <CodeXml className="size-4" />
            </div>
            <div>
              <h5 className="text-lg font-bold text-foreground tabular-nums leading-none">
                <CountUp end={10} suffix="+" />
              </h5>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Projects Built</p>
            </div>
          </div>

          {/* Stat 3: Tech Stack */}
          <div className="flex items-center gap-3">
            <div className="p-2 border border-dashed border-zinc-850 rounded bg-zinc-950/20 text-accent">
              <Laptop className="size-4" />
            </div>
            <div>
              <h5 className="text-lg font-bold text-foreground tabular-nums leading-none">
                <CountUp end={20} suffix="+" />
              </h5>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Technologies</p>
            </div>
          </div>

          {/* Stat 4: Core Specialization */}
          <div className="flex items-center gap-3">
            <div className="p-2 border border-dashed border-zinc-850 rounded bg-zinc-950/20 text-accent">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-tight leading-none">
                AI + Full Stack
              </h5>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1.5">Focus Area</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
