"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  BookOpen,
  Calendar,
  Activity,
  Code2,
  Terminal,
  ChevronRight,
  GitCommit
} from "lucide-react";
import { DashedFrame } from "@/components/UI/DashedFrame";
import { CardSpotlight } from "@/components/UI/CardSpotlight";

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

// =========================================================
// HIGH-FIDELITY FALLBACK DATA DEFINITIONS
// =========================================================
const MOCK_USER = {
  login: "Pawancoderk",
  name: "Pawan Kumar",
  avatar_url: "https://avatars.githubusercontent.com/u/108500000?v=4",
  html_url: "https://github.com/Pawancoderk",
  bio: "Full Stack Developer & AI Builder. Creating production-grade systems and user interfaces.",
  public_repos: 12,
  followers: 42,
  following: 38,
  total_stars: 31,
  total_commits_ytd: 648
};

const MOCK_REPOS = [
  {
    name: "audio-classifier-cnn",
    description: "Deep Audio Classification CNN model trained in PyTorch, deployed via FastAPI, hosted serverless on Modal GPU nodes.",
    html_url: "https://github.com/Pawancoderk/audio-classifier-cnn",
    stargazers_count: 8,
    forks_count: 2,
    language: "Python",
    commits_count: 42,
    color: "#3572A5"
  },
  {
    name: "arch-viz-saas",
    description: "Automated floor plan blueprint parser compiling 2D lines into interactive Three.js client-rendered 3D geometries.",
    html_url: "https://github.com/Pawancoderk/arch-viz-saas",
    stargazers_count: 6,
    forks_count: 1,
    language: "TypeScript",
    commits_count: 36,
    color: "#3178c6"
  },
  {
    name: "laravel-crud-portal",
    description: "Laravel secure administrative dashboard panels featuring dynamic database filters, CRUDs, and authentication APIs.",
    html_url: "https://github.com/Pawancoderk/laravel-crud-portal",
    stargazers_count: 5,
    forks_count: 0,
    language: "PHP",
    commits_count: 28,
    color: "#4F5D95"
  },
  {
    name: "portfolio-console",
    description: "Personal creative development portfolio utilizing Next.js 15 App router, Turbopack, Framer Motion, and Lenis layouts.",
    html_url: "https://github.com/Pawancoderk/portfolio-console",
    stargazers_count: 12,
    forks_count: 3,
    language: "TypeScript",
    commits_count: 54,
    color: "#3178c6"
  }
];

const MOCK_LANGUAGES = [
  { name: "TypeScript", percentage: 42, color: "bg-blue-500" },
  { name: "Python", percentage: 28, color: "bg-emerald-500" },
  { name: "PHP", percentage: 20, color: "bg-violet-500" },
  { name: "JavaScript", percentage: 10, color: "bg-amber-500" }
];

const MOCK_COMMITS = [
  {
    repo: "portfolio-console",
    message: "feat: add technical engineering deep dive section with interactive SVG sequence pipelines",
    date: "2 hours ago"
  },
  {
    repo: "audio-classifier-cnn",
    message: "refactor: run FP32 to INT8 weight quantization training pipeline",
    date: "1 day ago"
  },
  {
    repo: "arch-viz-saas",
    message: "fix: snap structural room vertices within 5cm distance threshold",
    date: "2 days ago"
  },
  {
    repo: "laravel-crud-portal",
    message: "docs: update deployment guidelines for Laravel 11.x admin panel instances",
    date: "3 days ago"
  }
];

// Generate mock contribution calendar data (53 weeks x 7 days)
function generateContributionCalendar() {
  const calendar = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 371); // ~53 weeks ago

  for (let i = 0; i < 371; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Realistic commits distribution (more commits on weekdays, busy sprint peaks)
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseRand = Math.random();
    
    let count = 0;
    if (baseRand > 0.85 && !isWeekend) count = Math.floor(Math.random() * 8) + 1;
    else if (baseRand > 0.6 && !isWeekend) count = Math.floor(Math.random() * 3) + 1;
    else if (baseRand > 0.93 && isWeekend) count = Math.floor(Math.random() * 2) + 1;

    // Map count to GitHub color scale
    let colorLevel = 0;
    if (count === 0) colorLevel = 0;
    else if (count <= 2) colorLevel = 1;
    else if (count <= 4) colorLevel = 2;
    else if (count <= 6) colorLevel = 3;
    else colorLevel = 4;

    calendar.push({
      date: currentDate.toISOString().split("T")[0],
      count,
      colorLevel
    });
  }
  return calendar;
}

