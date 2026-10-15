"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Chapter {
  id: string;
  chapterNumber: string;
  tag: string;
  title: string;
  narrative: string;
  points: { title: string; desc: string }[];
  metrics: { value: string; label: string }[];
  image: string;
  telemetry: {
    siteCode: string;
    coordinates: string;
    status: string;
    specs: string;
  };
}

const CHAPTERS: Chapter[] = [
  {
    id: "story",
    chapterNumber: "01",
    tag: "STORY & 18-YEAR LEGACY",
    title: "Eighteen Years of Shaping South India's Skyline",
    narrative:
      "Founded in 2008 with a singular mandate: to eliminate the compromise between audacious architectural design and rigorous ground-level civil execution. Over nearly two decades, COROMANDEL LANDMARKS has shaped Chennai's most iconic luxury corridors—from private beachfront estates along ECR to prestigious heritage residences in Boat Club and Poes Garden.",
    points: [
      {
        title: "Pioneering Civil Heritage",
        desc: "Over 18 uninterrupted years of ground-up turnkey construction in South India.",
      },
      {
        title: "Generational Relationships",
        desc: "Trusted by Chennai's foremost industrialists, architects, and private families.",
      },
    ],
    metrics: [
      { value: "18+", label: "Years in Chennai" },
      { value: "160+", label: "Landmarks Built" },
      { value: "₹450Cr+", label: "Capital Delivered" },
    ],
    image: "/projects/residential.jpg",
    telemetry: {
      siteCode: "CL-MAA-08 // HERITAGE",
      coordinates: "13.0185° N, 80.2574° E (BOAT CLUB)",
      status: "18-YEAR BENCHMARK VERIFIED",
      specs: "TURNKEY ARCHITECTURAL DELIVERY",
    },
  },
  {
    id: "mission",
    chapterNumber: "02",
    tag: "OUR MISSION & ETHOS",
    title: "Generational Permanence. Carbon-Conscious Integrity.",
    narrative:
      "We build structures designed to outlast economic cycles and climate stress. Our mission is to unite biophilic architecture with zero-carbon engineering—constructing residences and commercial landmarks with passive cooling aerodynamics, marine-resilient metallurgy, and self-sustaining energy envelopes that endure for a century.",
    points: [
      {
        title: "100-Year Life Cycle",
        desc: "Engineered specifically to resist coastal humidity, salinity, and seismic dynamics.",
      },
      {
        title: "Sustainable Foundations",
        desc: "Eco-certified slag concrete mixes and thermal double-glazed facades.",
      },
    ],
    metrics: [
      { value: "100-Yr", label: "Structural Design Life" },
      { value: "IGBC", label: "Platinum-Ready Standards" },
      { value: "0%", label: "Thermal Leakage Allowance" },
    ],
    image: "/projects/hospitality.jpg",
    telemetry: {
      siteCode: "CL-ECR-24 // RESILIENCE",
      coordinates: "12.8342° N, 80.2431° E (ECR COASTAL)",
      status: "BIOPHILIC ENVELOPE ACTIVE",
      specs: "100-YR LIFE DURABILITY MODEL",
    },
  },
  {
    id: "engineering",
    chapterNumber: "03",
    tag: "ENGINEERING EXPERTISE",
    title: "Micro-Tolerance Civil Mastery & Subterranean Science",
    narrative:
      "Chennai's challenging coastal water tables demand deep geotechnical prowess. Our engineering division operates with laser-guided precision—executing rotary bored cast-in-situ piles, subterranean crystalline waterproofing barriers, and expansive post-tensioned cantilevered slabs with strict ±2mm tolerances.",
    points: [
      {
        title: "BIM 4D Digital Clash Detection",
        desc: "Virtual structural and MEP synchronization eliminates on-site delays and errors.",
      },
      {
        title: "Subterranean Hydraulic Defense",
        desc: "Bentonite membranes and hydrostatic pressure-relief systems for coastal ground.",
      },
    ],
    metrics: [
      { value: "±2mm", label: "Laser Level Tolerance" },
      { value: "M60", label: "High-Density Concrete" },
      { value: "18m", label: "Column-Free Cantilevers" },
    ],
    image: "/projects/commercial.jpg",
    telemetry: {
      siteCode: "CL-OMR-19 // PRECISION",
      coordinates: "12.9150° N, 80.2290° E (OMR TECH CORRIDOR)",
      status: "BIM 4D LASER SYNCED",
      specs: "±2.0MM LEVELING TOLERANCE",
    },
  },
  {
    id: "quality",
    chapterNumber: "04",
    tag: "APPROACH TO QUALITY",
    title: "The 140-Point Zero-Defect QA/QC Protocol",
    narrative:
      "Quality is not an inspection event—it is an exacting protocol baked into every stage. From German ultrasonic concrete integrity testing and laser verticality audits to thermal imaging for insulation fidelity, our 140-point protocol ensures flawless structural and aesthetic execution with single-point accountability.",
    points: [
      {
        title: "140-Point Site Audit Checklist",
        desc: "Signed off stage-by-stage by senior structural directors before formwork removal.",
      },
      {
        title: "Non-Destructive Testing (NDT)",
        desc: "Ultrasonic pulse velocity and rebound hammer verification on every poured batch.",
      },
    ],
    metrics: [
      { value: "140", label: "QA/QC Inspection Gates" },
      { value: "100%", label: "NDT Batch Scanning" },
      { value: "10-Yr", label: "Full Structural Warranty" },
    ],
    image: "/projects/institutional.jpg",
    telemetry: {
      siteCode: "CL-QA-140 // ZERO DEFECT",
      coordinates: "13.0405° N, 80.2505° E (ALWARPET CENTRAL)",
      status: "140-GATE VERIFICATION PASS",
      specs: "10-YEAR STRUCTURAL WARRANTY",
    },
  },
];

