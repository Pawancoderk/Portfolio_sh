"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileCode, Play, CheckCircle2, Loader2, Sparkles, FolderGit2 } from "lucide-react";

interface FileItem {
  name: string;
  lang: "python" | "typescript" | "bash";
  iconColor: string;
  code: string;
  consoleCmd: string;
  consoleOutput: string[];
}

const FILES: FileItem[] = [
  {
    name: "ai_agent.py",
    lang: "python",
    iconColor: "text-blue-400",
    code: `class CognitiveAgent:
    def __init__(self):
        self.model = "gemini-2.5-pro"
        self.acc_threshold = 0.94
        
    def predict(self, speech_tensor):
        # Quantized CNN inference
        features = extract_mfcc(speech_tensor)
        score = self.model.forward(features)
        
        if score > self.acc_threshold:
            return "MATCH", score
        return "RETRY", 0.0`,
    consoleCmd: "python ai_agent.py --eval",
    consoleOutput: [
      "Initializing PyTorch tensor graph...",
      "Loading model weights: weights/model.bin",
      "Model compiled to TensorRT (Quantized Int8)",
      "Accuracy: 94.2% | Inference Latency: 42ms",
      "STATUS: Model pipeline optimized and running."
    ]
  },
  {
    name: "streaming.ts",
    lang: "typescript",
    iconColor: "text-indigo-400",
    code: `import { streamText } from 'ai';
import { Redis } from '@lib/redis';

export async function POST(req: Request) {
  const { prompt, userSession } = await req.json();
  
  // Rate-limit check at edge
  const limit = await Redis.check(userSession);
  if (!limit.ok) throw new Error("Rate limit exceeded");

  return streamText({
    model: 'gemini-2.5-flash',
    prompt: sanitize(prompt),
    onFinish: (text) => Redis.logUsage(userSession)
  });
}`,
    consoleCmd: "npm run dev:edge",
    consoleOutput: [
      "▲ Next.js 16.2 (Turbopack Edge Runtime)",
      "- Middleware connected to Vercel Redis Cache",
      "- Edge Endpoint ready at /api/chat/stream",
      "✓ POST /api/chat/stream - 200 OK | 18ms",
      "✓ Streaming tokens generated: 142/sec"
    ]
  },
  {
    name: "deploy.sh",
    lang: "bash",
    iconColor: "text-emerald-400",
    code: `#!/bin/bash
# High-Performance Deployment Flow

echo "📦 Packaging serverless endpoints..."
next build

echo "🐳 Spinning up container cluster..."
docker-compose up -d --scale backend=3

echo "🚀 Propagating edge routes..."
wrangler deploy --env production

echo "✓ Health Check: 100% Operational"`,
    consoleCmd: "./deploy.sh --prod",
    consoleOutput: [
      "📦 Packaging serverless endpoints...",
      "▲ Next.js build compilation succeeded.",
      "🐳 Spinning up container cluster...",
      "Creating network 'portfolio_default'...",
      "Container backend-1  Started [OK]",
      "🚀 Propagating edge routes to Cloudflare...",
      "✓ Live at https://pawankumar.dev [100% OK]"
    ]
  }
];

