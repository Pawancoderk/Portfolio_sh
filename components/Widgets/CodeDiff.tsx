"use client";

import React, { useState, useEffect } from "react";
import { GitPullRequest, Check, Merge, RefreshCw, GitBranch, GitCommit, FileCode, Play, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeLine {
  type: "addition" | "deletion" | "normal";
  content: string;
  numBefore?: number;
  numAfter?: number;
}

const FILE_A_DIFF: CodeLine[] = [
  { type: "normal", numBefore: 12, numAfter: 12, content: "import redis from '@/lib/redis';" },
  { type: "normal", numBefore: 13, numAfter: 13, content: "import { NextResponse } from 'next/server';" },
  { type: "normal", numBefore: 14, numAfter: 14, content: "" },
  { type: "deletion", numBefore: 15, content: "- export async function GET(req: Request) {" },
  { type: "deletion", numBefore: 16, content: "-   // Todo: add rate limits later before deploying" },
  { type: "deletion", numBefore: 17, content: "-   return NextResponse.json({ success: true });" },
  { type: "addition", numAfter: 15, content: "+ export async function GET(req: Request) {" },
  { type: "addition", numAfter: 16, content: "+   const ip = req.headers.get('x-forwarded-for') || 'anon';" },
  { type: "addition", numAfter: 17, content: "+   const limit = 100; // max requests" },
  { type: "addition", numAfter: 18, content: "+   const windowSize = 3600; // 1 hour in seconds" },
  { type: "addition", numAfter: 19, content: "+ " },
  { type: "addition", numAfter: 20, content: "+   const key = `ratelimit:${ip}`;" },
  { type: "addition", numAfter: 21, content: "+   const currentRequests = await redis.incr(key);" },
  { type: "addition", numAfter: 22, content: "+ " },
  { type: "addition", numAfter: 23, content: "+   if (currentRequests === 1) {" },
  { type: "addition", numAfter: 24, content: "+     await redis.expire(key, windowSize);" },
  { type: "addition", numAfter: 25, content: "+   }" },
  { type: "addition", numAfter: 26, content: "+ " },
  { type: "addition", numAfter: 27, content: "+   if (currentRequests > limit) {" },
  { type: "addition", numAfter: 28, content: "+     return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 });" },
  { type: "addition", numAfter: 29, content: "+   }" },
  { type: "addition", numAfter: 30, content: "+ " },
  { type: "addition", numAfter: 31, content: "+   return NextResponse.json({ success: true, remaining: limit - currentRequests });" },
  { type: "normal", numBefore: 18, numAfter: 32, content: "}" },
];

const FILE_B_DIFF: CodeLine[] = [
  { type: "normal", numBefore: 1, numAfter: 1, content: "import { createClient } from 'redis';" },
  { type: "normal", numBefore: 2, numAfter: 2, content: "" },
  { type: "deletion", numBefore: 3, content: "- const client = createClient();" },
  { type: "addition", numAfter: 3, content: "+ const client = createClient({" },
  { type: "addition", numAfter: 4, content: "+   url: process.env.REDIS_URL || 'redis://localhost:6379'," },
  { type: "addition", numAfter: 5, content: "+   socket: {" },
  { type: "addition", numAfter: 6, content: "+     reconnectStrategy: (retries) => Math.min(retries * 50, 2000)" },
  { type: "addition", numAfter: 7, content: "+   }" },
  { type: "addition", numAfter: 8, content: "+ });" },
  { type: "normal", numBefore: 4, numAfter: 9, content: "" },
  { type: "normal", numBefore: 5, numAfter: 10, content: "client.on('error', (err) => console.log('Redis Client Error', err));" },
];

export function CodeDiff() {
  const [selectedFile, setSelectedFile] = useState<"limiter" | "client">("limiter");
  const [merged, setMerged] = useState(false);
  const [merging, setMerging] = useState(false);
  const [mergeLogs, setMergeLogs] = useState<string[]>([]);
  const [mergeStep, setMergeStep] = useState(0);

  const activeDiff = selectedFile === "limiter" ? FILE_A_DIFF : FILE_B_DIFF;

  // Run dynamic highlights
  const highlightCode = (text: string) => {
    // Strip diff markers +/- from highlights but keep them inside string
    const cleanText = text.startsWith("+ ") || text.startsWith("- ") ? text.substring(2) : text;
    const prefix = text.startsWith("+ ") ? "+ " : text.startsWith("- ") ? "- " : "";

    let html = cleanText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 1. Highlight strings
    html = html.replace(/(['"`])(.*?)\1/g, '<span class="text-amber-400 font-sans">$1$2$1</span>');
    // 2. Keywords
    html = html.replace(/\b(const|let|var|function|async|await|return|import|from|export|if|else)\b/g, '<span class="text-purple-400 font-bold">$1</span>');
    // 3. System objects / variables
    html = html.replace(/\b(NextResponse|Request|Response|redis|client|process|env|Math)\b/g, '<span class="text-sky-400">$1</span>');
    // 4. Methods / API calls
    html = html.replace(/\b(json|get|incr|expire|createClient|on|log|min)\b/g, '<span class="text-blue-400 font-sans">$1</span>');
    // 5. Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="text-yellow-500 font-bold">$1</span>');
    // 6. Comments
    html = html.replace(/(\/\/.*)/g, '<span class="text-zinc-500 italic">$1</span>');

    return (
      <span className="font-mono">
        <span className="text-zinc-600 select-none mr-1">{prefix}</span>
        <span dangerouslySetInnerHTML={{ __html: html }} />
      </span>
    );
  };

  const handleMerge = () => {
    if (merged || merging) return;
    setMerging(true);
    setMergeStep(1);
    setMergeLogs(["[INFO] Initiating branch checkout patch-1..."]);

    const steps = [
      { text: "[OK] Linter checks completed. (0 errors)", delay: 400 },
      { text: "[OK] Test suite passed. 14/14 tests successful.", delay: 800 },
      { text: "[INFO] Compiling production build tree...", delay: 1200 },
      { text: "[OK] Merge commit 0x8a92f committed successfully.", delay: 1600 },
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setMergeLogs((prev) => [...prev, step.text]);
        setMergeStep(idx + 2);
        if (idx === steps.length - 1) {
          setMerging(false);
          setMerged(true);
        }
      }, step.delay);
    });
  };

  const handleReset = () => {
    setMerged(false);
    setMergeLogs([]);
    setMergeStep(0);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/70 border border-zinc-850 rounded-xl overflow-hidden font-mono text-[11px] leading-normal text-zinc-300 shadow-xl relative">
      
      {/* 1. Header: Clean Repository & PR Branch Telemetry */}
      <div className="flex items-center justify-between p-3 bg-zinc-900/90 border-b border-zinc-850 select-none">
        <div className="flex items-center gap-2">
          <GitPullRequest className="size-3.5 text-accent animate-pulse" />
          <div className="font-mono text-[10px]">
            <span className="text-zinc-500 mr-1.5">rate-limiter:</span>
            <span className="text-zinc-200 font-bold">patch-1</span>
            <span className="text-zinc-500 px-1">&rarr;</span>
            <span className="text-accent font-bold">main</span>
          </div>
        </div>
        <span className="text-[8px] bg-accent-muted border border-accent/25 px-1.5 py-0.5 rounded text-accent font-bold tracking-wider uppercase">
          Review
        </span>
      </div>

      {/* 2. File Tabs */}
      <div className="flex bg-zinc-950/50 border-b border-zinc-900/90 p-1 gap-1 select-none">
        <button
          onClick={() => setSelectedFile("limiter")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded text-[9.5px] cursor-pointer transition-all ${
            selectedFile === "limiter"
              ? "bg-zinc-900 text-accent font-semibold border border-zinc-800"
              : "text-zinc-500 hover:text-zinc-355 hover:bg-zinc-900/30"
          }`}
        >
          <FileCode className="size-3 text-zinc-450" />
          <span>rate-limiter.ts</span>
          <span className="text-[8px] text-emerald-500 font-bold ml-0.5">+19 -3</span>
        </button>
        <button
          onClick={() => setSelectedFile("client")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded text-[9.5px] cursor-pointer transition-all ${
            selectedFile === "client"
              ? "bg-zinc-900 text-accent font-semibold border border-zinc-800"
              : "text-zinc-500 hover:text-zinc-355 hover:bg-zinc-900/30"
          }`}
        >
          <FileCode className="size-3 text-zinc-450" />
          <span>redis-client.ts</span>
          <span className="text-[8px] text-emerald-500 font-bold ml-0.5">+6 -1</span>
        </button>
      </div>

      {/* 3. Interactive Code Diff Viewport */}
      <div className="flex-1 overflow-auto p-2 scrollbar-none h-[210px] md:h-[230px] bg-zinc-950 text-left relative">
        <AnimatePresence mode="wait">
          {!merging && !merged ? (
            <motion.div
              key="code-diff-table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-0.5 font-mono"
            >
              {activeDiff.map((line, idx) => {
                let lineBg = "";
                let lineText = "text-zinc-400";
                if (line.type === "addition") {
                  lineBg = "bg-emerald-950/20 border-l-2 border-emerald-500";
                  lineText = "text-emerald-300";
                } else if (line.type === "deletion") {
                  lineBg = "bg-rose-950/25 border-l-2 border-rose-500";
                  lineText = "text-rose-450 line-through decoration-rose-900";
                }

                return (
                  <div key={idx} className={`flex items-stretch w-full py-0.5 ${lineBg} hover:bg-zinc-900/60 transition-colors`}>
                    <div className="w-7 shrink-0 text-zinc-650 select-none text-right pr-2 border-r border-zinc-900/50 tabular-nums text-[8.5px]">
                      {line.numBefore || ""}
                    </div>
                    <div className="w-7 shrink-0 text-zinc-650 select-none text-right pr-2 border-r border-zinc-900/50 tabular-nums text-[8.5px]">
                      {line.numAfter || ""}
                    </div>
                    <pre className={`pl-3.5 whitespace-pre text-[10px] sm:text-[10.5px] ${lineText}`}>
                      {highlightCode(line.content)}
                    </pre>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="compiling-viewport"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950 flex flex-col justify-center p-5 select-none"
            >
              {merging ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                    <RefreshCw className="size-3.5 text-accent animate-spin" />
                    <span className="font-bold text-[10px] text-zinc-350">EXECUTING PR MERGE TELEMETRY...</span>
                  </div>
                  <div className="space-y-1.5 text-[9px] text-zinc-400">
                    {mergeLogs.map((log, i) => (
                      <p key={i} className="text-zinc-400">&gt; {log}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="flex flex-col items-center justify-center text-center space-y-3"
                >
                  <div className="size-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <Check className="size-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-250 text-xs uppercase tracking-wider">Pull Request Merged</h4>
                    <p className="text-[9px] text-zinc-550 mt-1">Branch patch-1 has been squashed and deleted.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Controls Bar */}
      <div className="p-3 bg-zinc-900/40 border-t border-zinc-900/90 flex items-center justify-between">
        <div className="text-[9.5px] text-zinc-500 select-none">
          {merged ? (
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <Check className="size-3.5" /> MERGED SUCCESS
            </span>
          ) : merging ? (
            <span className="text-accent flex items-center gap-1.5">
              <RefreshCw className="size-3 animate-spin" /> Step {mergeStep}/5
            </span>
          ) : (
            <span className="text-zinc-500 flex items-center gap-1">
              <AlertCircle className="size-3" /> No conflicts.
            </span>
          )}
        </div>

        <div>
          <AnimatePresence mode="wait">
            {!merged ? (
              <motion.button
                key="merge-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleMerge}
                disabled={merging}
                className="px-3.5 py-1.5 bg-accent hover:bg-accent-hover text-zinc-950 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none rounded font-bold text-[9.5px] flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_var(--accent-muted)] transition-all"
              >
                {merging ? (
                  <>
                    <RefreshCw className="size-3 animate-spin" />
                    <span>Compiling...</span>
                  </>
                ) : (
                  <>
                    <Merge className="size-3.5" />
                    <span>Approve & Merge</span>
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                key="reset-btn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={handleReset}
                className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-400 hover:text-foreground rounded font-bold text-[9.5px] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Reset Review</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
