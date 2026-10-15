"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "turnkey",
    number: "01",
    title: "Turnkey Design & Build",
    subtitle: "End-to-End Single-Point Accountability",
    description:
      "From architectural blueprints and CMDA sanction approvals to structural engineering and final ceremonial keys. One unified team, one fixed-price contract, and zero subcontractor conflicts.",
    deliverables: [
      "Architectural Design & 3D BIM",
      "CMDA & Local Body Sanctions",
      "Structural Engineering & Soil Analysis",
      "Interior Execution & Luxury Handover",
    ],
    metrics: [
      { label: "TIMELINE", value: "Guaranteed Fixed Schedule" },
      { label: "BUDGET", value: "Zero Escalation Guarantee" },
      { label: "STANDARDS", value: "CMDA & RERA Approved" },
    ],
    image: "/projects/institutional.jpg",
  },
  {
    id: "residential",
    number: "02",
    title: "Residential Construction",
    subtitle: "Custom Luxury Villas & Coastal Estates",
    description:
      "Bespoke ground-up residential construction across ECR, OMR, Boat Club, and Poes Garden. Engineered specifically for Chennai's coastal salinity with marine-grade materials and tropical airflow architecture.",
    deliverables: [
      "High-Strength M40 Marine Concrete",
      "Cantilevered Balconies & Infinity Pools",
      "Smart Home Automation Infrastructure",
      "Soundproof Double-Glazed Facades",
    ],
    metrics: [
      { label: "RESIDENCES", value: "160+ Homes Delivered" },
      { label: "GRADE", value: "Marine Salt-Resistant" },
      { label: "WARRANTY", value: "10-Year Structural" },
    ],
    image: "/projects/residential.jpg",
  },
  {
    id: "commercial",
    number: "03",
    title: "Commercial Construction",
    subtitle: "Corporate Headquarters & IT Tech Parks",
    description:
      "High-density commercial towers and corporate complexes engineered to international institutional standards. Low-E acoustic curtain glass, advanced HVAC routing, and multi-tier basement parking systems.",
    deliverables: [
      "Double-Glazed Curtain Wall Facades",
      "Deep Raft Piling for Multi-Story Loads",
      "IGBC Gold & Platinum Green Building",
      "High-Volume Hydraulic Lift Shafts",
    ],
    metrics: [
      { label: "CERTIFICATION", value: "IGBC Platinum / LEED" },
      { label: "SEISMIC", value: "Zone III Seismic Anchored" },
      { label: "EFFICIENCY", value: "40% Energy Conservation" },
    ],
    image: "/projects/commercial.jpg",
  },
  {
    id: "industrial",
    number: "04",
    title: "Industrial Construction",
    subtitle: "High-Bay Logistics & Precision Plants",
    description:
      "Heavy industrial warehousing, automated manufacturing complexes, and PEB structural steel facilities across Sriperumbudur and Oragadam corridors. Laser-screeded superflat floors and high-tonnage gantry cranes.",
    deliverables: [
      "Pre-Engineered Structural Steel (PEB)",
      "Heavy Overhead Crane Gantry Slabs",
      "FM2 Superflat Industrial Flooring",
      "Stormwater & Fire Suppression Mains",
    ],
    metrics: [
      { label: "CLEAR SPAN", value: "Up to 32m Columns-Free" },
      { label: "FLOOR LOAD", value: "8-12 MT/m² Capacity" },
      { label: "COMPLIANCE", value: "Factories Act Certified" },
    ],
    image: "/projects/industrial.jpg",
  },
  {
    id: "renovation",
    number: "05",
    title: "Renovation & Remodelling",
    subtitle: "Architectural Retrofits & Heritage Luxury",
    description:
      "Major structural remodels, floor additions, and whole-home transformations. We preserve heritage aesthetic character while inserting modern steel reinforcements, smart plumbing, and thermal glass envelopes.",
    deliverables: [
      "Structural Underpinning & Re-Casting",
      "Interior Spatial Reconfiguration",
      "Facade Modernization & Cladding",
      "Acoustic & Thermal Insulation Upgrades",
    ],
    metrics: [
      { label: "APPROACH", value: "Zero-Structural Damage" },
      { label: "PRECISION", value: "Laser 3D Scanned BIM" },
      { label: "SAFETY", value: "Certified Shoring & Jacking" },
    ],
    image: "/projects/hospitality.jpg",
  },
];

