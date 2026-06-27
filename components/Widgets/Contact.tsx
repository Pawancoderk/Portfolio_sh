"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Sparkles,
  MessageSquare,
  Cpu,
  Layers,
  Activity,
  Lock,
  ShieldCheck,
  Loader2,
  AlertCircle,
  RefreshCw,
  Send,
  Wifi,
  Globe,
  Volume2,
  VolumeX
} from "lucide-react";
import { DashedFrame } from "@/components/UI/DashedFrame";
import { TextScramble } from "@/components/UI/TextScramble";

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

// Custom SVG LinkedinIcon to match lucide standard style
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Web Audio API Sci-Fi Sound FX Engine
class SoundFX {
  private static ctx: AudioContext | null = null;
  private static isMuted = true;

  static setMute(mute: boolean) {
    this.isMuted = mute;
    if (typeof window === "undefined") return;
    if (!mute && !this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch (e) {
        console.error("AudioContext initialization failed:", e);
      }
    }
  }

  private static getContext(): AudioContext | null {
    if (this.isMuted || typeof window === "undefined") return null;
    if (!this.ctx) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      } catch (e) {
        return null;
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  static playKey() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Quick mechanical click tap sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(950 + Math.random() * 380, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.035);
    
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  }

  static playHover() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Tech diagnostics blip
    osc.type = "sine";
    osc.frequency.setValueAtTime(2300, ctx.currentTime);
    osc.frequency.setValueAtTime(3100, ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0.007, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  }

  static playSweep() {
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Upward envelope sweep
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.6);
    
    gain.gain.setValueAtTime(0.018, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.65);
  }

  static playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // Cyber arpeggio chime (C5 -> E5 -> G5 -> C6)
    const playNote = (freq: number, startDelay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + startDelay);
      
      gain.gain.setValueAtTime(0, now + startDelay);
      gain.gain.linearRampToValueAtTime(0.02, now + startDelay + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startDelay + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + startDelay);
      osc.stop(now + startDelay + duration + 0.04);
    };
    
    playNote(523.25, 0.0, 0.4); // C5
    playNote(659.25, 0.07, 0.4); // E5
    playNote(783.99, 0.14, 0.4); // G5
    playNote(1046.50, 0.21, 0.6); // C6
  }
}

// 2. Oscilloscope Signal Visualizer Canvas Component (Compacted to 48px height)
function Oscilloscope({
  isTransmitting,
  inputLength
}: {
  isTransmitting: boolean;
  inputLength: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [metrics, setMetrics] = useState({ freq: 412.8, gain: 4, noise: -82 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid matrix
      ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw center baseline
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Configure wave properties based on active typing or transmission state
      const speed = isTransmitting ? 0.32 : 0.08;
      const amplitude = isTransmitting
        ? 18
        : inputLength > 0
        ? Math.min(12, 4 + inputLength * 0.3)
        : 6;
      const frequency = isTransmitting ? 0.065 : 0.024;

      // Draw Indigo secondary wave
      ctx.strokeStyle = "rgba(99, 102, 241, 0.35)"; // Indigo
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y1 = Math.sin(x * (frequency * 0.75) - phase * 0.8) * (amplitude * 0.7);
        const y2 = Math.sin(x * (frequency * 1.5) + phase * 1.1) * (amplitude * 0.25);
        const y = canvas.height / 2 + y1 + y2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw primary green wave
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)"; // Emerald Accent
      ctx.shadowColor = "rgba(16, 185, 129, 0.35)";
      ctx.shadowBlur = 4;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y1 = Math.sin(x * frequency + phase) * amplitude;
        const y2 = Math.sin(x * (frequency * 2.2) - phase * 1.4) * (amplitude * 0.3);
        const noiseAmt = isTransmitting ? (Math.random() - 0.5) * 3.5 : (Math.random() - 0.5) * 0.5;
        const y = canvas.height / 2 + y1 + y2 + noiseAmt;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0; // Reset

      phase += speed;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isTransmitting, inputLength]);

  // Update numerical instrument metrics in dashboard
  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics({
        freq: parseFloat(
          (isTransmitting ? 840 + Math.random() * 80 : 380 + Math.random() * 25).toFixed(1)
        ),
        gain: isTransmitting
          ? Math.floor(Math.random() * 6) + 12
          : inputLength > 0
          ? Math.floor(Math.random() * 3) + 4
          : Math.floor(Math.random() * 2) + 2,
        noise: isTransmitting
          ? Math.floor(Math.random() * 15) - 45
          : Math.floor(Math.random() * 5) - 78,
      });
    }, 400);
    return () => clearInterval(timer);
  }, [isTransmitting, inputLength]);

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-center justify-between font-mono text-[7px] text-zinc-500 uppercase tracking-widest px-1">
        <span>SIGNAL_ANALYZER // TELEMETRY</span>
        <span className="text-zinc-500">
          f: <span className="text-accent font-bold">{metrics.freq} MHz</span> | g:{" "}
          <span className="text-accent font-bold">+{metrics.gain} dB</span> | n:{" "}
          <span className="text-zinc-500 font-bold">{metrics.noise} dBm</span>
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={380}
        height={48}
        className="w-full h-12 bg-zinc-950/80 border border-zinc-850/60 rounded-lg shadow-inner block"
      />
    </div>
  );
}

