"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { DashedFrame } from "@/components/UI/DashedFrame";
import { CardSpotlight } from "@/components/UI/CardSpotlight";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { CustomCursor } from "@/components/UI/CustomCursor";

const ARTICLES = [
  {
    slug: "pytorch-quantization",
    title: "Quantizing PyTorch ResNet CNN Models for Production",
    desc: "A deep dive into FP32 to INT8 weight quantization mechanisms. Learn how we achieved a 75% reduction in model size while saving validation accuracy via QAT.",
    category: "Machine Learning / PyTorch",
    date: "June 20, 2026",
    readTime: "8 min read",
    tech: ["PyTorch", "QAT", "Inference Opt"],
  },
  {
    slug: "3d-mesh-generation",
    title: "Procedural 3D Mesh Generation from JSON Layout Graphs",
    desc: "How to parse 2D spatial coordinate JSON matrices and dynamically generate Three.js WebGL mesh nodes on the client, minimizing server GPU rendering costs.",
    category: "Graphics / Three.js",
    date: "May 14, 2026",
    readTime: "12 min read",
    tech: ["Three.js", "WebGL", "LLM JSON Schema"],
  },
];

export default function BlogIndex() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      <CustomCursor />
      
      {/* HUD Header */}
      <header className="sticky top-0 z-30 bg-background/70 backdrop-blur border-b border-dashed border-zinc-850 px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-foreground cursor-pointer transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>&gt;_ BACK_TO_CONSOLE</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-wider text-accent">&gt;_ PAWAN@BLOG</span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Container */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-1 w-full max-w-4xl mx-auto p-6 space-y-8 select-text"
      >
        {/* Title */}
        <div className="space-y-2 text-left select-none">
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-accent animate-pulse" />
            <span>Articles // Production Logfiles</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
            Engineering RFCs & Tech Articles
          </h1>
          <p className="text-zinc-500 text-xs font-mono">
            Pawan Kumar's engineering insights, benchmarks, and architecture breakdowns.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 15 }}
            >
              <CardSpotlight>
                <div
                  onClick={() => router.push(`/blog/${article.slug}`)}
                  className="border border-dashed border-zinc-850 bg-card/45 backdrop-blur-xl rounded-xl p-5 hover:border-zinc-700/80 transition-colors block text-left cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-zinc-900 pb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 font-mono text-[9px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          <span>{article.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-foreground hover:text-accent font-sans transition-colors leading-tight">
                      {article.title}
                    </h2>
                    
                    <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-sans">
                      {article.desc}
                    </p>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-dashed border-zinc-900/60 font-mono text-[9px]">
                      <div className="flex flex-wrap gap-1.5">
                        {article.tech.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 bg-zinc-900/60 border border-zinc-850 text-zinc-500 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-accent flex items-center gap-0.5 font-bold hover:text-accent-hover transition-colors">
                        <span>Read Article</span>
                        <ChevronRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-dashed border-zinc-850 px-6 py-4 flex items-center justify-between font-mono text-[10px] text-zinc-500 select-none bg-background/50">
        <span>© 2026 PAWAN KUMAR</span>
        <span>SYS_MODE: BLOG_INDEX</span>
      </footer>
    </div>
  );
}