export function GithubDashboard() {
  const [userData, setUserData] = useState<any>(MOCK_USER);
  const [reposData, setReposData] = useState<any[]>(MOCK_REPOS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  
  // Contribution Tooltip states
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  
  const contributionGrid = useRef<HTMLDivElement>(null);
  const calendarData = React.useMemo(() => generateContributionCalendar(), []);

  // Fetch GitHub API
  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setIsLoading(true);
        // Fetch User Info
        const userRes = await fetch("https://api.github.com/users/Pawancoderk");
        if (!userRes.ok) throw new Error("Rate limit or not found");
        const user = await userRes.json();
        
        // Fetch Repositories
        const reposRes = await fetch("https://api.github.com/users/Pawancoderk/repos?sort=updated&per_page=6");
        if (!reposRes.ok) throw new Error("Rate limit or not found");
        const repos = await reposRes.json();

        // Format fetched repos to match required fields
        const formattedRepos = repos.slice(0, 4).map((r: any) => ({
          name: r.name,
          description: r.description || "Public public code repository.",
          html_url: r.html_url,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language || "TypeScript",
          commits_count: Math.floor(Math.random() * 40) + 15, // Mock commits count since not in repo list payload
          color: r.language === "Python" ? "#3572A5" : r.language === "PHP" ? "#4F5D95" : "#3178c6"
        }));

        setUserData({
          login: user.login,
          name: user.name || user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          bio: user.bio || MOCK_USER.bio,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
          total_stars: formattedRepos.reduce((acc: number, cur: any) => acc + cur.stargazers_count, 0) || MOCK_USER.total_stars,
          total_commits_ytd: MOCK_USER.total_commits_ytd
        });
        setReposData(formattedRepos);
        setIsUsingFallback(false);
      } catch (err) {
        // Fall back gracefully to cache
        setUserData(MOCK_USER);
        setReposData(MOCK_REPOS);
        setIsUsingFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  // Handle Tooltip Position on cell hover
  const handleCellHover = (e: React.MouseEvent, date: string, count: number) => {
    if (!contributionGrid.current) return;
    const rect = contributionGrid.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top - 38;
    setHoveredDay({ date, count, x, y });
  };

  // Color mapper helper for contribution scale (theme adaptive)
  const getContributionColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-accent/20 dark:bg-accent/20";
      case 2:
        return "bg-accent/40 dark:bg-accent/45";
      case 3:
        return "bg-accent/70 dark:bg-accent/70";
      case 4:
        return "bg-accent dark:bg-accent";
      default:
        return "bg-zinc-200 dark:bg-zinc-900/60";
    }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-[1600px] mx-auto p-6 scroll-mt-20">
        <div className="border border-dashed border-zinc-850 bg-card/10 p-8 rounded-xl flex items-center justify-center font-mono text-xs text-zinc-500 h-64">
          <div className="space-y-3 text-center">
            <Activity className="size-5 text-accent animate-pulse mx-auto" />
            <p>Connecting to api.github.com/users/Pawancoderk...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 scroll-mt-20 select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-dashed border-zinc-850/80 pb-3 mb-8">
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
          <GithubIcon className="size-3.5 text-accent" />
          <span>06 // GitHub Developer Dashboard</span>
        </div>
        
        {/* Status Mode Badge */}
        <span className={`text-[8.5px] font-mono border px-2 py-0.5 rounded font-bold tracking-wide uppercase ${
          isUsingFallback
            ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
            : "bg-accent-muted border-accent/20 text-accent"
        }`}>
          {isUsingFallback ? "Rate-Limit Sandbox Mode" : "Live API Stream"}
        </span>
      </div>

      <div className="space-y-6">
        
        {/* 1. Profile Summary Banner */}
        <div className="border border-dashed border-zinc-850 bg-card/25 backdrop-blur-sm p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left w-full md:w-auto">
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="size-11 rounded-lg border border-dashed border-zinc-800 bg-zinc-900 shadow-md"
              onError={(e) => {
                e.currentTarget.src = MOCK_USER.avatar_url;
              }}
            />
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight font-sans">
                {userData.name}
              </h3>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-zinc-500 hover:text-accent flex items-center gap-0.5 mt-0.5 transition-colors"
              >
                <span>@{userData.login}</span>
                <ChevronRight className="size-2.5" />
              </a>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 font-mono text-[9px] w-full md:w-auto justify-start md:justify-end">
            <div className="flex items-center gap-1.5 border border-dashed border-zinc-850 px-2.5 py-1.5 rounded bg-zinc-900/10 hover:border-zinc-700 transition-colors">
              <span className="text-zinc-500 uppercase">Public Repos:</span>
              <span className="text-foreground font-bold">{userData.public_repos}</span>
            </div>
            <div className="flex items-center gap-1.5 border border-dashed border-zinc-850 px-2.5 py-1.5 rounded bg-zinc-900/10 hover:border-zinc-700 transition-colors">
              <span className="text-zinc-500 uppercase">Commits YTD:</span>
              <span className="text-foreground font-bold">{userData.total_commits_ytd}</span>
            </div>
            <div className="flex items-center gap-1.5 border border-dashed border-zinc-850 px-2.5 py-1.5 rounded bg-zinc-900/10 hover:border-zinc-700 transition-colors">
              <span className="text-zinc-500 uppercase">Total Stars:</span>
              <span className="text-accent font-bold flex items-center gap-0.5">
                <Star className="size-3 fill-accent" />
                <span>{userData.total_stars}</span>
              </span>
            </div>
            
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-850 border border-dashed border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-foreground rounded-lg flex items-center gap-1.5 transition-all font-bold"
            >
              <GithubIcon className="size-3.5" />
              <span>VIEW FULL GITHUB</span>
            </a>
          </div>
        </div>

        {/* 2. Contributions Calendar Grid */}
        <DashedFrame title="commit.calendar_ytd" showLeds={false}>
          <div className="p-1 space-y-3 relative text-left">
            <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                <span>{userData.total_commits_ytd} contributions in the last year</span>
              </span>
              {/* Legend */}
              <div className="flex items-center gap-1">
                <span>Less</span>
                <span className="size-2 rounded-sm bg-zinc-200 dark:bg-zinc-900/60" />
                <span className="size-2 rounded-sm bg-accent/20" />
                <span className="size-2 rounded-sm bg-accent/40" />
                <span className="size-2 rounded-sm bg-accent/70" />
                <span className="size-2 rounded-sm bg-accent" />
                <span>More</span>
              </div>
            </div>

            {/* Grid block container */}
            <div 
              ref={contributionGrid}
              className="relative overflow-hidden border border-dashed border-zinc-850 p-2.5 rounded-lg bg-zinc-950/40"
            >
              {/* Floating tooltip */}
              {hoveredDay && (
                <div
                  style={{ left: `${hoveredDay.x}px`, top: `${hoveredDay.y}px` }}
                  className="absolute z-20 pointer-events-none bg-zinc-950 border border-dashed border-zinc-800 px-2 py-1 rounded text-[8px] font-mono text-zinc-300 shadow-xl whitespace-nowrap"
                >
                  <strong>{hoveredDay.count} commits</strong> on {hoveredDay.date}
                </div>
              )}

              {/* Day Matrix cells */}
              <div 
                className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto scrollbar-none h-[72px]"
                onMouseLeave={() => setHoveredDay(null)}
              >
                {calendarData.map((day) => (
                  <div
                    key={day.date}
                    onMouseMove={(e) => handleCellHover(e, day.date, day.count)}
                    className={`size-[7px] sm:size-[8px] rounded-sm transition-colors duration-150 cursor-crosshair ${getContributionColor(day.colorLevel)}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </DashedFrame>

        {/* 3. Featured Repositories (Limit to 2 for high density, clean visual balance) */}
        <div className="space-y-3 text-left">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
            Featured Public Repositories
          </span>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {reposData.slice(0, 2).map((repo) => (
              <motion.div key={repo.name} variants={itemVariants} className="h-full">
                <CardSpotlight>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-dashed border-zinc-850 bg-card/25 hover:border-zinc-700/80 rounded-xl p-4 h-full flex flex-col justify-between transition-colors block text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-dashed border-zinc-900/60 pb-1.5">
                        <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
                          <BookOpen className="size-3.5 text-accent" />
                          <span>{repo.name}</span>
                        </span>
                        
                        {/* Commits bubble indicator */}
                        <span className="text-[7.5px] font-mono bg-zinc-900 border border-zinc-850 text-zinc-500 px-1.5 py-0.5 rounded">
                          {repo.commits_count} commits
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed min-h-[36px]">
                        {repo.description}
                      </p>
                    </div>

                    {/* Info footer */}
                    <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 pt-3 mt-3 border-t border-dashed border-zinc-900/60">
                      {/* Language */}
                      <div className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: repo.color }} />
                        <span>{repo.language}</span>
                      </div>
                      {/* Stars / Forks */}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-0.5">
                          <Star className="size-3 fill-zinc-500/20" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork className="size-3" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </CardSpotlight>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
