"use client";

import React, { useState, useEffect } from "react";
import { scrollToSection } from "@/components/SmoothScroll";

const TYPOLOGIES = [
  { id: "residence", label: "Luxury Residence" },
  { id: "commercial", label: "Commercial HQ" },
  { id: "hospitality", label: "Boutique Resort" },
  { id: "institutional", label: "Institutional" },
];

const SCALES = [
  { id: "scale-1", label: "5,000 – 12,000 Sq.Ft." },
  { id: "scale-2", label: "12,000 – 35,000 Sq.Ft." },
  { id: "scale-3", label: "35,000 – 100,000 Sq.Ft." },
  { id: "scale-4", label: "100,000+ Sq.Ft." },
];

const CORRIDORS = [
  "Boat Club / RA Puram",
  "East Coast Road (ECR)",
  "Poes Garden / Alwarpet",
  "OMR Tech Corridor",
  "Nungambakkam / Kilpauk",
  "Other Chennai Location",
];

export default function ContactAndFooterSection() {
  const [selectedTypology, setSelectedTypology] = useState("residence");
  const [selectedScale, setSelectedScale] = useState("scale-1");
  const [selectedCorridor, setSelectedCorridor] = useState(CORRIDORS[0]);
  const [siteStatus, setSiteStatus] = useState("raw-plot");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live Chennai Time Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !email) return;
    setSubmitted(true);
  };

  const scrollToTop = () => {
    scrollToSection(0);
  };

  return (
    <div id="contact" className="relative z-10 bg-[#060709] border-t border-white/10 text-white select-none">
      
      {/* UPPER SECTION: Combined Simple & Short Executive Concierge */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-white/10 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
                Direct Executive Concierge
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.05]">
              Initiate Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Landmark Blueprint.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-md md:text-right leading-relaxed">
            Direct, confidential feasibility consultation with our principal architects and engineering directors.
          </p>
        </div>

        {/* Combined Single Unified Card */}
        <div className="bg-[#0b0d12] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left 7 cols: Compact Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="py-10 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl mb-3 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    Feasibility Request Received
                  </h3>
                  <p className="mt-2 text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{fullName || "Esteemed Client"}</span>. Our senior director will contact you within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 text-xs text-amber-400 font-mono underline hover:text-amber-300 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Typology Pills */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Project Typology
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TYPOLOGIES.map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setSelectedTypology(t.id)}
                          className={`px-3 py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            selectedTypology === t.id
                              ? "bg-amber-400 text-black font-bold border-amber-400 shadow-sm"
                              : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                          }`}
                        >
                          <span className="text-xs truncate block">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scale & Location Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Built-Up Scale
                      </label>
                      <select
                        value={selectedScale}
                        onChange={(e) => setSelectedScale(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      >
                        {SCALES.map((s) => (
                          <option key={s.id} value={s.id} className="bg-[#0b0d12] text-white">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                        Location Corridor
                      </label>
                      <select
                        value={selectedCorridor}
                        onChange={(e) => setSelectedCorridor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                      >
                        {CORRIDORS.map((c) => (
                          <option key={c} value={c} className="bg-[#0b0d12] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (+91 ...)"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Official / Personal Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
                  />

                  {/* Submit Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-mono text-zinc-500">
                      🔒 Strict NDA Discretion • Direct Director Call
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-lg shadow-amber-500/20 cursor-pointer"
                    >
                      Request Blueprint Study →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right 5 cols: Integrated Direct Headquarters & Contacts */}
            <div className="lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-8 space-y-4">
              {/* Status Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    HQ DIRECTORS DESK ACTIVE
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  {currentTime ? `${currentTime} IST` : "CHENNAI IST"}
                </div>
              </div>

              {/* Physical Office Address */}
              <div>
                <div className="text-[10px] font-mono uppercase text-zinc-500">PRINCIPAL HEADQUARTERS</div>
                <div className="text-sm font-bold text-white mt-0.5">Coromandel Tower, Level 7</div>
                <div className="text-xs text-zinc-400">Boat Club Road, RA Puram, Chennai – 600028</div>
              </div>

              {/* Direct Communication Channels */}
              <div className="space-y-2 pt-1">
                <a
                  href="tel:+914448002900"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-400/40 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-400 text-xs">📞</span>
                    <div>
                      <div className="text-[9px] font-mono uppercase text-zinc-500">Executive Switchboard</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-amber-400">
                        +91 (044) 4800 2900
                      </div>
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 text-xs">→</span>
                </a>

                <a
                  href="https://wa.me/919840012890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-400/40 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-emerald-400 text-xs">💬</span>
                    <div>
                      <div className="text-[9px] font-mono uppercase text-zinc-500">Director WhatsApp</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-amber-400">
                        +91 98400 12890
                      </div>
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 text-xs">→</span>
                </a>

                <a
                  href="mailto:directors@coromandellandmarks.com"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-400/40 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-400 text-xs">✉️</span>
                    <div>
                      <div className="text-[9px] font-mono uppercase text-zinc-500">Direct Registry</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-amber-400 truncate max-w-[180px]">
                        directors@coromandellandmarks.com
                      </div>
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 text-xs">→</span>
                </a>
              </div>

              {/* Statutory Certification Pills */}
              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 text-[10px] font-mono text-zinc-500">
                <span>• CMDA Special Builder</span>
                <span>• IGBC Platinum</span>
                <span>• ISO 9001:2015</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* LOWER SECTION: Streamlined Architectural Footer */}
      {/* ========================================================= */}
      <footer className="py-10 sm:py-12 border-t border-white/10 bg-[#040507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Main Footer Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                COROMANDEL <span className="text-amber-400">LANDMARKS</span>
              </div>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider mt-1">
                Architectural Design & Precision Civil Engineering · Chennai, India
              </p>
            </div>

            {/* Right: Single-Line Navigation & Back to Top */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-mono uppercase tracking-wider text-zinc-400">
              <a href="#projects" className="hover:text-amber-400 transition-colors whitespace-nowrap">Projects</a>
              <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap">Capabilities</a>
              <a href="#about" className="hover:text-amber-400 transition-colors whitespace-nowrap">The Firm</a>
              <a href="#why-us" className="hover:text-amber-400 transition-colors whitespace-nowrap">Why Us</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors whitespace-nowrap">Contact</a>

              <span className="hidden sm:inline w-[1px] h-4 bg-white/20" />

              {/* Back to Top */}
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Back to Top</span>
                <span className="text-amber-400 font-bold">↑</span>
              </button>
            </div>
          </div>

          {/* Bottom Copyright & Legal Line */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
            <div>
              © 2008 – 2026 Coromandel Landmarks Pvt. Ltd. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <span>Boat Club Road, RA Puram, Chennai</span>
              <span>•</span>
              <span className="hover:text-zinc-400 transition-colors cursor-pointer">Privacy & Terms</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
