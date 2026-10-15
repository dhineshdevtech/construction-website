"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { scrollToSection } from "@/components/SmoothScroll";

interface Project {
  id: string;
  number: string;
  title: string;
  category: "Residential Buildings" | "Commercial Complexes" | "Industrial Construction" | "Infrastructure Projects" | "Luxury Hospitality" | "Institutional & Cultural";
  location: string;
  scale: string;
  status: "Completed" | "Ongoing";
  statusDetail: string;
  yearOrMilestone: string;
  specs: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "residential",
    number: "01",
    title: "The Baycrest Coastal Villa",
    category: "Residential Buildings",
    location: "East Coast Road (ECR), Chennai",
    scale: "42,000 Sq. Ft. · 3-Level Estate",
    status: "Completed",
    statusDetail: "Turnkey Handover",
    yearOrMilestone: "2025",
    specs: [
      "Marine-grade M40 concrete for coastal salinity resistance",
      "Cantilevered sea-facing infinity pool with glass floor panel",
      "Motorized architectural teak louvers for tropical shading",
    ],
    image: "/projects/residential.jpg",
  },
  {
    id: "commercial",
    number: "02",
    title: "Zephyr Horizon Tech Tower",
    category: "Commercial Complexes",
    location: "OMR Tech Corridor, Chennai",
    scale: "380,000 Sq. Ft. · 18 Floors",
    status: "Completed",
    statusDetail: "IGBC Platinum Certified",
    yearOrMilestone: "2025",
    specs: [
      "Low-E double glazed acoustic curtain wall facade",
      "Integrated vertical sky gardens on cantilevered terraces",
      "3-level automated hydraulic basement parking",
    ],
    image: "/projects/commercial.jpg",
  },
  {
    id: "industrial",
    number: "03",
    title: "Oragadam High-Bay Logistics Facility",
    category: "Industrial Construction",
    location: "Oragadam Industrial Corridor, Chennai",
    scale: "520,000 Sq. Ft. Complex",
    status: "Ongoing",
    statusDetail: "85% Structure Erected",
    yearOrMilestone: "Q3 2026",
    specs: [
      "28m clear-span precision structural steel trusses",
      "Heavy 50-ton overhead gantry crane integration",
      "Laser-screed FM2 superflat industrial flooring",
    ],
    image: "/projects/industrial.jpg",
  },
  {
    id: "infrastructure",
    number: "04",
    title: "Adyar Estuary Cable-Stayed Skyway",
    category: "Infrastructure Projects",
    location: "Coastal Viaduct Corridor, Chennai",
    scale: "2.8 km Viaduct & Metro Deck",
    status: "Ongoing",
    statusDetail: "70% Piers & Stay Cables Cast",
    yearOrMilestone: "Q4 2026",
    specs: [
      "Deep marine bored pile foundations anchored to bedrock",
      "High-tensile parallel strand stay cables with corrosion barrier",
      "Dynamic architectural illumination & real-time load sensors",
    ],
    image: "/projects/infrastructure.jpg",
  },
  {
    id: "hospitality",
    number: "05",
    title: "The Coromandel Sands Pavilion & Spa",
    category: "Luxury Hospitality",
    location: "Mahabalipuram Coastal Strip, Chennai",
    scale: "140,000 Sq. Ft. · 5-Star Beachfront Sanctuary",
    status: "Completed",
    statusDetail: "Operational Luxury Handover",
    yearOrMilestone: "2025",
    specs: [
      "Hand-carved granite stone porticos & Dravidian-modern fusion",
      "Open-air biophilic water pavilions with reflection fire bowls",
      "Integrated seawater reverse-osmosis desalination plant",
    ],
    image: "/projects/hospitality.jpg",
  },
  {
    id: "institutional",
    number: "06",
    title: "AURA International Science Hub",
    category: "Institutional & Cultural",
    location: "Guindy Knowledge Corridor, Chennai",
    scale: "260,000 Sq. Ft. · Iconic Kinetic Dome",
    status: "Ongoing",
    statusDetail: "65% Glazed Geodesic Dome Assembled",
    yearOrMilestone: "Q2 2027",
    specs: [
      "60m clear-span geodesic structural steel sphere",
      "Central lotus water amphitheater & reflecting lagoon",
      "Dynamic photovoltaic glass envelope with BIPV solar power",
    ],
    image: "/projects/institutional.jpg",
  },
];