// 3. SVG Proxy Connection / Flow Map Component (Compacted to 145px height)
interface ConnectionMapProps {
  activeNode: string | null;
  isTransmitting: boolean;
  transmissionStage: number;
}
function ConnectionMap({
  activeNode,
  isTransmitting,
  transmissionStage
}: ConnectionMapProps) {
  return (
    <div className="relative w-full h-[145px] border border-dashed border-zinc-850/80 bg-zinc-950/20 rounded-xl p-3.5 flex flex-col justify-between overflow-hidden select-none">
      
      {/* Dynamic styles to handle particle/dash flow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes routeFlow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        .animate-route-flow {
          stroke-dasharray: 6 3;
          animation: routeFlow 0.8s linear infinite;
        }
      `}} />

      <div className="flex items-center justify-between text-[7px] font-mono text-zinc-550 tracking-wider">
        <span>INTERFACE_BUS: DATA_ROUTE_MAP</span>
        <span className="text-accent flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-accent animate-ping" />
          <span>ROUTING: ACTIVE</span>
        </span>
      </div>

      <svg className="w-full h-[88px] overflow-visible" viewBox="0 0 360 94">
        <defs>
          <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Client to Relay Connector Line */}
        <path
          d="M 50,47 L 145,47"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeOpacity={isTransmitting ? "0.9" : "0.22"}
          className={isTransmitting ? "animate-route-flow" : ""}
        />

        {/* Relay to Email Node */}
        <path
          d="M 145,47 L 275,18"
          stroke={activeNode === "email" ? "var(--accent)" : "rgba(63, 63, 70, 0.4)"}
          strokeWidth={activeNode === "email" ? "2" : "1.2"}
          strokeOpacity={activeNode === "email" || isTransmitting ? "0.9" : "0.25"}
          className={isTransmitting && transmissionStage >= 3 ? "animate-route-flow" : ""}
          filter={activeNode === "email" ? "url(#mapGlow)" : ""}
        />

        {/* Relay to GitHub Node */}
        <path
          d="M 145,47 L 275,47"
          stroke={activeNode === "github" ? "var(--accent)" : "rgba(63, 63, 70, 0.4)"}
          strokeWidth={activeNode === "github" ? "2" : "1.2"}
          strokeOpacity={activeNode === "github" || isTransmitting ? "0.9" : "0.25"}
          className={isTransmitting && transmissionStage >= 3 ? "animate-route-flow" : ""}
          filter={activeNode === "github" ? "url(#mapGlow)" : ""}
        />

        {/* Relay to LinkedIn Node */}
        <path
          d="M 145,47 L 275,76"
          stroke={activeNode === "linkedin" ? "var(--accent)" : "rgba(63, 63, 70, 0.4)"}
          strokeWidth={activeNode === "linkedin" ? "2" : "1.2"}
          strokeOpacity={activeNode === "linkedin" || isTransmitting ? "0.9" : "0.25"}
          className={isTransmitting && transmissionStage >= 3 ? "animate-route-flow" : ""}
          filter={activeNode === "linkedin" ? "url(#mapGlow)" : ""}
        />

        {/* Client Terminal Point */}
        <circle cx="50" cy="47" r="4.2" fill="var(--background)" stroke="var(--accent)" strokeWidth="2" />
        <text x="50" y="34" textAnchor="middle" fill="var(--accent)" fontSize="7" fontFamily="monospace" fontWeight="bold">CLIENT</text>

        {/* Middle Relay Point */}
        <circle
          cx="145"
          cy="47"
          r={isTransmitting ? "6" : "5"}
          fill={isTransmitting ? "var(--accent)" : "var(--background)"}
          stroke="var(--accent)"
          strokeWidth="2"
          className={isTransmitting ? "animate-pulse" : ""}
        />
        <text x="145" y="34" textAnchor="middle" fill="var(--accent)" fontSize="7" fontFamily="monospace" fontWeight="bold">RELAY</text>

        {/* Targets Gateway Points */}
        {/* Email Node */}
        <circle
          cx="275"
          cy="18"
          r="4"
          fill={activeNode === "email" ? "var(--accent)" : "var(--background)"}
          stroke={activeNode === "email" ? "var(--accent)" : "rgba(161, 161, 170, 0.4)"}
          strokeWidth="2"
        />
        <text x="286" y="21" fill="var(--foreground)" fontSize="7" fontFamily="monospace" alignmentBaseline="middle">EMAIL_NODE</text>

        {/* GitHub Node */}
        <circle
          cx="275"
          cy="47"
          r="4"
          fill={activeNode === "github" ? "var(--accent)" : "var(--background)"}
          stroke={activeNode === "github" ? "var(--accent)" : "rgba(161, 161, 170, 0.4)"}
          strokeWidth="2"
        />
        <text x="286" y="50" fill="var(--foreground)" fontSize="7" fontFamily="monospace" alignmentBaseline="middle">GITHUB_NODE</text>

        {/* LinkedIn Node */}
        <circle
          cx="275"
          cy="76"
          r="4"
          fill={activeNode === "linkedin" ? "var(--accent)" : "var(--background)"}
          stroke={activeNode === "linkedin" ? "var(--accent)" : "rgba(161, 161, 170, 0.4)"}
          strokeWidth="2"
        />
        <text x="286" y="79" fill="var(--foreground)" fontSize="7" fontFamily="monospace" alignmentBaseline="middle">LINKEDIN_NODE</text>

        {/* Client to Relay Flying Data Burst Particles */}
        {isTransmitting && (
          <>
            <motion.circle
              cx="50"
              cy="47"
              r="3"
              fill="var(--accent)"
              animate={{ cx: [50, 145] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            />
            {transmissionStage >= 3 && (
              <>
                <motion.circle
                  cx="145"
                  cy="47"
                  r="2.5"
                  fill="var(--accent)"
                  animate={{ cx: [145, 275], cy: [47, 18] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0 }}
                />
                <motion.circle
                  cx="145"
                  cy="47"
                  r="2.5"
                  fill="var(--accent)"
                  animate={{ cx: [145, 275], cy: [47, 47] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0.3 }}
                />
                <motion.circle
                  cx="145"
                  cy="47"
                  r="2.5"
                  fill="var(--accent)"
                  animate={{ cx: [145, 275], cy: [47, 76] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0.6 }}
                />
              </>
            )}
          </>
        )}
      </svg>

      <div className="flex justify-between font-mono text-[7px] text-zinc-550">
        <span>TX_RATE: {isTransmitting ? "862 Kb/s (LIVE)" : "0.00 Kb/s (STANDBY)"}</span>
        <span>LINK_INTEGRITY: 99.8% (ENCRYPTED)</span>
      </div>
    </div>
  );
}

interface Toast {
  id: string;
  message: string;
}

// 4. Main Compact Redesigned Contact Widget
export function Contact() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Interactive Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // Sound controls
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  
  // Transmission lifecycle states
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionStage, setTransmissionStage] = useState(0); // 0: input, 1: handshake, 2: encrypt, 3: route, 4: complete
  const [validationError, setValidationError] = useState("");
  
  // Hover node tracker to light up SVG maps dynamically
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Simulated metrics
  const [ping, setPing] = useState(34);
  const [logs, setLogs] = useState<string[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  
  // Field logger limits
  const loggedFields = useRef({ name: false, email: false, message: false });

  // Add terminal log message
  const addLog = (msg: string) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(" ")[0];
    setLogs((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  // Sound Engine Setup and Toggle
  const toggleAudio = () => {
    const next = !isAudioEnabled;
    setIsAudioEnabled(next);
    SoundFX.setMute(!next);
    if (next) {
      addLog("SYS: Web Audio synthesizer node online.");
      SoundFX.playSuccess();
    } else {
      addLog("SYS: Sound engines disabled.");
    }
  };

  // Mount logic setup logs
  useEffect(() => {
    addLog("SYS: Diagnostic scan online. Secure socket modules initialized.");
    addLog("SYS: Port listener active on port 8080.");
    addLog("SYS: Sound synthesize nodes loaded [STANDBY]. Toggle audio to enable synthesizer clicks.");
  }, []);

  // Fluctuating Ping simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4;
        return Math.max(25, Math.min(52, prev + delta));
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // System log container auto-downscroller
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Form input keystroke audio and logs
  const handleInputChange = (
    field: "name" | "email" | "message",
    value: string
  ) => {
    if (isAudioEnabled) SoundFX.playKey();
    
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else if (field === "message") setMessage(value);

    if (!loggedFields.current[field]) {
      loggedFields.current[field] = true;
      addLog(`GUEST: Buffer stream for SENDER_${field.toUpperCase()} initialized.`);
    }
  };

  // Copy Email to Clipboard
  const copyEmail = () => {
    if (isAudioEnabled) SoundFX.playHover();
    const targetEmail = "imrealpawan@gmail.com";
    navigator.clipboard
      .writeText(targetEmail)
      .then(() => {
        const newToast: Toast = {
          id: Date.now().toString(),
          message: "Email copied to clipboard!",
        };
        setToasts((prev) => [...prev, newToast]);
        addLog("SYS: Clipboard write success. email duplicated.");
      })
      .catch(() => {
        const newToast: Toast = {
          id: Date.now().toString(),
          message: "Failed to copy email.",
        };
        setToasts((prev) => [...prev, newToast]);
        addLog("SYS_ERROR: Clipboard block. Copy failed.");
      });
  };

  // Remove toast timeout
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  // Send packet pipeline execution
  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name.trim()) {
      setValidationError("SENDER_NAME buffer empty.");
      addLog("SYS_ERROR: SENDER_NAME is undefined.");
      if (isAudioEnabled) SoundFX.playHover();
      return;
    }
    
    if (!email.trim()) {
      setValidationError("SENDER_EMAIL buffer empty.");
      addLog("SYS_ERROR: SENDER_EMAIL is undefined.");
      if (isAudioEnabled) SoundFX.playHover();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Invalid email payload structure.");
      addLog("SYS_ERROR: Validation mismatch on SENDER_EMAIL pattern.");
      if (isAudioEnabled) SoundFX.playHover();
      return;
    }

    if (!message.trim()) {
      setValidationError("MSG_BODY payload empty.");
      addLog("SYS_ERROR: MSG_BODY empty.");
      if (isAudioEnabled) SoundFX.playHover();
      return;
    }

    setIsTransmitting(true);
    setTransmissionStage(1);
    addLog(`SYS: Executing nexis-comms binary...`);
    addLog(`SYS: Dialing proxy relays. Target: nexis-comms-port.`);
    if (isAudioEnabled) SoundFX.playSweep();

    // Stage 1 -> Stage 2 (Handshake -> Encrypt)
    setTimeout(() => {
      setTransmissionStage(2);
      addLog(`SYS: Handshake secured. Latency: ${ping}ms.`);
      addLog(`SECURE_COMMS: Generating AES-256 block crypt key...`);
    }, 1200);

    // Stage 2 -> Stage 3 (Encrypt -> Route)
    setTimeout(() => {
      setTransmissionStage(3);
      const signature = `SHA384_SIG_0x${Math.floor(Math.random() * 16777215)
        .toString(16)
        .toUpperCase()}`;
      addLog(`SECURE_COMMS: Envelope sealed with signature: ${signature}`);
      addLog(`SECURE_COMMS: Dispatching proxy packets to target gates...`);
      if (isAudioEnabled) SoundFX.playSweep();
    }, 2800);

    // Stage 3 -> Stage 4 (Route -> Success)
    setTimeout(() => {
      setTransmissionStage(4);
      addLog(`SYS: Server pipeline verified payload receipt. Status: 202 ACCEPTED.`);
      addLog(`SYS: Connection closed successfully.`);
      if (isAudioEnabled) SoundFX.playSuccess();
    }, 4500);
  };

  // Reset Comms Interface
  const handleResetConsole = () => {
    setName("");
    setEmail("");
    setMessage("");
    setTransmissionStage(0);
    setIsTransmitting(false);
    loggedFields.current = { name: false, email: false, message: false };
    addLog("SYS: Buffer streams flushed. Console listener standing by.");
    if (isAudioEnabled) SoundFX.playHover();
  };

  // Node Hover trigger for graphics & audio
  const handleNodeHover = (node: string | null) => {
    setActiveNode(node);
    if (node) {
      addLog(`GUEST: Focus shifted to node: ${node.toUpperCase()}_GATEWAY.`);
      if (isAudioEnabled) SoundFX.playHover();
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-10 relative select-none z-10 text-left">
      
      {/* 1. Dashboard Status Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 font-mono text-xs text-zinc-550">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="size-3.5 text-accent animate-pulse" />
          <span className="font-bold tracking-wider text-zinc-400">
            <TextScramble text="Establish.Connection / Comms.Interface" triggerOnHover={true} />
          </span>
        </div>
        
        {/* Interactive Audio controls & signal tags */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-[10px] text-zinc-600 border-t border-dashed border-zinc-850/50 pt-2 sm:pt-0 sm:border-0">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded border border-dashed hover:text-accent hover:border-accent/40 transition-colors cursor-pointer font-bold ${
              isAudioEnabled
                ? "bg-accent-muted/20 border-accent/40 text-accent"
                : "border-zinc-800 text-zinc-500"
            }`}
            title="Toggle synthesizer sounds on key press and hover"
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="size-3" />
                <span>AUDIO FX: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="size-3" />
                <span>AUDIO FX: MUTED</span>
              </>
            )}
          </button>
          
          <span className="hidden sm:inline">|</span>
          
          <span className="flex items-center gap-1 shrink-0">
            <Wifi className="size-3 text-accent animate-pulse" />
            <span>SOCKET: SECURE</span>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1 shrink-0">
            <Activity className="size-3 text-accent" />
            <span>PING: {ping}ms</span>
          </span>
        </div>
      </div>

      {/* 2. Glassmorphic Main Layout Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-dashed border-zinc-800/80 bg-zinc-900/10 backdrop-blur-xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Background grids and glowing accent layers */}
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none z-0" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-indigo-500/8 blur-3xl" />
        </div>

        {/* Dashboard Panels */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* LEFT PANEL: Secure Comms Form & Oscilloscope [col-span-7] */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <DashedFrame title="Secure Transmission Terminal" className="h-full flex flex-col justify-between" active={isTransmitting}>
              
              <AnimatePresence mode="wait">
                {transmissionStage === 0 ? (
                  // Comms Form layout
                  <motion.form
                    key="comms-form"
                    onSubmit={handleTransmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 py-1 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Name & Email inputs in side-by-side grid row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name input */}
                        <div className="flex flex-col gap-1.5 font-mono text-xs">
                          <div className="flex items-center justify-between text-zinc-500 font-medium">
                            <span>guest@nexisworx:~$ export SENDER_NAME =</span>
                          </div>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder='"your name"'
                            className="w-full bg-zinc-950/70 border border-zinc-805 border-dashed rounded-lg p-2 text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-dashed focus:border-accent/50 focus:ring-1 focus:ring-accent/10 transition-all font-sans font-medium text-xs"
                          />
                        </div>

                        {/* Email input */}
                        <div className="flex flex-col gap-1.5 font-mono text-xs">
                          <div className="flex items-center justify-between text-zinc-500 font-medium">
                            <span>guest@nexisworx:~$ export SENDER_EMAIL =</span>
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder='"you@domain.com"'
                            className="w-full bg-zinc-950/70 border border-zinc-805 border-dashed rounded-lg p-2 text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-dashed focus:border-accent/50 focus:ring-1 focus:ring-accent/10 transition-all font-sans font-medium text-xs"
                          />
                        </div>
                      </div>

                      {/* Message input */}
                      <div className="flex flex-col gap-1.5 font-mono text-xs">
                        <div className="flex items-center justify-between text-zinc-500 font-medium">
                          <span>guest@nexisworx:~$ export MESSAGE_BODY =</span>
                          <span className="text-[8px] uppercase tracking-wider text-accent/50">Required</span>
                        </div>
                        <textarea
                          value={message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder='"Write message details here..."'
                          rows={3}
                          className="w-full bg-zinc-950/70 border border-zinc-805 border-dashed rounded-lg p-2 text-zinc-200 placeholder-zinc-750 focus:outline-none focus:border-dashed focus:border-accent/50 focus:ring-1 focus:ring-accent/10 transition-all font-sans font-medium text-xs resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      {/* Reactive Oscilloscope Wave Visualizer inside Left Panel */}
                      <Oscilloscope isTransmitting={isTransmitting} inputLength={name.length + message.length} />

                      {validationError && (
                        <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/30 border border-red-900/40 p-2 rounded-lg">
                          <AlertCircle className="size-3.5 shrink-0" />
                          <span>ERROR: {validationError}</span>
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-accent/5 hover:bg-accent/15 border border-accent/30 hover:border-accent/60 text-accent font-mono text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
                        onMouseEnter={() => { if (isAudioEnabled) SoundFX.playHover(); }}
                      >
                        <Send className="size-3.5" />
                        <span>Execute: nexis-comms --transmit</span>
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  // Transmit progress sequences
                  <motion.div
                    key="comms-progress"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="py-8 px-4 flex flex-col items-center justify-center h-full text-center space-y-5"
                  >
                    {transmissionStage < 4 ? (
                      <div className="relative flex items-center justify-center size-16">
                        <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-spin [animation-duration:8s]" />
                        <div className="absolute inset-2 rounded-full border border-accent/10 animate-spin [animation-duration:4s] [animation-direction:reverse]" />
                        <Loader2 className="size-7 text-accent animate-spin" />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 150 }}
                        className="size-14 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      >
                        <ShieldCheck className="size-7" />
                      </motion.div>
                    )}

                    <div className="space-y-1.5 max-w-xs">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-200">
                        {transmissionStage === 1 && "COMMS_STAGE: HANDSHAKE"}
                        {transmissionStage === 2 && "COMMS_STAGE: ENCRYPTING"}
                        {transmissionStage === 3 && "COMMS_STAGE: ROUTING_PACKETS"}
                        {transmissionStage === 4 && "TRANSMISSION SUCCESS"}
                      </h3>
                      <p className="text-[11px] text-zinc-455 leading-relaxed font-sans">
                        {transmissionStage === 1 && "Verifying secure handshake protocols and validating target listener nodes..."}
                        {transmissionStage === 2 && "Encoding guest environment variables and packet data using TLS_AES_256_GCM ciphers..."}
                        {transmissionStage === 3 && "Routing secure envelope payloads through encrypted proxy network hubs..."}
                        {transmissionStage === 4 && "Payload securely received and acknowledged by Pawan's server pipeline."}
                      </p>
                    </div>

                    {/* Progress tracking dots */}
                    <div className="flex items-center gap-2 pt-1">
                      {[1, 2, 3].map((step) => {
                        let stepBg = "bg-zinc-800";
                        if (transmissionStage > step) stepBg = "bg-accent shadow-[0_0_8px_var(--accent)]";
                        else if (transmissionStage === step) stepBg = "bg-accent animate-pulse";
                        return (
                          <div
                            key={step}
                            className={`size-2 rounded-full transition-all duration-300 ${stepBg}`}
                          />
                        );
                      })}
                    </div>

                    {transmissionStage === 4 && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleResetConsole}
                        className="px-3.5 py-1.5 border border-dashed border-zinc-800 hover:border-accent/40 bg-zinc-950 text-zinc-400 hover:text-accent font-mono text-[9px] uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer mt-2"
                      >
                        <RefreshCw className="size-3" />
                        <span>Reset Console</span>
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </DashedFrame>
          </div>

          {/* RIGHT PANEL: SVG Comms Flow Map & Gateway Node Cards [col-span-5] */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
            
            {/* SVG Proxy Connection Route Visualizer */}
            <ConnectionMap
              activeNode={activeNode}
              isTransmitting={isTransmitting}
              transmissionStage={transmissionStage}
            />

            <div className="space-y-2.5">
              
              <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest px-1">
                SELECTABLE_NODE_SOCKETS
              </div>

              {/* Node Card: Email Gateway */}
              <div
                className="group relative p-2.5 border border-dashed border-zinc-850 hover:border-accent/40 bg-zinc-950/40 rounded-xl transition-all cursor-default flex items-center justify-between"
                onMouseEnter={() => handleNodeHover("email")}
                onMouseLeave={() => handleNodeHover(null)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded-lg group-hover:bg-accent/5 group-hover:border-accent/30 transition-all shrink-0">
                    <Mail className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[7px] font-mono text-zinc-550 uppercase block tracking-wider leading-none mb-0.5">
                      NODE // EMAIL_INBOUND
                    </span>
                    <span className="text-xs font-bold text-zinc-200 font-mono block leading-none mb-0.5 select-all">
                      imrealpawan@gmail.com
                    </span>
                    <span className="text-[7px] font-mono text-accent/50 block leading-none">
                      PORT: 443 (HTTPS) | PROTO: SSL/TLS
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 hover:border-accent/30 text-zinc-400 hover:text-accent rounded-lg transition-all cursor-pointer flex items-center justify-center shrink-0"
                  title="Copy email to clipboard"
                >
                  <Copy className="size-3" />
                </button>
              </div>

              {/* Node Card: GitHub Repository */}
              <a
                href="https://github.com/Pawancoderk"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 border border-dashed border-zinc-850 hover:border-accent/40 bg-zinc-950/40 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                onMouseEnter={() => handleNodeHover("github")}
                onMouseLeave={() => handleNodeHover(null)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded-lg group-hover:bg-accent/5 group-hover:border-accent/30 transition-all shrink-0">
                    <GithubIcon className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[7px] font-mono text-zinc-550 uppercase block tracking-wider leading-none mb-0.5">
                      NODE // GITHUB_GATEWAY
                    </span>
                    <span className="text-xs font-bold text-zinc-200 font-mono block leading-none mb-0.5">
                      github.com/Pawancoderk
                    </span>
                    <span className="text-[7px] font-mono text-accent/50 block leading-none">
                      PORT: 22 (SSH) | PROTO: SSHv2
                    </span>
                  </div>
                </div>

                <div className="p-1.5 bg-zinc-900 group-hover:bg-zinc-850 border border-zinc-850 group-hover:border-accent/30 text-zinc-400 group-hover:text-accent rounded-lg transition-all shrink-0">
                  <ExternalLink className="size-3" />
                </div>
              </a>

              {/* Node Card: LinkedIn Profile */}
              <a
                href="https://linkedin.com/in/pawan-a71a92212"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 border border-dashed border-zinc-850 hover:border-accent/40 bg-zinc-950/40 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                onMouseEnter={() => handleNodeHover("linkedin")}
                onMouseLeave={() => handleNodeHover(null)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-zinc-900 border border-zinc-850 text-accent rounded-lg group-hover:bg-accent/5 group-hover:border-accent/30 transition-all shrink-0">
                    <LinkedinIcon className="size-3.5" />
                  </div>
                  <div>
                    <span className="text-[7px] font-mono text-zinc-550 uppercase block tracking-wider leading-none mb-0.5">
                      NODE // LINKEDIN_GATEWAY
                    </span>
                    <span className="text-xs font-bold text-zinc-200 font-mono block leading-none mb-0.5">
                      linkedin.com/in/pawan-a71a92212
                    </span>
                    <span className="text-[7px] font-mono text-accent/50 block leading-none">
                      PORT: 80 (HTTP) | PROTO: TLSv1.3
                    </span>
                  </div>
                </div>

                <div className="p-1.5 bg-zinc-900 group-hover:bg-zinc-850 border border-zinc-850 group-hover:border-accent/30 text-zinc-400 group-hover:text-accent rounded-lg transition-all shrink-0">
                  <ExternalLink className="size-3" />
                </div>
              </a>

            </div>

          </div>

          {/* BOTTOM PANEL: CLI Log Monitor [col-span-12] */}
          <div className="lg:col-span-12">
            <div className="relative border border-dashed border-zinc-850/80 bg-zinc-950/80 p-3.5 rounded-xl flex flex-col font-mono text-[9px] text-emerald-500/90 shadow-inner">
              
              {/* Terminal status bar */}
              <div className="flex items-center justify-between border-b border-dashed border-zinc-850/60 pb-1.5 mb-2 select-none text-zinc-450">
                <div className="flex items-center gap-2 font-bold text-zinc-400">
                  <Terminal className="size-3.5 text-accent animate-pulse" />
                  <span>SYS_MONITOR // INBOUND_EVENT_LOGGER</span>
                </div>
                <div className="flex items-center gap-1.5 text-[8px]">
                  <span className="size-1 rounded-full bg-accent animate-ping" />
                  <span>STREAM: ON</span>
                </div>
              </div>

              {/* Scrolling events feed */}
              <div
                ref={logsContainerRef}
                className="h-20 overflow-y-auto space-y-1 scrollbar-none pr-2 font-mono text-emerald-500/75 select-text"
              >
                {logs.map((log, index) => (
                  <div key={index} className="leading-relaxed break-all font-mono hover:text-emerald-400 transition-colors">
                    &gt; {log}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </motion.div>

      {/* 3. Glassmorphic Toast Notification List */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }}
              className="p-4 rounded-xl border border-accent/20 bg-zinc-900/90 backdrop-blur-xl shadow-2xl flex items-center gap-3 pointer-events-auto select-none relative overflow-hidden"
            >
              <div className="size-6 rounded-full bg-accent-muted border border-accent/30 text-accent flex items-center justify-center shrink-0">
                <Check className="size-3.5" />
              </div>
              
              <div className="flex-1 text-left">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block leading-none mb-1">
                  System.Alert
                </span>
                <span className="text-xs font-semibold text-zinc-200 font-sans">
                  {toast.message}
                </span>
              </div>

              {/* Toast timing line indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800 rounded-b-xl overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-accent"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}
