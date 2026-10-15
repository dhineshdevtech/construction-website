"use client";

import React, { useState } from "react";

interface Testimonial {
  id: string;
  avatarLetter: string;
  avatarColor: string;
  clientName: string;
  clientRole: string;
  location: string;
  date: string;
  projectScope: string;
  rating: number;
  quote: string;
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
    avatarLetter: "R",
    avatarColor: "bg-amber-600",
    clientName: "Rajiv Sundaram",
    clientRole: "Founder & Managing Trustee",
    location: "East Coast Road (ECR), Chennai",
    date: "3 weeks ago",
    projectScope: "Turnkey Luxury Villa · 16,000 Sq.Ft.",
    rating: 5,
    quote:
      "Building on the ECR coast was daunting due to severe coastal salinity. Coromandel's geotechnical piling and marine M40 mix has withstood five heavy monsoons with zero degradation. They delivered 3 weeks ahead of schedule with exemplary integrity.",
  },
  {
    id: "testimonial-2",
    avatarLetter: "M",
    avatarColor: "bg-teal-600",
    clientName: "Dr. K. Meenakshi",
    clientRole: "Managing Director, Tech Infra",
    location: "OMR Tech Corridor, Chennai",
    date: "1 month ago",
    projectScope: "Commercial Complex · 240,000 Sq.Ft.",
    rating: 5,
    quote:
      "Their 4D BIM clash detection caught structural collisions in the digital twin long before concrete was cast on site. The double-glazed acoustic facade easily passed our multinational tenant's strict global audit.",
  },
  {
    id: "testimonial-3",
    avatarLetter: "A",
    avatarColor: "bg-rose-600",
    clientName: "Ananya & Siddharth Rao",
    clientRole: "Private Residence",
    location: "Boat Club Road, RA Puram",
    date: "2 months ago",
    projectScope: "Heritage Luxury Estate · 11,500 Sq.Ft.",
    rating: 5,
    quote:
      "We demanded an architectural landmark blending hand-carved Dravidian stone with dramatic column-free cantilevers. Coromandel translated audacious blueprints into unyielding structural reality with museum-grade precision.",
  },
  {
    id: "testimonial-4",
    avatarLetter: "V",
    avatarColor: "bg-blue-600",
    clientName: "Vikramaditya Varma",
    clientRole: "Chairman, Logistics Group",
    location: "Poes Garden, Chennai",
    date: "3 months ago",
    projectScope: "Urban Luxury Estate · 22,000 Sq.Ft.",
    rating: 5,
    quote:
      "Zero budget escalation on a ₹42Cr turnkey contract. Every single milestone was accounted for with weekly drone footage, laser-screed floor audits, and certified batch testing. Absolute gold standard in civil construction.",
  },
  {
    id: "testimonial-5",
    avatarLetter: "D",
    avatarColor: "bg-purple-600",
    clientName: "Deepa & Arun Chandran",
    clientRole: "Architectural Patrons",
    location: "Covelong Beach, Chennai",
    date: "4 months ago",
    projectScope: "Beachfront Sanctuary · 14,000 Sq.Ft.",
    rating: 5,
    quote:
      "Our cantilevered sea-facing infinity pool seemed structurally impossible. Coromandel engineered the post-tensioned slab with zero vibration. The precision and finish are extraordinary.",
  },
  {
    id: "testimonial-6",
    avatarLetter: "N",
    avatarColor: "bg-emerald-600",
    clientName: "Capt. R. Narayanan",
    clientRole: "Senior Naval Architect (Retd.)",
    location: "Nungambakkam, Chennai",
    date: "5 months ago",
    projectScope: "Turnkey Contemporary · 9,800 Sq.Ft.",
    rating: 5,
    quote:
      "As a naval architect, I know saltwater corrosion intimately. Coromandel's subterranean waterproofing and structural curing practices are the finest in South India. 10-year warranty deed gave us complete peace of mind.",
  },
];

export default function WhyUsAndTestimonialsSection() {
  return (
    <section id="why-us" className="relative z-10 bg-[#07080a] py-20 sm:py-28 lg:py-32 border-t border-white/10 text-white select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
                05 / Proven Execution & Verified Proof
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
        {/* PART 2: Verified Google Reviews & Client Testimonials */}
        {/* ========================================================= */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-white/10">
          
          {/* Header inspired by reference design */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 sm:w-12 h-[1px] bg-zinc-600" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-semibold">
                GOOGLE REVIEWS
              </span>
              <span className="w-8 sm:w-12 h-[1px] bg-zinc-600" />
            </div>

            <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight">
              What Clients{" "}
              <span className="italic font-serif font-light text-zinc-300">
                Say About Us
              </span>
            </h3>

            {/* Rating Stats line */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-4 text-sm sm:text-base">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                4.9
              </span>
              <div className="flex text-amber-400 text-base sm:text-lg tracking-wider">
                ★★★★★
              </div>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                Based on 160+ Delivered Landmarks & Google Reviews
              </span>
            </div>
          </div>

          {/* Automatic Smooth Running Marquee Carousel */}
          <div className="relative w-full overflow-hidden py-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
            {/* Left and Right ambient fade vignettes for seamless edge vanishing */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#07080a] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#07080a] to-transparent z-10" />

            {/* Continuous Marquee Track */}
            <div className="flex gap-4 sm:gap-6 w-max animate-testimonial-marquee hover:[animation-play-state:paused]">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                <div
                  key={`${t.id}-${idx}`}
                  className="w-[310px] sm:w-[370px] lg:w-[410px] flex-shrink-0 p-5 sm:p-6 rounded-2xl bg-[#0d0f14]/90 border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                >
                  {/* Top Row: Avatar + Name + Rating + Google 'G' Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar Initial Circle */}
                        <div
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${t.avatarColor} text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md`}
                        >
                          {t.avatarLetter}
                        </div>

                        <div>
                          <div className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                            {t.clientName}
                          </div>
                          <div className="flex text-amber-400 text-xs tracking-wider mt-0.5">
                            {"★".repeat(t.rating)}
                          </div>
                        </div>
                      </div>

                      {/* Google G Icon Badge */}
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed italic min-h-[72px]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Card Bottom: Date & Location/Project */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{t.date} · {t.location.split(",")[0]}</span>
                    <span className="text-amber-400/90 font-medium truncate max-w-[150px] text-right">
                      {t.projectScope.split("·")[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
