"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Terminal, ChevronRight, Check } from "lucide-react";
import { DashedFrame } from "@/components/UI/DashedFrame";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { CustomCursor } from "@/components/UI/CustomCursor";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ARTICLES_CONTENT: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: React.ReactNode;
}> = {
  "pytorch-quantization": {
    title: "Quantizing PyTorch ResNet CNN Models for Production",
    category: "Machine Learning / PyTorch",
    date: "June 20, 2026",
    readTime: "8 min read",
    content: (
      <div className="space-y-6 text-zinc-400 leading-relaxed font-sans text-left">
        <p>
          Moving deep learning models into production requires balancing execution speed, payload size, and hardware costs. For our <em>Deep Audio Classification CNN</em>, running raw FP32 (32-bit floating point) weights serverless was causing latency spikes (cold starts) and inflating cloud billing.
        </p>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          1. The Mathematics of INT8 Quantization
        </h3>
        <p>
          Quantization maps high-precision FP32 parameters to low-precision 8-bit integers (INT8). The linear mapping formula converts real values $r$ into quantized values $q$ using a scale factor $S$ and an offset zero-point $Z$:
        </p>
        <div className="bg-zinc-950/60 p-4 border border-dashed border-zinc-850 rounded-lg font-mono text-xs text-accent">
          q = clip(round(r / S) + Z, -128, 127)
        </div>
        <p>
          The scale factor $S$ matches the real value range to the integer space, while $Z$ aligns the real number $0$ with a specific integer coordinate.
        </p>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          2. Post-Training Quantization vs Quantization-Aware Training (QAT)
        </h3>
        <p>
          Initially, we applied Post-Training Quantization (PTQ), but model accuracy fell from 80% to 74% because model weight ranges were clipping too roughly.
        </p>
        <p>
          To solve this, we implemented <strong>Quantization-Aware Training (QAT)</strong>. During the backward training pass, floating-point weights are adjusted to compensate for quantization errors introduced in forward passes, using fake-quantization operators.
        </p>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          3. PyTorch QAT Pipeline Code Implementation
        </h3>
        <pre className="bg-zinc-950/80 p-4 border border-dashed border-zinc-850 rounded-lg font-mono text-[10px] text-zinc-300 overflow-x-auto text-left">
{`import torch
import torch.nn as nn
from torch.ao.quantization import get_default_qat_qconfig, prepare_qat, convert

class ResNetAudioClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        # PyTorch QAt requires explicit QuantStub & DeQuantStub wrappers
        self.quant = torch.ao.quantization.QuantStub()
        self.dequant = torch.ao.quantization.DeQuantStub()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2)
        )
        self.classifier = nn.Linear(32 * 64 * 64, 50)

    def forward(self, x):
        x = self.quant(x)
        x = self.features(x)
        x = x.view(x.size(0), -1)
        x = self.classifier(x)
        return self.dequant(x)

# Setup model and configure QAT parameters
model = ResNetAudioClassifier()
model.qconfig = get_default_qat_qconfig('fbgemm')
model_prepared = prepare_qat(model, inplace=True)

# Run model training iteration...
# convert weights to integer math on compile
quantized_model = convert(model_prepared.eval(), inplace=False)`}
        </pre>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          4. Benchmarking Improvements
        </h3>
        <p>
          After compiling to quantized INT8 weights, model file weights shrank from <strong>84MB</strong> to <strong>21MB</strong>. More importantly, executing model inference on serverless GPUs cut network runtimes to <strong>42ms</strong> while retaining 80% category validation accuracy.
        </p>
      </div>
    ),
  },
  "3d-mesh-generation": {
    title: "Procedural 3D Mesh Generation from JSON Layout Graphs",
    category: "Graphics / Three.js",
    date: "May 14, 2026",
    readTime: "12 min read",
    content: (
      <div className="space-y-6 text-zinc-400 leading-relaxed font-sans text-left">
        <p>
          Running WebGL scenes dynamically from artificial intelligence graphs can lead to overlapping coordinates and visual gaps. In our <em>Architectural Visualization SaaS</em>, we solved this by implementing a client-side layout compiler that parses declarative JSON graphs and builds procedural Three.js meshes.
        </p>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          1. The Declarative JSON Graph Schema
        </h3>
        <p>
          Rather than letting generative LLMs output raw JavaScript (which frequently crashes due to parser errors), the API responds with a structured schema mapping room nodes and boundary vertices:
        </p>
        <pre className="bg-zinc-950/80 p-4 border border-dashed border-zinc-850 rounded-lg font-mono text-[10px] text-zinc-300 overflow-x-auto text-left">
{`{
  "project": "viz-layout",
  "rooms": [
    { "id": "living", "name": "Living Room", "x": 0, "z": 0, "width": 5, "depth": 4 },
    { "id": "bedroom", "name": "Bedroom", "x": 4, "z": -1, "width": 3, "depth": 4 }
  ],
  "walls": [
    { "from": [-2.5, -2], "to": [2.5, -2] },
    { "from": [2.5, -2], "to": [2.5, 2] }
  ]
}`}
        </pre>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          2. The Spatial Snap joining Algorithm
        </h3>
        <p>
          To prevent coordinate translation offsets generated by Gemini or Claude from leaving open wall gaps, the Three.js mesh builder implements a vertex snap function:
        </p>
        <pre className="bg-zinc-950/80 p-4 border border-dashed border-zinc-850 rounded-lg font-mono text-[10px] text-zinc-300 overflow-x-auto text-left">
{`function snapVertices(v1: number[], v2: number[], threshold = 0.05): number[] {
  const dx = v1[0] - v2[0];
  const dz = v1[1] - v2[1];
  const dist = Math.sqrt(dx * dx + dz * dz);
  
  // Snap coordinates together if within threshold distance
  if (dist < threshold) {
    return [v2[0], v2[1]];
  }
  return v1;
}`}
        </pre>

        <h3 className="font-mono text-xs font-bold text-foreground uppercase border-b border-dashed border-zinc-800 pb-1.5 pt-4">
          3. Procedural Three.js Mesh Compiler
        </h3>
        <p>
          The client parses JSON coordinates to dynamically build 3D mesh instances, applying textures and structural geometry properties client-side. This keeps operational rendering costs at $0.00 since client GPUs handle all active WebGL layouts.
        </p>
      </div>
    ),
  },
};

