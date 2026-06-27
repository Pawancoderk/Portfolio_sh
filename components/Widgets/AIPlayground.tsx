"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Terminal as TerminalIcon, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const COMMAND_MAP: Record<string, string> = {
  "/about": "Pawan Kumar is an ambitious Full Stack Developer and AI Builder. Although early in his career, he is focused on building production-ready web platforms and integrating smart AI pipelines. He is currently pursuing a Computer Science degree while designing user-centric interfaces.",
  "/skills": "PAWAN'S TECH CONSOLE:\n\n• Frontend: Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis\n• Backend: Node.js, Express.js, PostgreSQL (Prisma), MongoDB (Mongoose), Socket.io\n• AI Tooling: Gemini API, LangChain, vector search integrations, prompt engineering\n• Core: Clean architecture, modular components, and accessible UX.",
  "/projects": "FEATURED PRODUCTS:\n\n1. GitGenius: AI-powered CLI tool analyzing Git history and commits using Gemini.\n2. FlowPay: Full-stack simulated banking engine with ledger tracking and Docker container deployments.\n3. Feed-Wall: SaaS dashboard embedding analytics widgets and generating AI-summarized user feedback.",
  "/contact": "You can connect with Pawan directly at:\n\n• Email: pawan@example.com\n• LinkedIn: linkedin.com/in/pawankumar\n• GitHub: github.com/pawankumar\n• Twitter: @pawandev",
};

export function AIPlayground() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Connection established. I am Pawan's AI console agent. How can I assist your engineering inquiry?\n\nTry typing /about, /skills, /projects, or /contact, or click one of the shortcuts below.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCommand = (cmd: string) => {
    const sanitizedCmd = cmd.trim().toLowerCase();
    
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: cmd }]);
    setIsTyping(true);

    // Simulate AI prompt processing delay
    setTimeout(() => {
      let reply = "Command not recognized. Type /about, /skills, /projects, or /contact to query Pawan's index.";
      
      // Match keywords in user query
      if (sanitizedCmd.includes("about") || sanitizedCmd.includes("who is")) {
        reply = COMMAND_MAP["/about"];
      } else if (sanitizedCmd.includes("skills") || sanitizedCmd.includes("tech") || sanitizedCmd.includes("stack")) {
        reply = COMMAND_MAP["/skills"];
      } else if (sanitizedCmd.includes("projects") || sanitizedCmd.includes("portfolio") || sanitizedCmd.includes("built")) {
        reply = COMMAND_MAP["/projects"];
      } else if (sanitizedCmd.includes("contact") || sanitizedCmd.includes("email") || sanitizedCmd.includes("hire")) {
        reply = COMMAND_MAP["/contact"];
      } else if (COMMAND_MAP[sanitizedCmd]) {
        reply = COMMAND_MAP[sanitizedCmd];
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input;
    setInput("");
    handleCommand(cmd);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/60 text-zinc-100 rounded-lg overflow-hidden border border-zinc-900 font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between bg-zinc-900/60 px-4 py-2 border-b border-zinc-900 select-none">
        <div className="flex items-center gap-2 text-zinc-400">
          <TerminalIcon className="size-3.5" />
          <span>ai-prompt-agent.sh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-accent animate-pulse" />
          <span className="text-[10px] text-zinc-500 uppercase">LLM-Local</span>
        </div>
      </div>

      {/* Terminal Screen Console */}
      <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none h-[220px] md:h-[260px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="text-[10px] text-zinc-500 mb-1">
              {msg.sender === "user" ? "GUEST@CONSOLE" : "SYSTEM@PAWAN"}
            </div>
            <div
              className={`rounded px-3 py-2 max-w-[85%] whitespace-pre-line leading-relaxed ${
                msg.sender === "user"
                  ? "bg-zinc-800 border border-zinc-700 text-zinc-200"
                  : "bg-zinc-900/50 border border-zinc-900 text-zinc-300"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="text-[10px] text-zinc-500 mb-1">SYSTEM@PAWAN</div>
            <div className="bg-zinc-900/50 border border-zinc-900 text-zinc-500 rounded px-3 py-2 flex items-center gap-1">
              <span className="size-1 bg-zinc-500 rounded-full animate-bounce" />
              <span className="size-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="size-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Action Macros Shortcuts */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-2 select-none border-t border-zinc-900/50 pt-2 bg-zinc-900/20">
        <button
          onClick={() => handleCommand("/about")}
          className="px-2 py-1 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-[10px] rounded cursor-pointer transition-colors"
        >
          /about
        </button>
        <button
          onClick={() => handleCommand("/skills")}
          className="px-2 py-1 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-[10px] rounded cursor-pointer transition-colors"
        >
          /skills
        </button>
        <button
          onClick={() => handleCommand("/projects")}
          className="px-2 py-1 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-[10px] rounded cursor-pointer transition-colors"
        >
          /projects
        </button>
        <button
          onClick={() => handleCommand("/contact")}
          className="px-2 py-1 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-[10px] rounded cursor-pointer transition-colors"
        >
          /contact
        </button>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-3 bg-zinc-900/40 border-t border-zinc-900"
      >
        <span className="text-zinc-500 font-bold select-none">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about skills, projects, contact info..."
          className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder-zinc-600 caret-accent"
        />
        <button
          type="submit"
          className="p-1.5 bg-zinc-900 border border-zinc-850 rounded hover:bg-zinc-800 text-zinc-400 hover:text-foreground cursor-pointer transition-colors"
        >
          <Send className="size-3.5" />
        </button>
      </form>
    </div>
  );
}