export default function AboutCompanySection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterSectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Observe which chapter is in view
    const observers: IntersectionObserver[] = [];

    chapterSectionRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapter(index);
            }
          });
        },
        {
          rootMargin: "-35% 0px -35% 0px", // Trigger when chapter is comfortably centered
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToChapter = (index: number) => {
    const target = chapterSectionRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const currentChapter = CHAPTERS[activeChapter] || CHAPTERS[0];

  return (
    <section id="about" className="relative z-10 bg-[#090b0e] border-t border-white/10 text-white">
      {/* Unified Split-Screen Scrollytelling Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 relative">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Sticky Site Photograph & Live Telemetry */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 sticky top-0 lg:h-screen flex flex-col justify-center pt-3 pb-3 sm:pt-4 sm:pb-4 lg:py-10 z-30 bg-[#090b0e]/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b lg:border-b-0 border-white/5">
            <div className="flex items-center justify-between mb-2.5 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
                  04 / About the Firm
                </span>
              </div>
              <span className="text-zinc-500 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider whitespace-nowrap shrink-0">
                CHAPTER {currentChapter.chapterNumber} // 04
              </span>
            </div>

            {/* The Sticky Site Photograph Frame with Live HUD Telemetry */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] lg:aspect-[4/3] max-h-[28vh] sm:max-h-[38vh] lg:max-h-[72vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-black/80 shadow-2xl shadow-black/80 group">
              
              {/* Layered Site Photographs with Crossfade */}
              {CHAPTERS.map((ch, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <div
                    key={ch.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-out ${
                      isActive
                        ? "opacity-100 scale-100 blur-0"
                        : "opacity-0 scale-105 blur-[2px] pointer-events-none"
                    }`}
                  >
                    <Image
                      src={ch.image}
                      alt={ch.title}
                      fill
                      priority={idx === 0}
                      className="object-cover object-center transform transition-transform duration-[6000ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Architectural Vignette Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e]/70 via-transparent to-transparent pointer-events-none" />
                  </div>
                );
              })}

              {/* TELEMETRY OVERLAY / HUD LAYER */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none z-10 font-mono text-[11px]">
                


                <div />

                {/* Bottom HUD: Sleek 4-Segment Progress Bar */}
                <div>
                  <div className="grid grid-cols-4 gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                    {CHAPTERS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          activeChapter === i
                            ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                            : activeChapter > i
                            ? "bg-white/40"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Chaptered Scrollytelling Narrative Cards */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex flex-col">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapter === idx;

              return (
                <div
                  key={ch.id}
                  ref={(el) => {
                    chapterSectionRefs.current[idx] = el;
                  }}
                  className={`min-h-[46vh] lg:min-h-[54vh] flex flex-col justify-center py-8 sm:py-12 border-b border-white/5 last:border-b-0 transition-all duration-500 ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-30 scale-[0.98] blur-[0.3px]"
                  }`}
                >
                  {/* Chapter Header */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl sm:text-3xl font-mono font-black text-amber-500">
                      {ch.chapterNumber}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold border-l border-white/20 pl-2.5">
                      {ch.tag}
                    </span>
                  </div>

                  {/* Chapter Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase tracking-tight mt-2.5 leading-tight">
                    {ch.title}
                  </h3>

                  {/* Narrative Body */}
                  <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                    {ch.narrative}
                  </p>

                  {/* Key Pillars / Deliverable Points */}
                  <div className="mt-4 space-y-2.5">
                    {ch.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                        <div>
                          <div className="text-white text-xs sm:text-sm font-bold uppercase tracking-wide">
                            {pt.title}
                          </div>
                          <div className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                            {pt.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Live Metric Badges */}
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                    {ch.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className={`p-2.5 sm:p-3 rounded-lg border transition-all ${
                          isActive
                            ? "bg-amber-500/[0.07] border-amber-500/30"
                            : "bg-white/[0.02] border-white/5"
                        }`}
                      >
                        <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">
                          {m.value}
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider font-mono mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
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
