"use client";

import React, { useState } from "react";
import { ChevronDown, Briefcase, Calendar, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  shortDesc: string;
  bullets: string[];
  skills: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full Stack & AI Engineer Intern",
    company: "AI Product Labs",
    location: "Remote / Bengaluru",
    duration: "Jan 2026 - April 2026 (4 Months)",
    shortDesc: "Designed and implemented customer support conversational features and AI generators.",
    bullets: [
      "Integrated Google Gemini and LangChain pipelines to automate user content classification, reducing prompt latency by 20%.",
      "Built interactive Monaco-based custom text editing frames with unified version restoration interfaces.",
      "Developed high-fidelity data visualization bento dashboards with server-side page filters and cursor paginated tables.",
      "Configured secure authentication flows using JWT, OAuth (Google/GitHub), and protected Next.js middleware routes.",
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "PostgreSQL", "Prisma", "Docker"],
  },
  {
    id: "exp-2",
    role: "Computer Science Student",
    company: "University of Technology",
    location: "Academic",
    duration: "2023 - Present",
    shortDesc: "Specializing in software engineering, database management, and intelligent web applications.",
    bullets: [
      "Secured top scores in Database Systems (SQL/NoSQL) and Web Technologies.",
      "Led the development of open-source projects using modern frontend frameworks and Socket.io.",
      "Active participant in national hackathons and developer meetups.",
    ],
    skills: ["Data Structures", "Algorithms", "PostgreSQL", "Socket.io", "React", "Node.js"],
  },
];

export function ExperienceLogs() {
  const [expandedId, setExpandedId] = useState<string | null>("exp-1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4 text-left select-none h-full">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-dashed border-zinc-800/80 pb-2">
        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
          <Briefcase className="size-3.5" />
          <span>Professional Experience</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">
          Internships & Studies
        </span>
      </div>

      {/* Accordion Stream */}
      <div data-lenis-prevent className="space-y-3 overflow-y-auto flex-1 scrollbar-none pr-1">
        {EXPERIENCES.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`border border-dashed rounded-lg transition-all bg-zinc-900/10 ${
                isOpen
                  ? "border-zinc-700/80 dark:border-zinc-700 bg-zinc-900/20"
                  : "border-zinc-800/50 hover:border-zinc-800"
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full text-left p-3.5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-foreground">{item.role}</h4>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
                    <span className="font-medium text-accent">{item.company}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-zinc-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 gap-1.5">
                  <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                    <Calendar className="size-3" />
                    {item.duration.split(" (")[0]}
                  </span>
                  <ChevronDown
                    className={`size-4 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-foreground" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Collapsible Details Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 pb-4 pt-0 border-t border-dashed border-zinc-800/50 space-y-3">
                      <p className="text-xs text-zinc-400 mt-3 italic">{item.shortDesc}</p>
                      
                      {/* Bullet details */}
                      <ul className="space-y-1.5 pl-3 list-disc text-zinc-400 text-xs">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed pl-1 marker:text-accent">
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-zinc-900 border border-zinc-850 hover:border-zinc-700/50 hover:text-foreground text-[10px] font-mono text-zinc-400 rounded transition-all select-none"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
