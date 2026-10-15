"use client";

import React, { useState } from "react";

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  location: string;
  projectScope: string;
  rating: number;
  quote: string;
  highlight: string;
  metrics: { label: string; value: string }[];
}

const ADVANTAGES = [
  {
    number: "01",
    title: "Zero-Escalation Fixed Contracts",
    description:
      "Every project is executed under a transparent fixed-price milestone contract. No hidden contingencies, no mid-construction cost spikes, and no price escalation clauses.",
    badge: "100% BUDGET FIDELITY",
  },
  {
    number: "02",
    title: "Integrated Single-Point Delivery",
    description:
      "Architects, structural engineers, MEP specialists, and interior master craftsmen operate under a unified leadership. One accountable director, zero subcontractor conflict.",
    badge: "SINGLE ACCOUNTABILITY",
  },
  {
    number: "03",
    title: "100% NDT Concrete Testing",
    description:
      "We conduct ultrasonic pulse velocity and rebound hammer testing on every poured column before formwork removal. Zero structural compromise tolerated.",
    badge: "M60 CERTIFIED BATCHES",
  },
  {
    number: "04",
    title: "10-Year Comprehensive Warranty",
    description:
      "All delivered superstructures, foundation piling, and subterranean waterproofing are backed by a formal 10-year legal structural warranty deed.",
    badge: "18-YR RECORD OF SOLVENCY",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    clientName: "Mr. Rajiv Sundaram",
    clientRole: "Founder & Managing Trustee",
    location: "ECR Beachfront Estate, Chennai",
    projectScope: "16,000 SQ. FT. COASTAL VILLA",
    rating: 5,
    highlight: "Zero salt degradation after 5 monsoons.",
    quote:
      "Building on the ECR coast is notoriously difficult due to extreme salinity and shallow water tables. Coromandel's geotechnical piling and marine-grade M40 concrete mix has withstood five heavy monsoons with zero degradation. They delivered three weeks ahead of schedule with exemplary professional integrity.",
    metrics: [
      { label: "TIMELINE", value: "3 Weeks Ahead" },
      { label: "SCALE", value: "16,000 Sq.Ft." },
      { label: "STATUS", value: "Delivered 2024" },
    ],
  },
  {
    id: "testimonial-2",
    clientName: "Dr. K. Meenakshi & Group",
    clientRole: "Managing Director, Tech Infrastructure",
    location: "OMR Tech Corridor, Chennai",
    projectScope: "240,000 SQ. FT. COMMERCIAL TOWER",
    rating: 5,
    highlight: "BIM clash detection saved millions in rework.",
    quote:
      "Their 4D BIM clash detection caught structural and HVAC collisions in the digital twin long before concrete was cast on site. The finish quality on the post-tensioned spans and acoustic double-glazed facade easily passed our multinational tenant's strict global audit.",
    metrics: [
      { label: "BUILT VALUE", value: "₹85Cr Delivered" },
      { label: "BIM CLASHES", value: "Zero Site Errors" },
      { label: "OCCUPANCY", value: "100% Leased" },
    ],
  },
  {
    id: "testimonial-3",
    clientName: "Ananya & Siddharth Rao",
    clientRole: "Private Family Residence",
    location: "Boat Club Road, RA Puram, Chennai",
    projectScope: "11,500 SQ. FT. HERITAGE RESIDENCE",
    rating: 5,
    highlight: "Unmatched craftsmanship on cantilevers and stone.",
    quote:
      "We demanded an architectural landmark that blended traditional South Indian hand-carved stone with dramatic column-free cantilevers. Coromandel translated audacious blueprints into unyielding structural reality. The 140-point snag inspection meant possession was truly flawless.",
    metrics: [
      { label: "FINISH", value: "Museum Grade" },
      { label: "AUDIT GATES", value: "140 Passed" },
      { label: "WARRANTY", value: "10-Year Deed" },
    ],
  },
];

export default function WhyUsAndTestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const currentTestimonial = TESTIMONIALS[activeTestimonial];

  return (
    <section id="why-us" className="relative z-10 bg-[#07080a] py-20 sm:py-28 lg:py-32 border-t border-white/10 text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
                06 / Proven Execution & Verified Proof
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">
              Why Landmarks Rise <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                With Coromandel.
              </span>
            </h2>
          </div>

          <div className="max-w-md md:text-right">
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
              Explore the four pillars of our engineering discipline, paired with verified
              testimonials from prominent Chennai homeowners and commercial leaders.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 1: The 4 Pillars of Uncompromising Execution */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.number}
              className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-amber-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono text-amber-500 group-hover:scale-105 transition-transform">
                    {adv.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {adv.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-snug">
                  {adv.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {adv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-amber-400">
                <span>VERIFIED STANDARD</span>
                <span className="text-zinc-600">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* PART 2: Verified Executive Testimonials Carousel */}
        {/* ========================================================= */}
        <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                Client Testimonials & Case Studies
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                Voices of Those Who Built With Us
              </h3>
            </div>

            {/* Testimonial Nav Tabs */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    activeTestimonial === idx
                      ? "bg-amber-500 text-black shadow-md shadow-amber-500/30 scale-105"
                      : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white hover:bg-white/10"
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Testimonial Card */}
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-b from-[#0e1015] to-[#080a0d] border border-amber-500/20 shadow-2xl relative overflow-hidden">
            
            {/* Top Row: Client Info, Location & Star Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-sm mb-1">
                  {"★".repeat(currentTestimonial.rating)}
                  <span className="text-xs font-mono text-zinc-400 ml-1">5.0 VERIFIED AUDIT</span>
                </div>
                <div className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
                  {currentTestimonial.clientName}
                </div>
                <div className="text-xs sm:text-sm text-zinc-400">
                  {currentTestimonial.clientRole} •{" "}
                  <span className="text-amber-400/90 font-mono">
                    📍 {currentTestimonial.location}
                  </span>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 self-start sm:self-auto">
                {currentTestimonial.projectScope}
              </div>
            </div>

            {/* Quote Body */}
            <div className="py-8">
              <div className="text-amber-400 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold mb-3">
                “{currentTestimonial.highlight}”
              </div>
              <blockquote className="text-base sm:text-xl lg:text-2xl text-zinc-200 font-normal leading-relaxed italic">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>
            </div>

            {/* Bottom Row: Project Metrics & Controls */}
            <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {currentTestimonial.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      {m.label}
                    </div>
                    <div className="text-xs sm:text-sm font-black text-white font-mono mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
                    )
                  }
                  className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider border border-white/10 text-zinc-300 hover:text-white hover:border-amber-400/40 transition-colors"
                >
                  ← Prev Client
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black font-bold transition-all shadow-md shadow-amber-500/20"
                >
                  Next Client →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