export default function FeaturedProjectsRail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const scrollToProject = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const targetY = container.offsetTop + (index / (PROJECTS.length - 1)) * scrollableHeight;
    scrollToSection(targetY);
  };

  useEffect(() => {
    let currentP = 0;
    let targetP = 0;
    let lastActiveIdx = 0;
    let rafId: number;
    let isLoopRunning = false;
    let isVisible = true;
    let maxTranslate = 0;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    };

    const updatePosition = (progress: number) => {
      const track = trackRef.current;
      if (!track) return;

      const currentTranslate = progress * maxTranslate;
      track.style.transform = `translate3d(-${currentTranslate.toFixed(1)}px, 0, 0)`;

      const idx = Math.min(
        PROJECTS.length - 1,
        Math.max(0, Math.round(progress * (PROJECTS.length - 1)))
      );

      if (idx !== lastActiveIdx) {
        lastActiveIdx = idx;
        setActiveIndex(idx);
      }
    };

    const loop = () => {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      const diff = targetP - currentP;
      if (Math.abs(diff) > 0.0001) {
        currentP += diff * 0.75; // Snappy, ultra-responsive tracking with zero drag
        updatePosition(currentP);
        rafId = requestAnimationFrame(loop);
      } else {
        currentP = targetP;
        updatePosition(currentP);
        isLoopRunning = false;
      }
    };

    const startLoop = () => {
      if (!isLoopRunning && isVisible) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    };

    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const rawProgress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      targetP = rawProgress;
      startLoop();
    };

    // Auto-sleep when section is scrolled out of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          measure();
          startLoop();
        } else {
          isLoopRunning = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      onScroll();
    });

    measure();
    onScroll();
    updatePosition(0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const currentProject = PROJECTS[activeIndex];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-[#07080a] text-zinc-100 select-none border-t border-white/10"
      style={{ height: "220vh" }} // Shortened from 480vh for swift, effortless, 2x faster scrolling
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-12">
        {/* TOP BAR: Section Title & Category Navigator */}
        <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-2.5 sm:gap-3 border-b border-white/10 pb-3 sm:pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-amber-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
                02 / Portfolio & Engineering Landmarks
              </span>
            </div>
            <h2 className="text-lg sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-0.5 sm:mt-1">
              Featured Projects<span className="text-amber-400">.</span>
            </h2>
          </div>

          {/* Interactive Category Pill Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToProject(i)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 border shrink-0 cursor-pointer ${
                  activeIndex === i
                    ? "bg-amber-500/25 text-amber-300 border-amber-400/60 shadow-sm shadow-amber-500/20"
                    : "bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white hover:bg-white/[0.05]"
                }`}
                title={`Jump to ${p.title}`}
                aria-label={`Jump to ${p.category}`}
              >
                {p.category.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE: Horizontal Sliding Reel of Project Cards (Zero CSS Transition Lag) */}
        <div className="relative w-full flex-1 my-auto flex items-center overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-5 sm:gap-8 md:gap-12 pl-1 sm:pl-2 pr-16 sm:pr-24 will-change-transform"
            style={{ width: "max-content" }}
          >
            {PROJECTS.map((proj, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <div
                  key={proj.id}
                  className={`group relative flex-shrink-0 w-[88vw] sm:w-[75vw] md:w-[64vw] lg:w-[56vw] max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900/90 to-[#0e1015] border transition-all duration-300 ${
                    isCurrent
                      ? "border-amber-400/50 shadow-2xl shadow-amber-500/10 scale-100"
                      : "border-white/10 opacity-70 hover:opacity-100 scale-[0.98]"
                  }`}
                >
                  {/* Aspect Ratio Box with Photo & Parallax Overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 60vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      priority={idx === 0}
                    />

                    {/* Gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />

                    {/* Status Badge (Top-Right) */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <span
                        className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                          proj.status === "Completed"
                            ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                            : "bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50"
                        }`}
                      />
                      <span className="text-[9px] sm:text-[11px] font-mono tracking-wider uppercase font-semibold text-white">
                        {proj.status.toUpperCase()} · {proj.statusDetail}
                      </span>
                    </div>

                    {/* Category Tag (Top-Left) */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] sm:text-[11px] font-mono tracking-widest uppercase text-amber-300 font-semibold">
                        {proj.category}
                      </span>
                    </div>

                    {/* Content Layer (Over Photo Bottom) */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 z-10 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
                      <div className="max-w-2xl">
                        <div className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center gap-1.5 sm:gap-2">
                          <span>📍 {proj.location}</span>
                          <span>•</span>
                          <span className="text-amber-400 font-bold">{proj.scale}</span>
                        </div>
                        <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                          {proj.title}
                        </h3>
                      </div>

                      <div className="hidden sm:flex items-center gap-2">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-mono text-white/30 tracking-tighter">
                          {proj.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Technical Spec Bar */}
                  <div className="p-3 sm:p-4 md:p-5 bg-black/50 backdrop-blur-md border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3 text-[11px] sm:text-xs text-zinc-300">
                      {proj.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="text-amber-400 font-bold font-mono">0{sIdx + 1}</span>
                          <span className="text-zinc-400 leading-snug line-clamp-1 sm:line-clamp-none">{spec}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-transform hover:scale-105 shrink-0 shadow-md shadow-amber-500/20"
                    >
                      <span>Inquire Blueprint</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
