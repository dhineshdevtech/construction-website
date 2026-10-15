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
  const heroTextRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState<Phase>(PHASES[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Pre-allocated frame array: ImageBitmap (GPU decoded) or HTMLImageElement
    const frames: (ImageBitmap | HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let lastRenderedBitmap: ImageBitmap | HTMLImageElement | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastDrawnIndex = -1;
    let lastPhaseIdx = 0;
    let rafId = 0;
    let isLoopRunning = false;
    let isHeroVisible = true;

    const pad = (n: number) => ("00" + n).slice(-3);

    // High-DPI canvas sizing capped at 1.5x to eliminate GPU fill bottleneck
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      renderFrame(Math.round(currentProgress * (TOTAL_FRAMES - 1)), true);
    };

    // O(1) Fast, zero-overhead render function
    const renderFrame = (frameIndex: number, force = false) => {
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
      
      // If frame didn't change and not a forced resize redraw, skip to save GPU
      if (!force && idx === lastDrawnIndex) return;

      // O(1) Direct Lookup with Instant Fallback
      let img = frames[idx];
      if (!img) {
        img = lastRenderedBitmap;
      }
      if (!img) return;
      lastRenderedBitmap = img;

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

      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;

      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnIndex = idx;
    };

    // Immediately load and paint frame 0 so the canvas is never blank
    const firstImg = new Image();
    firstImg.src = `/sequence/frame_${pad(0)}.webp`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      lastRenderedBitmap = firstImg;
      renderFrame(0, true);
    };
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      frames[0] = firstImg;
      lastRenderedBitmap = firstImg;
    }

    // Asynchronous loader with GPU ImageBitmap pre-decoding
    const loadFrame = async (i: number) => {
      const url = `/sequence/frame_${pad(i)}.webp`;
      try {
        if ("createImageBitmap" in window) {
          const res = await fetch(url);
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          frames[i] = bitmap;
          if (!lastRenderedBitmap) lastRenderedBitmap = bitmap;
        } else {
          await new Promise<void>((resolve, reject) => {
            const im = new Image();
            im.onload = () => {
              frames[i] = im;
              if (!lastRenderedBitmap) lastRenderedBitmap = im;
              resolve();
            };
            im.onerror = reject;
            im.src = url;
          });
        }
      } catch {
        const im = new Image();
        im.onload = () => { 
          frames[i] = im;
          if (!lastRenderedBitmap) lastRenderedBitmap = im;
        };
        im.src = url;
      }

      if (i === 0) {
        resizeCanvas();
      }
    };

    // Priority 1: load first 15 frames immediately
    const startLoading = async () => {
      const priorityIndices: number[] = [];
      for (let i = 0; i < 15; i++) priorityIndices.push(i);
      await Promise.all(priorityIndices.map(loadFrame));

      // Priority 2: load the rest in parallel batches of 6
      const remaining: number[] = [];
      for (let i = 15; i < TOTAL_FRAMES; i++) remaining.push(i);

      const poolSize = 6;
      for (let i = 0; i < remaining.length; i += poolSize) {
        const batch = remaining.slice(i, i + poolSize);
        await Promise.all(batch.map(loadFrame));
      }
    };

    startLoading();

    // Responsive cinematic damping loop with auto-sleep
    const loop = () => {
      if (!isHeroVisible) {
        isLoopRunning = false;
        return;
      }

      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.16; // Snappy, zero-delay Apple-style damping
        const targetFrame = Math.round(currentProgress * (TOTAL_FRAMES - 1));
        renderFrame(targetFrame);

        // Direct DOM update for hero text fade & translate (0 React overhead)
        if (heroTextRef.current) {
          const op = Math.max(0, 1 - currentProgress * 3.0);
          heroTextRef.current.style.opacity = `${op}`;
          heroTextRef.current.style.transform = `translateY(-${currentProgress * 70}px)`;
          heroTextRef.current.style.display = op <= 0.01 ? "none" : "";
        }

        rafId = requestAnimationFrame(loop);
      } else {
        // Settled: render exact target and sleep
        currentProgress = targetProgress;
        renderFrame(Math.round(currentProgress * (TOTAL_FRAMES - 1)));
        isLoopRunning = false;
      }
    };

    const startLoop = () => {
      if (!isLoopRunning && isHeroVisible) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    // Scroll progress handler: O(1) calculation, 0 React state updates on scroll
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const rawProgress = -rect.top / totalScrollable;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      targetProgress = clamped;

      // O(1) Phase index math: updates React state ONLY when phase boundary changes (4 times total!)
      const phaseIdx = clamped < 0.2 ? 0 : clamped < 0.45 ? 1 : clamped < 0.7 ? 2 : clamped < 0.9 ? 3 : 4;
      if (phaseIdx !== lastPhaseIdx) {
        lastPhaseIdx = phaseIdx;
        setCurrentPhase(PHASES[phaseIdx]);
      }

      startLoop();
    };

    // IntersectionObserver: pauses canvas animation completely when out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible) {
          startLoop();
        } else {
          isLoopRunning = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    handleScroll();
    resizeCanvas();
    startLoop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#0a0b0d]"
      style={{ height: "680vh" }} // Tuned to 680vh for smooth, natural construction progression
    >
      {/* Sticky Canvas & Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Instant First-Frame Poster: Displays the first frame in 0ms without waiting for JS */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sequence/frame_000.webp"
          alt="Ground Breaking Phase"
          className="absolute inset-0 w-full h-full object-cover z-0 filter contrast-[1.03] brightness-[1.01]"
        />

        {/* The Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 filter contrast-[1.03] brightness-[1.01]"
        />

        {/* Ambient Dark Gradient Vignette for readability */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0a0b0d]/75 via-transparent via-50% to-[#0a0b0d]/90" />

        {/* Top spacer for global fixed Navbar */}
        <div className="w-full h-16 sm:h-20 pointer-events-none" />

        {/* CENTER: Main Hero Text (Smoothly faded via direct DOM engine with 0 React re-renders) */}
        <div
          ref={heroTextRef}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto pointer-events-none will-change-[opacity,transform]"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse" />
            From Coastal Earth to Iconic Skyline
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.94] sm:leading-[0.92]">
            We Build What <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              You Imagine.
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-xs sm:text-base md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            From ground-breaking to grand handover — bespoke architectural villas and luxury developments across Chennai.
          </p>
        </div>

        {/* BOTTOM OVERLAY: Live Interactive Construction Phase HUD */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3 sm:gap-6 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-3.5 sm:p-5 shadow-2xl">
            {/* Left: Dynamic Phase Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  {currentPhase.tag}
                </span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight">
                {currentPhase.title}
              </h2>
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-400 mt-0.5 max-w-xl line-clamp-2 sm:line-clamp-none">
                {currentPhase.desc}
              </p>
            </div>

            {/* Right: Architectural Scroll Hint (No Loading/Progress Bar) */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider shrink-0 self-start sm:self-auto">
              <span>Scroll to Build</span>
              <span className="text-amber-400 font-bold">↓</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