export default function BlogPostDetail({ params }: PageProps) {
  const router = useRouter();
  const { slug } = React.use(params);
  const article = ARTICLES_CONTENT[slug];

  // Reading progress tracker
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen bg-background relative overflow-hidden flex items-center justify-center font-mono text-xs text-zinc-500">
        <p>Error: Article payload not found [404]</p>
        <button onClick={() => router.push("/blog")} className="mt-4 text-accent hover:underline cursor-pointer">
          &lt; Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden transition-colors duration-300">
      <CustomCursor />
      
      {/* Dynamic Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      {/* HUD Header */}
      <header className="sticky top-0 z-30 bg-background/70 backdrop-blur border-b border-dashed border-zinc-850 px-6 py-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-foreground cursor-pointer transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>&gt;_ BACK_TO_ARTICLES</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline">READING: {slug.toUpperCase()}</span>
          <ThemeToggle />
        </div>
      </header>

      {/* Article Body */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-1 w-full max-w-3xl mx-auto p-6 space-y-6 select-text pt-10"
      >
        <DashedFrame title={`${slug.toUpperCase()} // RFC`} showLeds active>
          <div className="p-6 space-y-6">
            
            {/* Metadata Header */}
            <div className="border-b border-dashed border-zinc-850 pb-4 space-y-3 text-left">
              <span className="text-[9px] font-mono bg-accent/10 border border-accent/25 px-2 py-0.5 rounded text-accent uppercase font-bold tracking-wider">
                {article.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground font-sans leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 font-mono text-[9px] text-zinc-500">
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

            {/* Main content body */}
            <div className="py-2">
              {article.content}
            </div>

            {/* Bottom Back Button */}
            <div className="border-t border-dashed border-zinc-850 pt-4 mt-6 flex justify-between select-none">
              <button
                onClick={() => router.push("/blog")}
                className="px-4 py-2 border border-dashed border-zinc-850 hover:border-zinc-700/80 bg-zinc-900/10 hover:bg-zinc-850/20 text-[10px] font-mono text-zinc-400 hover:text-foreground rounded transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="size-3.5" />
                <span>Return to Blog</span>
              </button>

              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 bg-accent/15 border border-accent/20 hover:bg-accent/25 text-[10px] font-mono text-accent rounded transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Workspace Console</span>
                <ChevronRight className="size-3.5" />
              </button>
            </div>

          </div>
        </DashedFrame>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-dashed border-zinc-850 px-6 py-4 flex items-center justify-between font-mono text-[10px] text-zinc-500 select-none bg-background/50">
        <span>© 2026 PAWAN KUMAR</span>
        <span>SYS_MODE: BLOG_READER</span>
      </footer>
    </div>
  );
}
