"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Terminal,
  Activity,
  Play,
  RotateCw,
  Cpu,
  Volume2,
  ChevronDown
} from "lucide-react";
import { MagneticButton } from "@/components/UI/MagneticButton";

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

interface CaseStudy {
  challenge: string;
  solution: string;
  architecture: string[];
  results: string[];
}

interface Project {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  highlights: string[];
  caseStudy: CaseStudy;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "proj-cnn",
    title: "Deep Audio Classification CNN",
    desc: "Custom ResNet convolutional neural network designed to process audio waveforms, classify spectral prints, and deliver real-time API inference.",
    tech: ["PyTorch", "FastAPI", "Next.js", "Modal", "Tailwind"],
    githubUrl: "https://github.com/pawankumar/audio-classifier-cnn",
    liveUrl: "https://audio-cnn.pankajk.tech/",
    highlights: ["Custom ResNet CNN", "80% Accuracy", "Real-time Inference", "50 Categories"],
    caseStudy: {
      challenge: "Categorizing complex 1D audio waveforms quickly inside standard browser contexts on a highly constrained compute budget.",
      solution: "Transformed raw 1D waveforms into 2D Mel-Spectrogram image tensors. Trained an optimized custom ResNet CNN model with weight-quantization, deploying inference serverless on Modal GPU nodes.",
      architecture: [
        "Client: Next.js Web Audio API captures microphone stream.",
        "Serverless API: FastAPI endpoints hosted on Modal serverless GPUs.",
        "Inference Core: PyTorch ResNet-34 classifier evaluates Mel-Spectrogram image tensor."
      ],
      results: [
        "Accuracy: 80% validation accuracy over 50 category targets.",
        "Latency: Sub-90ms response times on real-time client inference.",
        "Infrastructure: Zero server idling costs due to GPU auto-scaling parameters."
      ],
    },
  },
  {
    id: "proj-saas",
    title: "Architectural Visualization SaaS",
    desc: "Intelligent layout visualizer compiling 2D floor plans into interactive Three.js 3D renders using Gemini and Claude API chains.",
    tech: ["React", "TypeScript", "Puter.js", "Gemini", "Claude"],
    githubUrl: "https://github.com/pawankumar/arch-viz-saas",
    liveUrl: "https://arch-viz.vercel.app",
    highlights: ["Floor Plan → 3D Visualization", "AI Pipeline", "Render History", "Serverless Architecture"],
    caseStudy: {
      challenge: "Manual 3D modeling of floor plans is slow and requires heavy GPU rendering pipelines.",
      solution: "Built an automated parser using Gemini Vision to detect structural rooms. Structured output is fed to Claude to generate Three.js declarative graphs rendered client-side.",
      architecture: [
        "Floor Plan Upload: Vision API parses spatial room coordinate nodes.",
        "LLM Graph Builder: Compiles declarative JSON schemas describing walls, doors, and furniture.",
        "Puter.js Sandbox: Three.js engine parses schemas to render interactive 3D layout graphs locally."
      ],
      results: [
        "Performance: Compiles floor plans to interactive 3D in under 6 seconds.",
        "Operational Cost: Zero backend GPU rendering costs (rendered entirely client-side).",
        "Accuracy: Generates 90% accurate room boundary dimensions."
      ],
    },
  },
];

const CNN_AUDIO_SAMPLES = [
  {
    name: "Ambient Synth Pad",
    category: "Ambient/Drone",
    confidence: 94,
    latency: 42,
    waveform: [20, 30, 45, 60, 50, 40, 55, 75, 90, 80, 60, 45, 30, 25, 40, 60, 80, 95, 70, 50, 45, 35, 20, 15]
  },
  {
    name: "Heavy City Traffic",
    category: "Street Noise",
    confidence: 88,
    latency: 56,
    waveform: [50, 70, 85, 90, 75, 60, 45, 30, 55, 70, 80, 85, 90, 70, 50, 40, 55, 65, 80, 75, 60, 85, 90, 80]
  },
  {
    name: "Mechanical Keyboard",
    category: "Key Click",
    confidence: 97,
    latency: 35,
    waveform: [10, 15, 95, 20, 15, 90, 10, 5, 85, 10, 15, 95, 20, 10, 90, 5, 80, 15, 10, 95, 15, 5, 90, 10]
  }
];

