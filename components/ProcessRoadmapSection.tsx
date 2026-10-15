"use client";

import React, { useEffect, useRef, useState } from "react";

interface Step {
  number: string;
  timeline: string;
  name: string;
  title: string;
  summary: string;
  points: string[];
  badge: string;
  metric: { label: string; value: string };
}

const STEPS: Step[] = [
  {
    number: "01",
    timeline: "WEEKS 01 – 04",
    name: "Site Survey",
    title: "Soil Testing & Legal Approvals",
    summary: "Deep geotechnical analysis and complete CMDA sanction clearances before breaking ground.",
    points: [
      "Borehole testing to 30m depth for soil stability",
      "Coastal groundwater & salinity resistance planning",
      "Full CMDA & local municipality permit approvals",
    ],
    badge: "100% CMDA SANCTIONED",
    metric: { label: "BOREHOLE DEPTH", value: "30 Metres" },
  },
  {
    number: "02",
    timeline: "WEEKS 05 – 08",
    name: "3D BIM Plan",
    title: "Virtual 3D Pre-Construction",
    summary: "We build your entire project digitally first to identify and resolve clashes in advance.",
    points: [
      "Complete 3D model combining structure, plumbing & electricals",
      "Zero on-site conflicts or costly rework delays",
      "Photorealistic walkthroughs for materials and lighting",
    ],
    badge: "ZERO-CLASH GUARANTEE",
    metric: { label: "BIM MODEL", value: "Level 3 Digital Twin" },
  },
  {
    number: "03",
    timeline: "WEEKS 09 – 18",
    name: "Foundation",
    title: "Deep Piling & Subterranean Shield",
    summary: "Heavy rotary piling anchored to solid rock paired with double waterproofing barriers.",
    points: [
      "Rotary bored concrete piling up to 36m deep",
      "Crystalline membrane waterproofing against coastal water",
      "Heavy load-testing on foundation columns",
    ],
    badge: "SOLID GRANITE ANCHOR",
    metric: { label: "PILING DEPTH", value: "Up to 36 Metres" },
  },
  {
    number: "04",
    timeline: "WEEKS 19 – 42",
    name: "Superstructure",
    title: "Precision Slabs & Structural Shell",
    summary: "High-grade M60 concrete casting with laser-level accuracy and wide column-free living spaces.",
    points: [
      "Post-tensioned concrete slabs for vast 18m living rooms",
      "Laser-guided formwork leveled to strict ±2mm tolerances",
      "Ultrasonic testing on all load-bearing columns",
    ],
    badge: "±2MM LASER ACCURACY",
    metric: { label: "CONCRETE GRADE", value: "M60 High Strength" },
  },
  {
    number: "05",
    timeline: "WEEKS 43 – 52",
    name: "Snag-Free Handover",
    title: "140-Point Quality Audit & Keys Handover",
    summary: "Rigorous snag-free quality audit, ceremonial brass keys, and 10-year structural warranty deed.",
    points: [
      "140-point quality checklist signed off personally by principal engineers",
      "Thermal infrared scans ensuring zero air or water leaks",
      "Ceremonial keys delivery with 10-year legal structural warranty",
    ],
    badge: "10-YEAR STRUCTURAL WARRANTY",
    metric: { label: "WARRANTY DEED", value: "10-Year Guaranteed" },
  },
];

