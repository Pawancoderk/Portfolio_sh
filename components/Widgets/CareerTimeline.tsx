"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CardSpotlight } from "@/components/UI/CardSpotlight";
import { Calendar, CheckCircle2, Milestone, GraduationCap, Terminal, Briefcase } from "lucide-react";

interface MilestoneItem {
  year: string;
  title: string;
  sub: string;
  desc: string;
  bullets?: string[];
  skills?: string[];
  icon: React.ComponentType<any>;
  accentColor: string;
}

const TIMELINE_EVENTS: MilestoneItem[] = [
  {
    year: "2022",
    title: "Started B.Tech Computer Science",
    sub: "Academic Foundation",
    desc: "Began academic study in computer systems. Focused on software engineering fundamentals, database designs (SQL/NoSQL), algorithm design, and core programming paradigms.",
    skills: ["Data Structures", "Algorithms", "C++", "SQL"],
    icon: GraduationCap,
    accentColor: "#a855f7" // Purple
  },
  {
    year: "2025",
    title: "Started Building Serious Projects",
    sub: "Hands-on Development",
    desc: "Shifted focus from basic scripts to shipping production-level applications. Designed and deployed full-stack digital ledgers, real-time Socket communication dashboards, and containerized dev environments.",
    skills: ["Next.js", "Docker", "Node.js", "PostgreSQL", "Socket.io"],
    icon: Terminal,
    accentColor: "#3b82f6" // Blue
  },
  {
    year: "2026",
    title: "Software Developer Intern",
    sub: "NexisWorx",
    desc: "Integrated as a core backend intern building high-volume web portals, custom admin panels, and database search mechanisms.",
    bullets: [
      "Laravel Development: Designed restful backend controllers, Eloquent ORM schemas, and data structures.",
      "Authentication Systems: Programmed secure user login configs, password hashing, and route protection middleware.",
      "Admin Panels: Created dashboard logging tools, user grids, and granular dashboard permission levels.",
      "CRUD Systems: Formulated validation schemas, record controllers, and unified database entry models.",
      "Dynamic Search Features: Set up fuzzy queries and live auto-complete inputs for search routes.",
    ],
    skills: ["Laravel", "PHP", "PostgreSQL", "Auth Systems", "CRUD APIs", "Fuzzy Search"],
    icon: Briefcase,
    accentColor: "#10b981" // Green
  },
];

export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Track scroll position of this container in viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Grow vertical timeline scale Y coordinate dynamically as user scrolls
  const scaleY = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <div
      id="careertimeline"
      ref={containerRef}
      className="w-full max-w-5xl mx-auto px-6 py-16 relative select-none z-10 text-left scroll-mt-20"
    >
      {/* Section Header */}
      <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs mb-16 pb-3 border-b border-dashed border-zinc-800/80">
        <Milestone className="size-3.5 text-accent animate-pulse" />
        <span>Career.Timeline / History.Log</span>
      </div>

      <div className="relative w-full">
        {/* Central Track Line (centered on desktop, left-aligned on mobile) */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-[1px] bg-zinc-900/50 dark:bg-zinc-800/40" />

        {/* Scrolling progress track line */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-[1px] bg-accent shadow-[0_0_10px_var(--accent)]"
        />

        {/* Timeline Events alternating stack */}
        <div className="space-y-12 md:space-y-16">
          {TIMELINE_EVENTS.map((event, index) => {
            const IconComponent = event.icon;
            const isLeft = index % 2 === 0;
            const isHovered = hoveredIdx === index;

            return (
              <div
                key={event.year}
                className="relative flex flex-col md:flex-row w-full items-start"
              >
                {/* Timeline Node Point (Centered on desktop, left-aligned on mobile) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 z-20 transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: "-120px" }}
                    animate={{
                      scale: isHovered ? 1.25 : 1,
                      borderColor: isHovered ? event.accentColor : undefined,
                      boxShadow: isHovered ? `0 0 14px ${event.accentColor}50` : undefined,
                    }}
                    className={`size-6 rounded-full border border-dashed flex items-center justify-center bg-zinc-950/90 text-zinc-400 group-hover:text-foreground transition-all duration-300 ${
                      isHovered ? "" : "border-zinc-800"
                    }`}
                  >
                    <IconComponent className="size-3" style={{ color: isHovered ? event.accentColor : undefined }} />
                  </motion.div>
                </div>

                {/* Event Content wrapper: Alternates left and right on desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`w-full pl-10 md:pl-0 md:w-[calc(50%-28px)] ${
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <CardSpotlight className="p-5 border border-dashed border-zinc-850 bg-card/25 backdrop-blur-xl rounded-xl transition-all duration-300 hover:border-accent/40 shadow-2xl relative overflow-hidden group">
                    {/* Tiny visual accent triangle */}
                    <div
                      className={`hidden md:block absolute top-4 w-2 h-2 rotate-45 border-dashed bg-zinc-950 border-zinc-850 z-20 ${
                        isLeft
                          ? "right-[-5px] border-t border-r border-dashed"
                          : "left-[-5px] border-b border-l border-dashed"
                      }`}
                    />

                    <div className="space-y-4">
                      {/* Header: Year & Roles */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-zinc-900 pb-3">
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono flex items-center gap-1">
                            <Calendar className="size-3 text-accent" /> {event.sub}
                          </span>
                          <h4 className="text-sm font-bold text-zinc-200 mt-0.5 font-sans group-hover:text-foreground transition-colors">
                            {event.title}
                          </h4>
                        </div>
                        <span
                          className="px-2.5 py-0.5 border border-dashed font-mono text-[10px] font-bold rounded self-start sm:self-center transition-all duration-300"
                          style={{
                            backgroundColor: isHovered ? `${event.accentColor}10` : "rgb(24 24 27 / 0.8)",
                            borderColor: isHovered ? event.accentColor : "border-zinc-850",
                            color: isHovered ? event.accentColor : "var(--accent)",
                          }}
                        >
                          {event.year}
                        </span>
                      </div>

                      {/* Desc */}
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                        {event.desc}
                      </p>

                      {/* Responsibilities bullets list (internship details) */}
                      {event.bullets && (
                        <div className="space-y-2 pt-1">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                            Key Tasks & Modules:
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {event.bullets.map((bullet, idx) => {
                              const [title, desc] = bullet.split(": ");
                              return (
                                <li key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400 leading-relaxed">
                                  <CheckCircle2 className="size-3.5 text-accent mt-0.5 shrink-0" />
                                  <div>
                                    <strong className="text-zinc-300 font-semibold">{title}:</strong>{" "}
                                    <span className="text-zinc-400 font-sans">{desc}</span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Skills list */}
                      {event.skills && (
                        <div className="flex flex-wrap gap-1.5 pt-1 select-none">
                          {event.skills.map((skill) => (
                            <span
                              key={skill}
                              style={{
                                borderColor: isHovered ? `${event.accentColor}30` : undefined,
                                color: isHovered ? event.accentColor : undefined,
                                backgroundColor: isHovered ? `${event.accentColor}06` : undefined,
                              }}
                              className="px-2 py-0.5 bg-accent/5 hover:bg-accent/10 border border-accent/15 hover:border-accent/30 text-[9px] font-semibold font-mono text-accent rounded transition-all duration-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardSpotlight>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