export function DevStudio() {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const activeFile = FILES[activeFileIndex];
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs, isRunning]);

  // Handle mock terminal run execution
  const runCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsDone(false);
    setTerminalLogs([`$ ${activeFile.consoleCmd}`]);

    let i = 0;
    const outputs = activeFile.consoleOutput;
    
    const interval = setInterval(() => {
      if (i < outputs.length) {
        setTerminalLogs((prev) => [...prev, outputs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsDone(true);
      }
    }, 700);
  };

  // Reset terminal logs when active file changes
  useEffect(() => {
    setTerminalLogs([`$ ${activeFile.consoleCmd}`, `// Click 'RUN CODE' to execute file diagnostic.`]);
    setIsDone(false);
    setIsRunning(false);
  }, [activeFileIndex]);

  // Syntax highlighting markup builder (Python, TS, Bash)
  const renderCodeLines = () => {
    return activeFile.code.split("\n").map((line, i) => {
      // Basic highlighting styling mapping
      let highlightedLine = <span className="text-zinc-350">{line}</span>;

      if (activeFile.lang === "python") {
        if (line.includes("class ") || line.includes("def ") || line.includes("return ") || line.includes("if ") || line.includes("import ")) {
          // Highlight keywords
          const parts = line.split(/(class |def |return |if |import )/g);
          highlightedLine = (
            <span>
              {parts.map((p, idx) => {
                if (["class ", "def ", "return ", "if ", "import "].includes(p)) {
                  return <span key={idx} className="text-purple-400 font-semibold">{p}</span>;
                }
                if (p.includes("__init__") || p.includes("predict")) {
                  return <span key={idx} className="text-blue-400">{p}</span>;
                }
                return <span key={idx} className="text-zinc-300">{p}</span>;
              })}
            </span>
          );
        } else if (line.includes("#")) {
          highlightedLine = <span className="text-zinc-500 italic">{line}</span>;
        }
      } else if (activeFile.lang === "typescript") {
        if (line.includes("import ") || line.includes("export ") || line.includes("async ") || line.includes("function ") || line.includes("await ") || line.includes("return ") || line.includes("throw ")) {
          const parts = line.split(/(import |export |async |function |await |return |throw |from )/g);
          highlightedLine = (
            <span>
              {parts.map((p, idx) => {
                if (["import ", "export ", "async ", "function ", "await ", "return ", "throw ", "from "].includes(p)) {
                  return <span key={idx} className="text-purple-400 font-semibold">{p}</span>;
                }
                return <span key={idx} className="text-zinc-300">{p}</span>;
              })}
            </span>
          );
        } else if (line.includes("//")) {
          highlightedLine = <span className="text-zinc-500 italic">{line}</span>;
        }
      } else if (activeFile.lang === "bash") {
        if (line.startsWith("#")) {
          highlightedLine = <span className="text-zinc-500 italic">{line}</span>;
        } else if (line.includes("echo ")) {
          const parts = line.split(/(echo )/g);
          highlightedLine = (
            <span>
              <span className="text-purple-400 font-semibold">{parts[1]}</span>
              <span className="text-emerald-400">{parts[2]}</span>
            </span>
          );
        } else {
          highlightedLine = <span className="text-blue-300">{line}</span>;
        }
      }

      return (
        <div key={i} className="flex leading-5 hover:bg-zinc-900/50 px-4 transition-colors">
          <span className="w-6 shrink-0 text-zinc-600 text-right select-none pr-3 text-[10px] tabular-nums font-mono border-r border-dashed border-zinc-900 mr-3">
            {i + 1}
          </span>
          <span className="font-mono text-xs whitespace-pre select-text tracking-wide">{highlightedLine}</span>
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-[480px] bg-zinc-950/80 backdrop-blur-xl border border-dashed border-zinc-800/80 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col font-mono relative select-none">
      
      {/* 1. Window Header HUD bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/40 border-b border-dashed border-zinc-850/80">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500/80" />
          <span className="size-2.5 rounded-full bg-yellow-500/80" />
          <span className="size-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="text-[10px] text-zinc-400 flex items-center gap-1 font-semibold">
          <FolderGit2 className="size-3 text-accent" />
          <span>workspace / pawan-kumar / {activeFile.name}</span>
        </div>
        <div className="size-3 shrink-0" />
      </div>

      <div className="flex flex-1 h-[260px] md:h-[280px]">
        {/* 2. Left Explorer Sidebar */}
        <div className="w-[140px] shrink-0 border-r border-dashed border-zinc-850/80 bg-zinc-950/40 p-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider block px-1.5 mb-2 select-none">
              EXPLORER
            </span>
            {FILES.map((file, idx) => {
              const isActive = activeFileIndex === idx;
              return (
                <button
                  key={file.name}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full text-left px-2 py-1.5 rounded text-[10.5px] flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? "bg-zinc-850 text-foreground font-semibold border-l-2 border-accent"
                      : "text-zinc-400 hover:text-foreground hover:bg-zinc-900/40"
                  }`}
                >
                  <FileCode className={`size-3.5 ${file.iconColor}`} />
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>

          {/* Running code button */}
          <button
            onClick={runCode}
            disabled={isRunning}
            className={`w-full mt-auto py-2 rounded text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-dashed ${
              isRunning
                ? "bg-zinc-900 border-zinc-850 text-zinc-500 cursor-not-allowed"
                : isDone
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-accent/10 border-accent/30 text-accent hover:bg-accent/20 hover:border-accent/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.15)]"
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="size-3 animate-spin" />
                <span>Running...</span>
              </>
            ) : isDone ? (
              <>
                <CheckCircle2 className="size-3" />
                <span>Success</span>
              </>
            ) : (
              <>
                <Play className="size-3 fill-current" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>

        {/* 3. Code Editor Window */}
        <div className="flex-1 py-3 overflow-y-auto bg-zinc-950/20 select-text scrollbar-thin">
          {renderCodeLines()}
        </div>
      </div>

      {/* 4. Bottom Terminal Console Drawer */}
      <div className="border-t border-dashed border-zinc-850/80 bg-zinc-950 p-3 h-[130px] flex flex-col justify-between select-none">
        <div className="flex items-center justify-between border-b border-dashed border-zinc-900 pb-1 mb-1.5">
          <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <Terminal className="size-3" /> TERMINAL OUTPUT
          </span>
          {isRunning && (
            <span className="text-[8.5px] text-accent flex items-center gap-1 animate-pulse">
              <Sparkles className="size-2.5 animate-spin [animation-duration:3s]" /> EXECUTION ACTIVE
            </span>
          )}
        </div>
        
        {/* Terminal Log Console */}
        <div className="flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed text-zinc-400 space-y-1 scrollbar-none pr-1">
          {terminalLogs.map((log, index) => {
            const isCmd = log.startsWith("$");
            const isError = log.includes("Error:") || log.includes("RETRY");
            const isSuccess = log.includes("✓") || log.includes("STATUS:") || log.includes("[OK]");
            return (
              <div 
                key={index} 
                className={`${
                  isCmd 
                    ? "text-zinc-200 font-semibold" 
                    : isError 
                    ? "text-red-400" 
                    : isSuccess 
                    ? "text-emerald-400" 
                    : "text-zinc-450"
                }`}
              >
                {log}
              </div>
            );
          })}
          <div ref={logsEndRef} />
        </div>
      </div>
      
    </div>
  );
}