export default function ProcessRoadmapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  useEffect(() => {
    let lastIdx = 0;

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));

      // Calculate active step (0 to 4)
      const currentIdx = Math.min(
        STEPS.length - 1,
        Math.floor(progress * STEPS.length)
      );

      // Direct DOM update for laser line (no 60fps React re-renders)
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(6, progress * 100)}%`;
      }

      // Only update state when step index actually changes (5 times total)
      if (currentIdx !== lastIdx) {
        lastIdx = currentIdx;
        setActiveStepIndex(currentIdx);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToStep = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const top = container.offsetTop + (idx / STEPS.length) * (container.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const currentStep = STEPS[activeStepIndex];

  return (
    <section
      ref={containerRef}
      id="phases"
      className="relative bg-[#07080b] border-t border-white/10 text-white select-none"
      style={{ height: "260vh" }} // Short, concise runway for quick smooth scrolling
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between py-2.5 sm:py-5 md:py-8 px-3 sm:px-6 max-w-6xl mx-auto overflow-hidden">
        
        {/* TOP BAR: Header & Step Indicators */}
        <div className="w-full">
          <div className="flex items-end justify-between gap-2 sm:gap-3 border-b border-white/10 pb-2 sm:pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
                  05 / The Process
                </span>
              </div>
              <h2 className="text-base sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-0.5 sm:mt-1">
                Precision At Every Stage<span className="text-amber-400">.</span>
              </h2>
            </div>

            <div className="text-[10px] sm:text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0">
              <span className="hidden sm:inline">Scroll to Advance</span>
              <span className="text-amber-400 font-bold">↓</span>
            </div>
          </div>

          {/* 5 Step Navigation Pills */}
          <div className="mt-2 sm:mt-4 grid grid-cols-5 gap-1 sm:gap-2.5">
            {STEPS.map((s, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;

              return (
                <button
                  key={s.number}
                  onClick={() => scrollToStep(idx)}
                  className={`flex flex-col items-center py-1 sm:py-2 px-1 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-[1.02] font-black"
                      : isPast
                      ? "bg-white/10 text-zinc-200 border border-white/10"
                      : "bg-black/60 text-zinc-500 border border-white/5 hover:text-zinc-300"
                  }`}
                >
                  <span className="font-mono text-xs sm:text-sm font-bold">
                    {s.number}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-wider truncate w-full text-center mt-0.5 hidden sm:inline-block">
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER: Dynamic Active Step Card (Changes smoothly on scroll) */}
        <div className="my-auto w-full py-1">
          <div className="p-3.5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-b from-[#0f1218] to-[#0a0c10] border border-amber-500/30 shadow-2xl relative overflow-hidden transition-all duration-500">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 md:gap-8 items-center relative z-10">
              
              {/* Left Column: Number + Title + Plain Narrative */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <span className="text-xl sm:text-3xl md:text-4xl font-mono font-black text-amber-400">
                    {currentStep.number}
                  </span>
                  <div className="border-l border-white/20 pl-2 sm:pl-2.5">
                    <div className="text-[9px] sm:text-xs font-mono uppercase tracking-widest text-amber-400/90 font-semibold">
                      {currentStep.timeline}
                    </div>
                    <div className="text-[9px] sm:text-xs font-mono text-zinc-400 uppercase">
                      STAGE {currentStep.number} OF 05
                    </div>
                  </div>
                </div>

                <h3 className="text-base sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-0.5 sm:mt-1 leading-tight">
                  {currentStep.title}
                </h3>

                <p className="mt-1.5 sm:mt-2 text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {currentStep.summary}
                </p>

                {/* 3 Simple Action Points */}
                <div className="mt-2.5 sm:mt-4 space-y-1 sm:space-y-2">
                  {currentStep.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2 p-1.5 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
                    >
                      <span className="text-amber-400 font-bold text-xs mt-0.5">✓</span>
                      <span className="text-[11px] sm:text-xs md:text-sm text-zinc-200 leading-snug">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Key Guarantee Badge & Metric Box */}
              <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3">
                
                {/* Guarantee Badge */}
                <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 border border-white/10 shadow-lg flex flex-col justify-between">
                  <div className="text-[8px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-0.5">
                    Milestone Guarantee
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-tight mt-0.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="truncate">{currentStep.badge}</span>
                  </div>
                </div>

                {/* Metric Readout */}
                <div className="p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-amber-500/[0.06] border border-amber-500/20 flex flex-col justify-between">
                  <div className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-amber-400/80 font-semibold">
                    {currentStep.metric.label}
                  </div>
                  <div className="text-xs sm:text-lg md:text-xl font-black text-amber-400 font-mono mt-0.5 truncate">
                    {currentStep.metric.value}
                  </div>
                </div>

                {/* Stepper Navigation */}
                <div className="col-span-2 md:col-span-1 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 pt-0.5">
                  <span>Scroll to continue</span>
                  <span className="text-amber-400 font-bold">
                    0{activeStepIndex + 1} / 05
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* BOTTOM TICKER: Brief reassurance note */}
        <div className="text-center text-[9px] sm:text-[11px] font-mono text-zinc-500 border-t border-white/5 pt-2">
          Zero Contractor Conflicts • Fixed-Price Guarantee • Weekly Digital Drone Inspections
        </div>

      </div>
    </section>
  );
}
