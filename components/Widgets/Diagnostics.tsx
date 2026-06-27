"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Terminal, Cpu, Clock, RefreshCw, Activity, ShieldAlert, Cpu as CpuIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DiagnosticsProps {
  dragX?: number;
  dragY?: number;
}

interface LogEntry {
  id: string;
  time: string;
  message: string;
  type: "info" | "success" | "warn" | "log";
}

const STATIC_LOG_POOL = [
  { message: "NETWORK_PING: AWS Mumbai roundtrip stable", type: "success" },
  { message: "HEAP_MEMORY: usage 38.6MB (garbage collector idle)", type: "info" },
  { message: "THREAD_POOL: stable thread queue at 60Hz", type: "success" },
  { message: "SOCKET_CONN: Telemetry socket active", type: "info" },
  { message: "CPU_TEMPERATURE: core cluster average 43.8°C", type: "info" },
  { message: "THEME_KERNEL: client variables loaded", type: "success" },
  { message: "RESOURCE_SYNC: Github commit diffs parsed", type: "success" },
  { message: "SYS_SECURITY: token verification status OK", type: "info" },
];

export function Diagnostics({ dragX = 0, dragY = 0 }: DiagnosticsProps) {
  const [time, setTime] = useState("");
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const [cpuLoad, setCpuLoad] = useState<number[]>([15, 20, 25, 18, 12, 30, 22, 16, 20, 14]);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", time: "15:17:01", message: "SYSTEM_KERNEL: initial boot sequence complete", type: "success" },
    { id: "2", time: "15:17:02", message: "PHYSICS_ENG: Framer Motion threads mounted", type: "info" },
    { id: "3", time: "15:17:05", message: "DIAGNOSTICS: real-time telemetry online", type: "success" },
  ]);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Keep a running clock in India Standard Time
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const,
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate FPS, Latency, and CPU load fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 3));
      setLatency(Math.floor(8 + Math.random() * 8));
      setCpuLoad((prev) => prev.map(() => Math.floor(10 + Math.random() * 40)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Page Views
  const [views, setViews] = useState(1248);
  useEffect(() => {
    const localViews = localStorage.getItem("pawan_portfolio_views");
    if (localViews) {
      setViews(parseInt(localViews));
    }
  }, []);

  // Helper to add timestamp
  const getLogTime = () => {
    const date = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  // Add event logger for canvas drag displacement
  const lastLoggedDrag = useRef({ x: 0, y: 0 });
  useEffect(() => {
    // Only log significant dragging movements to avoid log flood
    if (Math.abs(dragX - lastLoggedDrag.current.x) > 40 || Math.abs(dragY - lastLoggedDrag.current.y) > 40) {
      lastLoggedDrag.current = { x: dragX, y: dragY };
      const newLog: LogEntry = {
        id: Math.random().toString(),
        time: getLogTime(),
        message: `CANVAS_DRAG: X=${dragX.toFixed(0)}px Y=${dragY.toFixed(0)}px`,
        type: "log"
      };
      setLogs((prev) => [...prev.slice(-15), newLog]);
    }
  }, [dragX, dragY]);

  // Periodic random logs to simulate system telemetry activity
  useEffect(() => {
    const logInterval = setInterval(() => {
      const randomLogItem = STATIC_LOG_POOL[Math.floor(Math.random() * STATIC_LOG_POOL.length)];
      const newLog: LogEntry = {
        id: Math.random().toString(),
        time: getLogTime(),
        message: randomLogItem.message,
        type: randomLogItem.type as any,
      };
      setLogs((prev) => [...prev.slice(-15), newLog]);
    }, 5000);
    return () => clearInterval(logInterval);
  }, []);

  // Auto-scroll logs container to bottom locally without jumping the main window
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col gap-3 h-full text-xs font-mono select-none text-left">
      
      {/* Top Diagnostics Panels */}
      <div className="grid grid-cols-12 gap-3 flex-1 items-stretch min-h-[120px]">
        
        {/* Left Side: Stats Grid (Col span 7) */}
        <div className="col-span-12 xs:col-span-7 grid grid-cols-2 gap-2.5">
          {/* Time widget */}
          <div className="border border-dashed border-zinc-800 bg-zinc-900/10 p-2 rounded flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider flex items-center gap-1">
              <Clock className="size-3 text-zinc-400" /> Time (IST)
            </span>
            <span className="text-[13px] font-bold tabular-nums text-foreground mt-1">
              {time || "--:--:--"}
            </span>
            <span className="text-[8px] text-zinc-500 font-sans mt-0.5">GMT+5:30</span>
          </div>

          {/* Latency */}
          <div className="border border-dashed border-zinc-800 bg-zinc-900/10 p-2 rounded flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider flex items-center gap-1">
              <RefreshCw className="size-3 text-zinc-400" /> Latency
            </span>
            <span className="text-[13px] font-bold tabular-nums text-foreground mt-1">
              {latency}ms
            </span>
            <span className="text-[8px] text-zinc-500 font-sans mt-0.5">Node: Mumbai-AWS</span>
          </div>

          {/* Core FPS */}
          <div className="border border-dashed border-zinc-800 bg-zinc-900/10 p-2 rounded flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider flex items-center gap-1">
              <Cpu className="size-3 text-zinc-400" /> FPS
            </span>
            <span className="text-[13px] font-bold tabular-nums text-emerald-500 mt-1">
              {fps} <span className="text-[9px] text-zinc-500 font-normal">Hz</span>
            </span>
            <span className="text-[8px] text-zinc-500 font-sans mt-0.5">Status: Stable</span>
          </div>

          {/* Page views */}
          <div className="border border-dashed border-zinc-800 bg-zinc-900/10 p-2 rounded flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider">Page Views</span>
            <span className="text-[13px] font-bold text-accent mt-1 tabular-nums">
              {views.toLocaleString()}
            </span>
            <span className="text-[8px] text-zinc-500 font-sans mt-0.5">Local Session: +1</span>
          </div>
        </div>

        {/* Right Side: Radar and CPU Usage Area (Col span 5) */}
        <div className="col-span-12 xs:col-span-5 border border-dashed border-zinc-800 bg-zinc-900/20 rounded p-2 flex flex-col justify-between items-center relative overflow-hidden">
          
          {/* Radar scope animation background */}
          <div className="absolute top-2 right-2 w-14 h-14 border border-emerald-500/25 rounded-full flex items-center justify-center">
            <div className="absolute w-14 h-[1px] bg-gradient-to-r from-transparent to-emerald-500/40 animate-radar origin-center z-0" />
            <div className="absolute size-9 border border-dashed border-emerald-500/10 rounded-full" />
            <div className="absolute size-4 border border-emerald-500/15 rounded-full" />
            {/* Blinking signal dot */}
            <span className="absolute top-3 left-4 size-1 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute bottom-4 right-3 size-1 bg-emerald-400 rounded-full animate-pulse" />
          </div>

          <div className="w-full flex flex-col items-start z-10">
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <CpuIcon className="size-3 text-emerald-500" /> CPU Core Activity
            </span>
            
            {/* Simulated CPU Bar chart visualizer */}
            <div className="w-full h-8 flex items-end justify-start gap-1 mt-1">
              {cpuLoad.map((val, idx) => (
                <motion.div
                  key={idx}
                  style={{ height: `${val}%` }}
                  animate={{ height: `${val}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                  className="flex-1 min-w-[3px] bg-emerald-500/35 rounded-t-[1px] hover:bg-accent transition-colors"
                />
              ))}
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-[8px] text-zinc-500 pt-1 mt-1.5 border-t border-dashed border-zinc-900 z-10">
            <span>MEM: 38.6MB</span>
            <span className="text-emerald-500 font-bold">GRID SYNCED</span>
          </div>
        </div>
      </div>

      {/* Logging Terminal Terminal Streamer */}
      <div className="border border-zinc-800 bg-zinc-950 p-2.5 rounded-lg flex flex-col font-mono text-[9px] text-zinc-400 min-h-[90px] relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-1.5 text-zinc-500">
          <span className="flex items-center gap-1">
            <Activity className="size-3 text-accent animate-pulse" />
            <span>CONSOLE_LOG_STREAM</span>
          </span>
          <span className="text-[8px] uppercase tracking-wider">Telemetry Stream</span>
        </div>

        {/* Streaming entries container */}
        <div 
          ref={logsContainerRef}
          className="flex-1 overflow-y-auto max-h-[50px] space-y-1.5 scrollbar-none"
        >
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-start gap-1.5 leading-relaxed"
              >
                <span className="text-zinc-650 tabular-nums">[{log.time}]</span>
                <span 
                  className={
                    log.type === "success" 
                      ? "text-emerald-400" 
                      : log.type === "warn" 
                      ? "text-yellow-500" 
                      : log.type === "log" 
                      ? "text-accent font-semibold"
                      : "text-zinc-400"
                  }
                >
                  &gt; {log.message}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