type DetailTabType = "case" | "arch" | "screenshots" | "results";

export function ProjectsGrid() {
  // Accordion expanded states
  const [isExpandedCNN, setIsExpandedCNN] = useState<boolean>(false);
  const [isExpandedSaaS, setIsExpandedSaaS] = useState<boolean>(false);

  // Detail active tabs
  const [activeTabCNN, setActiveTabCNN] = useState<DetailTabType>("case");
  const [activeTabSaaS, setActiveTabSaaS] = useState<DetailTabType>("case");

  // Project 1 (CNN) Inference Simulator States
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const [cnnInferenceState, setCnnInferenceState] = useState<"idle" | "extracting" | "running" | "completed">("idle");
  const [cnnProgress, setCnnProgress] = useState<number>(0);
  const [cnnLogText, setCnnLogText] = useState<string>("System standby.");

  // Project 2 (SaaS) Compiler Simulator States
  const [saasCompilerState, setSaasCompilerState] = useState<"idle" | "uploading" | "parsing" | "compiling" | "completed">("idle");
  const [saasProgress, setSaasProgress] = useState<number>(0);
  const [saasLogText, setSaasLogText] = useState<string>("System standby.");
  const [selectedRoom, setSelectedRoom] = useState<"living" | "bedroom" | "kitchen">("living");
  const [rotationY, setRotationY] = useState<number>(0);

  // CNN Inference Trigger
  const triggerCnnInference = () => {
    setCnnInferenceState("extracting");
    setCnnProgress(0);
    setCnnLogText("Fetching raw audio payload... [0%]");

    const interval = setInterval(() => {
      setCnnProgress((prev) => {
        const next = prev + 5;
        if (next <= 30) {
          setCnnLogText(`Extracting waveform data... [${next}%]`);
          return next;
        } else if (next <= 70) {
          setCnnInferenceState("running");
          setCnnLogText(`Converting audio frame buffer to 2D Mel-Spectrogram tensor... [${next}%]`);
          return next;
        } else if (next <= 95) {
          setCnnLogText(`Evaluating target with quantized ResNet-34 weights... [${next}%]`);
          return next;
        } else {
          clearInterval(interval);
          setCnnInferenceState("completed");
          setCnnLogText(`Inference finished. Classified as: ${CNN_AUDIO_SAMPLES[selectedSampleIdx].category}`);
          return 100;
        }
      });
    }, 100);
  };

  // SaaS Compiler Trigger
  const triggerSaasCompiler = () => {
    setSaasCompilerState("uploading");
    setSaasProgress(0);
    setSaasLogText("Uploading room floor plan PNG... [0%]");

    const interval = setInterval(() => {
      setSaasProgress((prev) => {
        const next = prev + 5;
        if (next <= 30) {
          setSaasLogText(`Uploading blueprint data... [${next}%]`);
          return next;
        } else if (next <= 60) {
          setSaasCompilerState("parsing");
          setSaasLogText(`Gemini 1.5 Vision parsing room coordinates and dimensions... [${next}%]`);
          return next;
        } else if (next <= 90) {
          setSaasCompilerState("compiling");
          setSaasLogText(`Claude 3.5 Sonnet compiling declarative Three.js code... [${next}%]`);
          return next;
        } else {
          clearInterval(interval);
          setSaasCompilerState("completed");
          setSaasLogText("3D mesh structure generated successfully.");
          return 100;
        }
      });
    }, 120);
  };

  const currentCNN = PROJECTS_DATA[0];
  const currentSaaS = PROJECTS_DATA[1];
  const [filter, setFilter] = useState<"all" | "python" | "typescript">("all");

  const detailTabList = (
    activeTab: DetailTabType,
    setActiveTab: (tab: DetailTabType) => void
  ) => (
    <div className="flex bg-zinc-900/50 dark:bg-zinc-950/65 border border-dashed border-zinc-800/80 p-0.5 rounded-lg gap-0.5 font-mono text-[9px] w-full">
      {(["case", "arch", "screenshots", "results"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 px-2.5 py-1 rounded cursor-pointer uppercase transition-all duration-200 ${
            activeTab === tab
              ? "bg-accent text-zinc-950 font-bold"
              : "text-zinc-400 hover:text-foreground"
          }`}
        >
          {tab === "case" ? "Case Study" : tab === "arch" ? "Architecture" : tab === "screenshots" ? "Live Sim" : tab}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 text-left select-none w-full">
      {/* Category filter selectors */}
      <div className="flex bg-zinc-950/40 border border-dashed border-zinc-850 p-1 rounded-lg gap-1.5 font-mono text-[9.5px] w-full max-w-[280px] self-end mb-2">
        {(["all", "python", "typescript"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => setFilter(lang)}
            className={`flex-1 px-3 py-1.5 rounded uppercase cursor-pointer transition-all ${
              filter === lang
                ? "bg-zinc-800 text-accent font-bold"
                : "text-zinc-500 hover:text-foreground"
            }`}
          >
            {lang === "all" ? "All Stack" : lang}
          </button>
        ))}
      </div>

      {/* Grid Container - 1 col on mobile, 2 cols on lg screens, equal widths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <AnimatePresence mode="popLayout">
          
          {/* ========================================================= */}
          {/* CARD 1: CNN Audio Classifier (Equal Width - col-span-1)   */}
          {/* ========================================================= */}
          {(filter === "all" || filter === "python") && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-1 flex flex-col"
            >
          <div className="group relative overflow-hidden border border-dashed border-zinc-800/80 bg-card/45 backdrop-blur-xl rounded-xl p-5 sm:p-6 h-full flex flex-col justify-between hover:border-accent/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.06)]">
            
            {/* Cyber Grid & HUD Target Lock Hover Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {/* Animated Dot Grid Matrix */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" 
                style={{
                  backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Cyber Laser Scan Line */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-beam" />
              
              {/* HUD Corner Brackets - Animate closer on hover */}
              <div className="absolute top-2.5 left-2.5 size-2 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/35 group-hover:top-3.5 group-hover:left-3.5 transition-all duration-300" />
              <div className="absolute top-2.5 right-2.5 size-2 border-t-2 border-r-2 border-accent/0 group-hover:border-accent/35 group-hover:top-3.5 group-hover:right-3.5 transition-all duration-300" />
              <div className="absolute bottom-2.5 left-2.5 size-2 border-b-2 border-l-2 border-accent/0 group-hover:border-accent/35 group-hover:bottom-3.5 group-hover:left-3.5 transition-all duration-300" />
              <div className="absolute bottom-2.5 right-2.5 size-2 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/35 group-hover:bottom-3.5 group-hover:right-3.5 transition-all duration-300" />

              {/* Dynamic Spotlight radial sweep background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-muted)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Rotating HUD Schematic Dial in the bottom-right corner */}
              <div className="absolute -bottom-10 -right-10 size-44 opacity-0 group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none select-none z-0 transform group-hover:scale-110">
                <svg viewBox="0 0 100 100" className="w-full h-full text-accent fill-none stroke-current animate-spin [animation-duration:40s]">
                  <circle cx="50" cy="50" r="45" strokeWidth="0.75" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="38" strokeWidth="1.25" />
                  <circle cx="50" cy="50" r="30" strokeWidth="0.75" strokeDasharray="12 6" />
                  <circle cx="50" cy="50" r="8" strokeWidth="0.5" />
                  <path d="M 50 2 L 50 12 M 50 98 L 50 88 M 2 50 L 12 50 M 98 50 L 88 50" strokeWidth="1.5" />
                  <path d="M 16 16 L 24 24 M 84 84 L 76 76 M 84 16 L 76 24 M 16 84 L 24 76" strokeWidth="0.75" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="flex items-center gap-2.5 border-b border-dashed border-zinc-850 pb-3">
                <Activity className="size-5 text-accent animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-foreground font-sans group-hover:text-accent transition-colors duration-300">
                    {currentCNN.title}
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wide">
                    Flagship Project #1
                  </span>
                </div>
              </div>

              {/* Core Overview Description (Always Visible) */}
              <p className="text-xs sm:text-[13px] text-zinc-400 group-hover:text-zinc-350 transition-colors duration-300 leading-relaxed font-sans">
                {currentCNN.desc}
              </p>

              {/* Specifications Block (Always Visible) */}
              <div className="border border-dashed border-zinc-850 p-3 rounded-lg bg-zinc-900/10 space-y-1.5 font-mono text-[9px]">
                <span className="text-zinc-500 uppercase tracking-wider block">Specs Summary</span>
                <div className="text-zinc-400 space-y-1">
                  <p className="flex justify-between"><span>Core Model:</span> <span className="text-zinc-200">ResNet-34 CNN</span></p>
                  <p className="flex justify-between"><span>Compute Node:</span> <span className="text-zinc-200">Modal Serverless</span></p>
                  <p className="flex justify-between"><span>Highlights:</span> <span className="text-zinc-200">80% Acc • 50 Classes</span></p>
                </div>
              </div>

              {/* Accordion Expand Trigger */}
              <button
                onClick={() => setIsExpandedCNN(!isExpandedCNN)}
                className="w-full py-2 border border-dashed border-zinc-800/80 hover:border-accent/40 bg-zinc-900/15 hover:bg-accent/5 text-[9px] font-mono text-zinc-400 hover:text-accent rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
              >
                <span>{isExpandedCNN ? "COLLAPSE DETAILS" : "SHOW MORE DETAILS"}</span>
                <motion.span animate={{ rotate: isExpandedCNN ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="size-3.5" />
                </motion.span>
              </button>

              {/* Height Transition Accordion Details Panel */}
              <motion.div
                initial={false}
                animate={{ height: isExpandedCNN ? "auto" : 0, opacity: isExpandedCNN ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden space-y-4"
              >
                {/* Accordion Tab Selector */}
                <div className="pt-2 border-t border-dashed border-zinc-900/60">
                  {detailTabList(activeTabCNN, setActiveTabCNN)}
                </div>

                <div className="min-h-[190px] pt-1">
                  <AnimatePresence mode="wait">
                    {activeTabCNN === "case" && (
                      <motion.div
                        key="cnn-case"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 font-sans text-xs sm:text-[13px]"
                      >
                        <div className="space-y-1">
                          <strong className="font-mono text-[9px] text-zinc-500 tracking-wider block uppercase">
                            The Challenge
                          </strong>
                          <p className="text-zinc-400 leading-relaxed">
                            {currentCNN.caseStudy.challenge}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <strong className="font-mono text-[9px] text-accent tracking-wider block uppercase">
                            The Solution
                          </strong>
                          <p className="text-zinc-400 leading-relaxed">
                            {currentCNN.caseStudy.solution}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTabCNN === "arch" && (
                      <motion.div
                        key="cnn-arch"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 font-mono text-[9px]"
                      >
                        <span className="text-zinc-500 uppercase tracking-wider block">Topology Pipeline</span>
                        <div className="space-y-2 border-l border-dashed border-zinc-800/80 pl-3">
                          {currentCNN.caseStudy.architecture.map((node, i) => (
                            <div key={i} className="text-zinc-400 leading-relaxed">
                              <span className="text-accent font-bold mr-1">{i + 1}.</span>
                              {node}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTabCNN === "screenshots" && (
                      <motion.div
                        key="cnn-screenshots"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 border-b border-dashed border-zinc-900 pb-1.5">
                          <span>Spectrogram Waveform Simulation</span>
                          
                          {/* Audio selects */}
                          <div className="flex gap-1.5">
                            {CNN_AUDIO_SAMPLES.map((s, idx) => (
                              <button
                                key={s.name}
                                onClick={() => {
                                  setSelectedSampleIdx(idx);
                                  setCnnInferenceState("idle");
                                  setCnnProgress(0);
                                  setCnnLogText("Sample selected. Ready.");
                                }}
                                className={`px-1.5 py-0.5 text-[8px] rounded border border-dashed transition-all cursor-pointer ${
                                  selectedSampleIdx === idx
                                    ? "bg-accent/10 border-accent text-accent font-semibold"
                                    : "border-zinc-850 text-zinc-500 hover:text-zinc-350"
                                }`}
                              >
                                {s.name.split(" ")[0]}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="h-20 border border-dashed border-zinc-850 bg-zinc-950/80 rounded-lg flex flex-col justify-between p-2.5 relative overflow-hidden">
                            <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 z-10">
                              <span className="flex items-center gap-1">
                                <Volume2 className="size-3 text-accent animate-pulse" />
                                <span>{CNN_AUDIO_SAMPLES[selectedSampleIdx].name}</span>
                              </span>
                              <span>Waveform</span>
                            </div>
                            
                            <div className="h-10 flex items-end justify-between px-1 gap-0.5">
                              {CNN_AUDIO_SAMPLES[selectedSampleIdx].waveform.map((h, i) => {
                                const activeAnim = cnnInferenceState === "running" || cnnInferenceState === "extracting";
                                return (
                                  <motion.div
                                    key={i}
                                    style={{ height: `${h}%` }}
                                    animate={activeAnim ? {
                                      height: [`${h * 0.4}%`, `${Math.min(100, h * (1 + Math.random()))}%`, `${h * 0.4}%`]
                                    } : {}}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 0.6 + (i % 3) * 0.2,
                                    }}
                                    className={`w-full rounded-t ${
                                      cnnInferenceState === "completed"
                                        ? "bg-accent"
                                        : activeAnim
                                        ? "bg-indigo-400"
                                        : "bg-zinc-800"
                                    }`}
                                  />
                                );
                              })}
                            </div>
                          </div>

                          <div className="border border-dashed border-zinc-850 bg-zinc-950/80 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[8px] text-zinc-400 min-h-24">
                            <div className="flex-1 text-left text-zinc-300">
                              <p className="text-accent">&gt; {cnnLogText}</p>
                              {cnnInferenceState === "completed" && (
                                <div className="mt-1.5 space-y-0.5 text-zinc-400">
                                  <p>Confidence Match: <span className="text-accent font-bold">{CNN_AUDIO_SAMPLES[selectedSampleIdx].confidence}%</span></p>
                                  <p>Inference Latency: <span className="text-zinc-300">{CNN_AUDIO_SAMPLES[selectedSampleIdx].latency}ms</span></p>
                                </div>
                              )}
                            </div>

                            <div className="pt-2">
                              {cnnInferenceState === "idle" || cnnInferenceState === "completed" ? (
                                <button
                                  onClick={triggerCnnInference}
                                  className="w-full py-1 bg-accent text-zinc-950 hover:bg-accent-hover font-bold rounded flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                >
                                  <Play className="size-2.5 fill-zinc-950" />
                                  <span>RUN CLASSIFIER</span>
                                </button>
                              ) : (
                                <div className="w-full h-5 bg-zinc-900 border border-zinc-800 rounded overflow-hidden relative flex items-center justify-center">
                                  <div
                                    className="absolute left-0 top-0 bottom-0 bg-indigo-500/20 transition-all duration-100"
                                    style={{ width: `${cnnProgress}%` }}
                                  />
                                  <span className="z-10 text-[7px] font-bold text-indigo-300 animate-pulse">
                                    INFERENCING... {cnnProgress}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTabCNN === "results" && (
                      <motion.div
                        key="cnn-results"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Diagnostics Performance:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {currentCNN.caseStudy.results.map((res, i) => {
                            const [title, desc] = res.split(": ");
                            return (
                              <div key={i} className="border border-dashed border-zinc-850 p-2.5 rounded bg-zinc-900/10 flex flex-col justify-between font-mono text-[9px]">
                                <span className="text-accent font-bold block">{title}</span>
                                <span className="text-zinc-400 text-[8px] mt-1 block leading-relaxed font-sans">{desc}</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Bottom Actions CTA (Always Visible) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-dashed border-zinc-800/40 mt-4 select-none relative z-10">
              <div className="flex flex-wrap gap-1">
                {currentCNN.tech.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-zinc-900/60 border border-zinc-850 text-[9px] font-mono text-zinc-500 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <MagneticButton>
                  <a
                    href={currentCNN.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 border border-dashed border-zinc-850 hover:bg-zinc-800/10 text-[10px] font-mono text-zinc-400 hover:text-foreground rounded flex items-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="size-3.5" />
                    <span>Source</span>
                  </a>
                </MagneticButton>
                
                <MagneticButton>
                  <a
                    href={currentCNN.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-accent/15 border border-accent/25 hover:bg-accent/25 text-[10px] font-mono text-accent font-semibold rounded flex items-center gap-1.5 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </MagneticButton>
              </div>
            </div>

          </div>
        </motion.div>
      )}

        {/* ========================================================= */}
        {/* CARD 2: SaaS Floorplan Visualizer (Equal Width - col-span-1) */}
        {/* ========================================================= */}
        {(filter === "all" || filter === "typescript") && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="lg:col-span-1 flex flex-col"
          >
            <div className="group relative overflow-hidden border border-dashed border-zinc-800/80 bg-card/45 backdrop-blur-xl rounded-xl p-5 sm:p-6 h-full flex flex-col justify-between hover:border-accent/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.06)]">
            
            {/* Cyber Grid & HUD Target Lock Hover Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {/* Animated Dot Grid Matrix */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500" 
                style={{
                  backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
              
              {/* Cyber Laser Scan Line */}
              <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-beam" />
              
              {/* HUD Corner Brackets - Animate closer on hover */}
              <div className="absolute top-2.5 left-2.5 size-2 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/35 group-hover:top-3.5 group-hover:left-3.5 transition-all duration-300" />
              <div className="absolute top-2.5 right-2.5 size-2 border-t-2 border-r-2 border-accent/0 group-hover:border-accent/35 group-hover:top-3.5 group-hover:right-3.5 transition-all duration-300" />
              <div className="absolute bottom-2.5 left-2.5 size-2 border-b-2 border-l-2 border-accent/0 group-hover:border-accent/35 group-hover:bottom-3.5 group-hover:left-3.5 transition-all duration-300" />
              <div className="absolute bottom-2.5 right-2.5 size-2 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/35 group-hover:bottom-3.5 group-hover:right-3.5 transition-all duration-300" />

              {/* Dynamic Spotlight radial sweep background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-muted)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Rotating HUD Schematic Dial in the bottom-right corner */}
              <div className="absolute -bottom-10 -right-10 size-44 opacity-0 group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none select-none z-0 transform group-hover:scale-110">
                <svg viewBox="0 0 100 100" className="w-full h-full text-accent fill-none stroke-current animate-spin [animation-duration:40s]">
                  <circle cx="50" cy="50" r="45" strokeWidth="0.75" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="38" strokeWidth="1.25" />
                  <circle cx="50" cy="50" r="30" strokeWidth="0.75" strokeDasharray="12 6" />
                  <circle cx="50" cy="50" r="8" strokeWidth="0.5" />
                  <path d="M 50 2 L 50 12 M 50 98 L 50 88 M 2 50 L 12 50 M 98 50 L 88 50" strokeWidth="1.5" />
                  <path d="M 16 16 L 24 24 M 84 84 L 76 76 M 84 16 L 76 24 M 16 84 L 24 76" strokeWidth="0.75" />
                </svg>
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Header */}
              <div className="flex items-center gap-2.5 border-b border-dashed border-zinc-850 pb-3">
                <Sparkles className="size-5 text-accent animate-pulse" />
                <div>
                  <h3 className="text-base font-bold text-foreground font-sans group-hover:text-accent transition-colors duration-300">
                    {currentSaaS.title}
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wide">
                    Flagship Project #2
                  </span>
                </div>
              </div>

              {/* Core Overview Description (Always Visible) */}
              <p className="text-xs sm:text-[13px] text-zinc-400 group-hover:text-zinc-350 transition-colors duration-300 leading-relaxed font-sans">
                {currentSaaS.desc}
              </p>

              {/* Specifications Block (Always Visible) */}
              <div className="border border-dashed border-zinc-850 p-3 rounded-lg bg-zinc-900/10 space-y-1.5 font-mono text-[9px]">
                <span className="text-zinc-500 uppercase tracking-wider block">Specs Summary</span>
                <div className="text-zinc-400 space-y-1">
                  <p className="flex justify-between"><span>Core AI Engine:</span> <span className="text-zinc-200">Claude 3.5 Sonnet</span></p>
                  <p className="flex justify-between"><span>Computer Vision:</span> <span className="text-zinc-200">Gemini 1.5 Pro</span></p>
                  <p className="flex justify-between"><span>Highlights:</span> <span className="text-zinc-200">2D to 3D • Serverless</span></p>
                </div>
              </div>

              {/* Accordion Expand Trigger */}
              <button
                onClick={() => setIsExpandedSaaS(!isExpandedSaaS)}
                className="w-full py-2 border border-dashed border-zinc-800/80 hover:border-accent/40 bg-zinc-900/15 hover:bg-accent/5 text-[9px] font-mono text-zinc-400 hover:text-accent rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
              >
                <span>{isExpandedSaaS ? "COLLAPSE DETAILS" : "SHOW MORE DETAILS"}</span>
                <motion.span animate={{ rotate: isExpandedSaaS ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="size-3.5" />
                </motion.span>
              </button>

              {/* Height Transition Accordion Details Panel */}
              <motion.div
                initial={false}
                animate={{ height: isExpandedSaaS ? "auto" : 0, opacity: isExpandedSaaS ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden space-y-4"
              >
                {/* Accordion Tab Selector */}
                <div className="pt-2 border-t border-dashed border-zinc-900/60">
                  {detailTabList(activeTabSaaS, setActiveTabSaaS)}
                </div>

                <div className="min-h-[190px] pt-1">
                  <AnimatePresence mode="wait">
                    {activeTabSaaS === "case" && (
                      <motion.div
                        key="saas-case"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 font-sans text-xs sm:text-[13px]"
                      >
                        <div className="space-y-1">
                          <strong className="font-mono text-[9px] text-zinc-500 tracking-wider block uppercase">
                            The Challenge
                          </strong>
                          <p className="text-zinc-400 leading-relaxed">
                            {currentSaaS.caseStudy.challenge}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <strong className="font-mono text-[9px] text-accent tracking-wider block uppercase">
                            The Solution
                          </strong>
                          <p className="text-zinc-400 leading-relaxed">
                            {currentSaaS.caseStudy.solution}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeTabSaaS === "arch" && (
                      <motion.div
                        key="saas-arch"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 font-mono text-[9px]"
                      >
                        <span className="text-zinc-500 uppercase tracking-wider block">Topology Pipeline</span>
                        <div className="space-y-2 border-l border-dashed border-zinc-800/80 pl-3">
                          {currentSaaS.caseStudy.architecture.map((node, i) => (
                            <div key={i} className="text-zinc-400 leading-relaxed">
                              <span className="text-accent font-bold mr-1">{i + 1}.</span>
                              {node}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTabSaaS === "screenshots" && (
                      <motion.div
                        key="saas-screenshots"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {/* 3D Scene Viewport */}
                        <div className="relative w-full h-32 bg-zinc-950/90 border border-dashed border-zinc-850 rounded-lg flex items-center justify-center overflow-hidden" style={{ perspective: 600 }}>
                          
                          {/* Live 3D Room Mockup */}
                          {saasCompilerState === "completed" ? (
                            <motion.div
                              animate={{ rotateX: 25, rotateY: rotationY }}
                              transition={{ type: "spring", stiffness: 80, damping: 15 }}
                              style={{ transformStyle: "preserve-3d" }}
                              className="w-36 h-24 relative flex items-center justify-center cursor-pointer"
                            >
                              {/* Living Room */}
                              <div
                                style={{
                                  transform: "translate3d(-15px, 0px, 0px)",
                                  transformStyle: "preserve-3d",
                                }}
                                onClick={() => setSelectedRoom("living")}
                                className={`absolute w-12 h-10 border transition-all ${
                                  selectedRoom === "living"
                                    ? "border-accent bg-accent/20 scale-105"
                                    : "border-accent/40 bg-accent/5 hover:border-accent"
                                } flex flex-col justify-center items-center text-[6px] font-mono text-zinc-300`}
                              >
                                <span>LIVING</span>
                                <span className="text-[4px] text-zinc-500">5x4m</span>
                              </div>
                              
                              {/* Bedroom */}
                              <div
                                style={{
                                  transform: "translate3d(30px, -5px, -10px)",
                                  transformStyle: "preserve-3d",
                                }}
                                onClick={() => setSelectedRoom("bedroom")}
                                className={`absolute w-10 h-8 border transition-all ${
                                  selectedRoom === "bedroom"
                                    ? "border-indigo-400 bg-indigo-400/20 scale-105"
                                    : "border-indigo-450/40 bg-indigo-400/5 hover:border-indigo-400"
                                } flex flex-col justify-center items-center text-[6px] font-mono text-zinc-300`}
                              >
                                <span>BEDROOM</span>
                                <span className="text-[4px] text-zinc-500">3x4m</span>
                              </div>

                              {/* Kitchen */}
                              <div
                                style={{
                                  transform: "translate3d(5px, 5px, 20px)",
                                  transformStyle: "preserve-3d",
                                }}
                                onClick={() => setSelectedRoom("kitchen")}
                                className={`absolute w-10 h-10 border transition-all ${
                                  selectedRoom === "kitchen"
                                    ? "border-amber-400 bg-amber-400/20 scale-105"
                                    : "border-amber-400/40 bg-amber-400/5 hover:border-amber-400"
                                } flex flex-col justify-center items-center text-[6px] font-mono text-zinc-300`}
                              >
                                <span>KITCHEN</span>
                                <span className="text-[4px] text-zinc-500">3x3m</span>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="text-center font-mono text-[8px] text-zinc-500 p-3 space-y-1.5">
                              <p className="leading-tight">{saasLogText}</p>
                              {saasCompilerState === "idle" && (
                                <button
                                  onClick={triggerSaasCompiler}
                                  className="px-2.5 py-1 bg-accent text-zinc-950 font-bold rounded flex items-center gap-1 mx-auto cursor-pointer transition-all hover:scale-105"
                                >
                                  <RotateCw className="size-2.5" />
                                  <span>COMPILE LAYOUT</span>
                                </button>
                              )}
                            </div>
                          )}

                          {saasCompilerState === "completed" && (
                            <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[6px] font-mono bg-zinc-900/90 border border-zinc-850 px-1 py-0.5 rounded text-zinc-400">
                              <span className="size-1 bg-accent rounded-full animate-pulse" />
                              <span>Rot-Y: {rotationY}°</span>
                            </div>
                          )}
                        </div>

                        {saasCompilerState === "completed" && (
                          <div className="flex items-center justify-between text-[8px] font-mono">
                            <div className="flex gap-1">
                              <button
                                onClick={() => setRotationY((prev) => prev - 45)}
                                className="px-1.5 py-0.5 border border-dashed border-zinc-800 hover:bg-zinc-900 text-zinc-450 rounded cursor-pointer transition-colors"
                              >
                                Orbit L
                              </button>
                              <button
                                onClick={() => setRotationY((prev) => prev + 45)}
                                className="px-1.5 py-0.5 border border-dashed border-zinc-800 hover:bg-zinc-900 text-zinc-450 rounded cursor-pointer transition-colors"
                              >
                                Orbit R
                              </button>
                            </div>
                            <button
                              onClick={() => setRotationY(0)}
                              className="text-zinc-500 hover:text-accent cursor-pointer transition-colors"
                            >
                              Reset
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTabSaaS === "results" && (
                      <motion.div
                        key="saas-results"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Diagnostics Performance:</span>
                        <div className="space-y-2">
                          {currentSaaS.caseStudy.results.map((res, i) => {
                            const [title, desc] = res.split(": ");
                            return (
                              <div key={i} className="border border-dashed border-zinc-850 p-2 rounded bg-zinc-900/10 flex flex-col justify-between font-mono text-[9px]">
                                <span className="text-accent font-bold block">{title}</span>
                                <span className="text-zinc-450 text-[8px] mt-0.5 block leading-normal font-sans">{desc}</span>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Bottom Actions CTA (Always Visible) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-dashed border-zinc-800/40 mt-4 select-none relative z-10">
              <div className="flex flex-wrap gap-1">
                {currentSaaS.tech.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 bg-zinc-900/60 border border-zinc-850 text-[9px] font-mono text-zinc-500 rounded">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <MagneticButton>
                  <a
                    href={currentSaaS.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 border border-dashed border-zinc-850 hover:bg-zinc-800/10 text-[10px] font-mono text-zinc-400 hover:text-foreground rounded flex items-center gap-1.5 transition-colors"
                  >
                    <GithubIcon className="size-3.5" />
                    <span>Source</span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href={currentSaaS.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 bg-accent/15 border border-accent/25 hover:bg-accent/25 text-[10px] font-mono text-accent font-semibold rounded flex items-center gap-1.5 transition-colors"
                  >
                    <span>Launch</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </MagneticButton>
              </div>
            </div>

          </div>
        </motion.div>
      )}
        </AnimatePresence>
      </div>
    </div>
  );
}