export default function ServicesCylinderScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const hudIndexRef = useRef<HTMLSpanElement>(null);
  const hudTitleRef = useRef<HTMLSpanElement>(null);
  
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    let currentP = 0;
    let targetP = 0;
    let lastActiveIdx = 0;
    let rafId: number;

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rawProgress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      targetP = rawProgress;
    };

    // Fast, GPU-accelerated 60fps render loop with zero React re-render overhead
    const updateTransforms = (floatIdx: number) => {
      for (let i = 0; i < SERVICES.length; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        const delta = i - floatIdx;
        const absDelta = Math.abs(delta);

        let translateX = 0;
        let translateY = 0;
        let rotateZ = 0;
        let rotateX = 0;
        let translateZ = 0;

        if (delta < 0) {
          // Sweeping along user's blue line to top-right
          translateX = absDelta * 140;
          translateY = delta * 250;
          rotateZ = absDelta * 7;
          rotateX = delta * -22;
          translateZ = -absDelta * 180;
        } else {
          // Entering from bottom-center
          translateX = delta * -30;
          translateY = delta * 230;
          rotateX = delta * -26;
          translateZ = -delta * 150;
        }

        // Generous reading window: current service stays 100% visible
        let opacity = 0;
        if (absDelta < 0.28) {
          opacity = 1.0;
        } else {
          // Fast clean fade so others never clutter
          opacity = Math.max(0, 1 - (absDelta - 0.28) * 2.4);
        }

        const scale = Math.max(0.72, 1.06 - absDelta * 0.22);
        const isFocused = absDelta < 0.35;

        // Apply directly to DOM styles
        card.style.transform = `translate(${translateX}px, ${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${Math.round(100 - absDelta * 15)}`;
        card.style.pointerEvents = isFocused ? "auto" : "none";

        if (isFocused) {
          card.style.borderColor = "rgba(251, 191, 36, 0.85)";
          card.style.boxShadow = "0 25px 50px -12px rgba(245, 158, 11, 0.25)";
        } else {
          card.style.borderColor = "rgba(255, 255, 255, 0.1)";
          card.style.boxShadow = "none";
        }
      }

      // Update bottom progress line directly in DOM
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${Math.max(8, (floatIdx / (SERVICES.length - 1)) * 100)}%`;
      }

      // Update HUD text directly
      const currentIdx = Math.min(SERVICES.length - 1, Math.max(0, Math.round(floatIdx)));
      if (hudIndexRef.current) {
        hudIndexRef.current.textContent = `CAPABILITY 0${currentIdx + 1} OF 05`;
      }
      if (hudTitleRef.current) {
        hudTitleRef.current.textContent = SERVICES[currentIdx].title;
      }

      // Only trigger React state update when active index changes (e.g. 0 -> 1)
      if (currentIdx !== lastActiveIdx) {
        lastActiveIdx = currentIdx;
        setActiveIndex(currentIdx);
      }
    };

    // Smooth inertia loop
    const loop = () => {
      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0001) {
        currentP += diff * 0.14;
        updateTransforms(currentP * (SERVICES.length - 1));
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    updateTransforms(0);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const currentService = SERVICES[activeIndex];

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative bg-[#06080c] text-zinc-100 select-none border-t border-white/10"
      style={{ height: "550vh" }} // Extended runway for smooth 5-stage progression
    >
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 lg:py-8 px-4 sm:px-6 md:px-14">
        {/* TOP BAR: Section Title & Header */}
        <div className="relative z-20 flex items-center justify-between border-b border-white/10 pb-3 sm:pb-5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
              03 / Comprehensive Capabilities
            </span>
          </div>
          <div className="text-[11px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:block">
            Chennai Architectural Engineering
          </div>
        </div>

        {/* MIDDLE: 3D CYLINDRICAL SPLIT-SCREEN VIEWPORT */}
        <div className="relative z-20 flex-1 my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-14 items-center">
          {/* LEFT COLUMN: Dynamic Service Info (Typography & Deliverables) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Step Counter */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-3 min-w-0">
              <div className="flex items-baseline gap-1.5 shrink-0 whitespace-nowrap">
                <span className="text-2xl sm:text-4xl md:text-5xl font-black font-mono text-amber-400 tracking-tight">
                  {currentService.number}
                </span>
                <span className="text-zinc-500 font-mono text-sm sm:text-lg font-semibold">
                  / 05
                </span>
              </div>
              <span className="h-3.5 sm:h-4 w-[1px] bg-white/20 shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold truncate">
                {currentService.subtitle}
              </span>
            </div>

            {/* Service Main Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[0.98] sm:leading-[0.95] mb-2 sm:mb-4 lg:mb-6">
              {currentService.title}
            </h2>

            {/* Description */}
            <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-6 max-w-xl line-clamp-2 sm:line-clamp-none">
              {currentService.description}
            </p>

            {/* Deliverables Checklist Grid */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 mb-3 sm:mb-6 max-w-xl">
              {currentService.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-1.5 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] sm:text-xs text-zinc-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="font-medium truncate">{item}</span>
                </div>
              ))}
            </div>

            {/* Technical Specs HUD Ticker */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2.5 sm:pt-4 border-t border-white/10 max-w-xl">
              {currentService.metrics.map((m, mIdx) => (
                <div key={mIdx}>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                    {m.label}
                  </div>
                  <div className="text-[11px] sm:text-sm font-bold text-white tracking-tight mt-0.5 truncate">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: 3D CURVED ORBITAL STAGE (TAKES MORE SPACE) */}
          <div
            className="lg:col-span-7 relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[620px] w-full flex items-center justify-center"
            style={{
              perspective: "1400px",
              perspectiveOrigin: "center center",
            }}
          >
            {/* 3D Preserved Cylinder Container */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {SERVICES.map((serv, index) => (
                <div
                  key={serv.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute w-[98%] sm:w-[94%] max-w-2xl aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 transition-colors duration-200"
                  style={{
                    transformOrigin: "center center",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Architectural Image */}
                  <Image
                    src={serv.image}
                    alt={serv.title}
                    fill
                    sizes="(max-width: 768px) 95vw, 55vw"
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* Gradient Overlay for Cinematic 3D Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20" />

                  {/* Card Top Pill Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-400">
                      {serv.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-white font-semibold">
                      {serv.title}
                    </span>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                    <div className="text-xs font-mono text-zinc-300">
                      <span className="text-amber-400 font-bold">CHENNAI · </span>
                      <span>{serv.subtitle}</span>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                      <span>EXPLORE</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right-Side Vertical Step Navigator Dots */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
              {SERVICES.map((s, dotIdx) => (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    activeIndex === dotIdx ? "scale-125" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === dotIdx
                        ? "bg-amber-400 shadow-sm shadow-amber-400"
                        : "bg-white/40"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM HUD: Architectural Progress & Engineering Standards Line */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase">
            <span ref={hudIndexRef} className="text-amber-400 font-bold">
              CAPABILITY 01 OF 05
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span ref={hudTitleRef} className="text-zinc-300 truncate max-w-[220px] sm:max-w-none">
              {currentService.title}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono uppercase text-zinc-500">
            <span>Scroll Wheel to Rotate Drum</span>
            <span className="text-amber-400 font-bold">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
