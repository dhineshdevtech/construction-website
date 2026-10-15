"use client";

import React, { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 100;

interface Phase {
  range: [number, number];
  tag: string;
  title: string;
  desc: string;
}

const PHASES: Phase[] = [
  {
    range: [0, 0.2],
    tag: "PHASE 01 / SITE PREP",
    title: "Ground Breaking & Coastal Excavation",
    desc: "Soil testing, deep earth grading, and precision GPS site layout along the Chennai coastal corridor.",
  },
  {
    range: [0.2, 0.45],
    tag: "PHASE 02 / SUBSTRUCTURE",
    title: "Deep Piling & Raft Foundation",
    desc: "M40 high-grade marine-resistant concrete pouring and earthquake-resistant sub-grade anchoring.",
  },
  {
    range: [0.45, 0.7],
    tag: "PHASE 03 / SUPERSTRUCTURE",
    title: "RCC Framework & Cantilever Slabs",
    desc: "Precision structural steel columns and high-tensile slab casting rising floor by floor.",
  },
  {
    range: [0.7, 0.9],
    tag: "PHASE 04 / ENVELOPE & FACADE",
    title: "Double-Glazed Facade & Teak Louvers",
    desc: "Acoustic high-performance glass curtain walls and climate-responsive coastal architectural finishes.",
  },
  {
    range: [0.9, 1.0],
    tag: "PHASE 05 / THE REVEAL",
    title: "The Finished Architectural Landmark",
    desc: "Turnkey luxury handover: warm ambient LED lighting, infinity landscaping, and ready for occupancy.",
  },
];

export default function HeroConstructionScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<Phase>(PHASES[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // We hold either ImageBitmap (GPU decoded) or HTMLImageElement as fallback
    const frames: (ImageBitmap | HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let loadedCount = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastDrawnIndex = -1;
    let rafId: number;

    const pad = (n: number) => ("00" + n).slice(-3);

    // High-DPI canvas sizing
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      renderFrame(Math.round(currentProgress * (TOTAL_FRAMES - 1)), true);
    };

    // Fast, zero-overhead render function
    const renderFrame = (frameIndex: number, force = false) => {
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
      
      // If frame didn't change and not a forced resize redraw, skip to save GPU
      if (!force && idx === lastDrawnIndex) return;

      // Find nearest loaded frame if this exact one is still buffering
      let img = frames[idx];
      if (!img) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          if (idx - offset >= 0 && frames[idx - offset]) {
            img = frames[idx - offset];
            break;
          }
          if (idx + offset < TOTAL_FRAMES && frames[idx + offset]) {
            img = frames[idx + offset];
            break;
          }
        }
      }
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const imgWidth = "width" in img ? img.width : (img as HTMLImageElement).naturalWidth;
      const imgHeight = "height" in img ? img.height : (img as HTMLImageElement).naturalHeight;
      if (!imgWidth || !imgHeight) return;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = cw / ch;

      let dw: number, dh: number;
      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
      } else {
        dh = ch;
        dw = ch * imgRatio;
      }

      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnIndex = idx;
    };

    // Asynchronous loader with GPU ImageBitmap pre-decoding
    const loadFrame = async (i: number) => {
      const url = `/sequence/frame_${pad(i)}.webp`;
      try {
        if ("createImageBitmap" in window) {
          const res = await fetch(url);
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          frames[i] = bitmap;
        } else {
          await new Promise<void>((resolve, reject) => {
            const im = new Image();
            im.onload = () => {
              frames[i] = im;
              resolve();
            };
            im.onerror = reject;
            im.src = url;
          });
        }
      } catch {
        // Fallback standard image
        const im = new Image();
        im.onload = () => { frames[i] = im; };
        im.src = url;
      }

      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadProgress(pct);

      if (i === 0 || loadedCount === 5) {
        setIsReady(true);
        resizeCanvas();
      }
    };

    // Priority 1: load first 15 frames immediately
    const startLoading = async () => {
      const priorityIndices: number[] = [];
      for (let i = 0; i < 15; i++) priorityIndices.push(i);
      await Promise.all(priorityIndices.map(loadFrame));

      // Priority 2: load the rest in parallel chunks
      const remaining: number[] = [];
      for (let i = 15; i < TOTAL_FRAMES; i++) remaining.push(i);

      // Fetch in concurrency pool of 6
      const poolSize = 6;
      for (let i = 0; i < remaining.length; i += poolSize) {
        const batch = remaining.slice(i, i + poolSize);
        await Promise.all(batch.map(loadFrame));
      }
    };

    startLoading();

    // Scroll progress handler
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const rawProgress = -rect.top / totalScrollable;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      targetProgress = clamped;
      setScrollProgress(clamped);

      // Determine active phase
      const phase = PHASES.find(
        (p) => clamped >= p.range[0] && (clamped < p.range[1] || p.range[1] === 1.0)
      ) || PHASES[0];
      setCurrentPhase(phase);
    };

    // Soft, cinematic damping loop (0.07 gives slow, heavy, buttery glide)
    const loop = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.07;
        const targetFrame = Math.round(currentProgress * (TOTAL_FRAMES - 1));
        renderFrame(targetFrame);
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    handleScroll();
    resizeCanvas();
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0a0b0d]"
      style={{ height: "850vh" }} // Extended to 850vh for majestic, slow-paced construction reveal!
    >
      {/* Sticky Canvas & Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* The Canvas Background with graceful fade-in */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient Dark Gradient Vignette for readability */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0a0b0d]/75 via-transparent via-50% to-[#0a0b0d]/90" />

        {/* Initial loading screen until first frame ready */}
        {!isReady && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0a0b0d] text-amber-400 font-mono text-xs tracking-widest uppercase">
            Loading Visual Engine...
          </div>
        )}

        {/* TOP: Fixed Navigation Header */}
        <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-amber-400 text-lg">
              C
            </div>
            <div>
              <div className="text-white font-bold tracking-widest text-sm uppercase">
                COROMANDEL <span className="text-amber-400 font-light">LANDMARKS</span>
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
                Chennai · Luxury Design-Build
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-zinc-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">Vision</a>
            <a href="#phases" className="hover:text-amber-400 transition-colors">Process</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase transition-transform hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            Start Your Build
          </a>
        </header>

        {/* CENTER: Main Hero Text (Slowly fades as scroll begins) */}
        <div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto transition-transform duration-300 pointer-events-none"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 3.0),
            transform: `translateY(-${scrollProgress * 70}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            From Coastal Earth to Iconic Skyline
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight uppercase leading-[0.92]">
            We Build What <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              You Imagine.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            From ground-breaking to grand handover — bespoke architectural villas and luxury developments across Chennai.
          </p>
        </div>

        {/* BOTTOM OVERLAY: Live Interactive Construction Phase HUD */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-2xl">
            {/* Left: Dynamic Phase Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {currentPhase.tag}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {Math.round(scrollProgress * 100)}% COMPLETE
                </span>
                {loadProgress < 100 && (
                  <span className="text-[10px] text-zinc-500 font-mono">
                    (Buffering HD {loadProgress}%)
                  </span>
                )}
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-white tracking-tight">
                {currentPhase.title}
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-xl">
                {currentPhase.desc}
              </p>
            </div>

            {/* Right: Progress Scrub Bar */}
            <div className="w-full md:w-72 flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-mono uppercase text-zinc-400">
                <span>Excavation</span>
                <span className="text-amber-400">Completed Landmark</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-150"
                  style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Scroll Cue */}
          <div
            className="flex flex-col items-center justify-center mt-4 transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 animate-bounce">
              Scroll Slowly to Construct ↓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
