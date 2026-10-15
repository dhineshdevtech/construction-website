"use client";

import React, { useState, useEffect } from "react";

const TYPOLOGIES = [
  { id: "residence", label: "Luxury Residence / Villa", sub: "Boat Club, ECR, Poes Garden", icon: "🏛️" },
  { id: "commercial", label: "Commercial Headquarters", sub: "OMR, Guindy, Mount Road", icon: "🏢" },
  { id: "hospitality", label: "Boutique Resort / Hotel", sub: "ECR Coastal, Mahabalipuram", icon: "🏖️" },
  { id: "institutional", label: "Institutional Campus", sub: "Educational & Cultural Foundations", icon: "📐" },
];

const SCALES = [
  { id: "scale-1", label: "5,000 – 12,000 Sq.Ft.", timeline: "12 – 14 Mo. Delivery" },
  { id: "scale-2", label: "12,000 – 35,000 Sq.Ft.", timeline: "14 – 18 Mo. Delivery" },
  { id: "scale-3", label: "35,000 – 100,000 Sq.Ft.", timeline: "18 – 24 Mo. Delivery" },
  { id: "scale-4", label: "100,000+ Sq.Ft. Landmark", timeline: "24 – 32 Mo. Fast-Track" },
];

const CORRIDORS = [
  "Boat Club / RA Puram",
  "East Coast Road (ECR)",
  "Poes Garden / Alwarpet",
  "OMR Tech Corridor",
  "Nungambakkam / Kilpauk",
  "Other Tamil Nadu Location",
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="contact" className="relative z-10 bg-[#060709] border-t border-white/10 text-white select-none">
      
      {/* ========================================================= */}
      {/* UPPER SECTION: Consultation & Scope Estimator */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
                07 / Direct Executive Concierge
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              Initiate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Landmark Blueprint.
              </span>
            </h2>
          </div>

          <div className="max-w-md md:text-right">
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed">
              Define your project scope below for a direct, confidential feasibility consultation
              with our principal architects and chief engineering directors.
            </p>
          </div>
        </div>

        {/* Main Content Grid: Interactive Scope Builder (Left) + Executive Concierge (Right) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT 7 COLS: The Interactive Scope & Estimate Form */}
          <div className="lg:col-span-7 bg-[#0b0d12] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            
            {submitted ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl mb-4 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                  ✓
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Feasibility Request Received
                </h3>
                <p className="mt-3 text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{fullName || "Esteemed Client"}</span>.
                  Our senior structural director has been notified of your inquiry for{" "}
                  <span className="text-amber-400">{selectedCorridor}</span>. We will contact you within 4 business hours.
                </p>
                <div className="mt-6 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                  REF: CL-{Math.floor(100000 + Math.random() * 900000)} // CONFIDENTIAL
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-amber-400 font-mono underline hover:text-amber-300"
                >
                  Configure another project scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                
                {/* Step 1: Typology */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      STEP 01 // Select Project Typology
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">REQUIRED</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TYPOLOGIES.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setSelectedTypology(t.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedTypology === t.id
                            ? "bg-amber-500/10 border-amber-500 text-white shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                            : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{t.icon}</span>
                          <span className="text-xs sm:text-sm font-bold uppercase tracking-tight text-white">
                            {t.label}
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1 font-mono">{t.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Scale */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      STEP 02 // Built-Up Area Scale
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">ESTIMATED TIMELINE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SCALES.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedScale(s.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedScale === s.id
                            ? "bg-amber-500/10 border-amber-500 text-white"
                            : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                          {s.label}
                        </div>
                        <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">{s.timeline}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Location Corridor & Site Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      STEP 03 // Location Corridor
                    </label>
                    <select
                      value={selectedCorridor}
                      onChange={(e) => setSelectedCorridor(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      {CORRIDORS.map((c) => (
                        <option key={c} value={c} className="bg-[#0b0d12] text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      Site Stage
                    </label>
                    <select
                      value={siteStatus}
                      onChange={(e) => setSiteStatus(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      <option value="raw-plot" className="bg-[#0b0d12] text-white">
                        Raw Plot (Ready to Build)
                      </option>
                      <option value="drawings-ready" className="bg-[#0b0d12] text-white">
                        Architectural Drawings Ready
                      </option>
                      <option value="redevelopment" className="bg-[#0b0d12] text-white">
                        Demolition & Redevelopment
                      </option>
                      <option value="seeking-land" className="bg-[#0b0d12] text-white">
                        Acquiring Land / Evaluation
                      </option>
                    </select>
                  </div>
                </div>

                {/* Step 4: Contact Inputs */}
                <div className="pt-2 border-t border-white/5 space-y-3">
                  <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    STEP 04 // Confidential Contact Details
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (+91 ...)"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Official / Personal Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-zinc-500">
                    🔒 Strict NDA Discretion • Zero Contractor Spam
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-amber-500/25 cursor-pointer text-center"
                  >
                    Request Feasibility Study →
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT 5 COLS: Direct Concierge & Headquarters Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Headquarters Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 space-y-6">
              
              {/* Live Status Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    HQ DIRECTORS DESK ACTIVE
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  {currentTime ? `${currentTime} IST` : "CHENNAI IST"}
                </div>
              </div>

              {/* Physical Address */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  PRINCIPAL DESIGN-BUILD HEADQUARTERS
                </div>
                <div className="text-base sm:text-lg font-bold text-white leading-snug">
                  Coromandel Tower, Level 7
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  Boat Club Road, RA Puram, Chennai – 600028, TN, India
                </div>
              </div>

              {/* Direct Communication Lines */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+914448002900"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-400/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-sm">📞</span>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Executive Switchboard</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-amber-400">
                        +91 (044) 4800 2900
                      </div>
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 text-xs">→</span>
                </a>

                <a
                  href="tel:+919840012890"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-400/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-sm">💬</span>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Director Direct WhatsApp</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-amber-400">
                        +91 98400 12890
                      </div>
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 text-xs">→</span>
                </a>

                <a
                  href="mailto:directors@coromandellandmarks.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-400/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-sm">✉️</span>
                    <div>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase">Confidential Project Registry</div>
                      <div className="text-xs sm:text-sm font-mono font-bold text-white group-hover:text-amber-400 truncate max-w-[200px] sm:max-w-none">
                        directors@coromandellandmarks.com
                      </div>
                    </div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-amber-400 text-xs">→</span>
                </a>
              </div>

              {/* Environmental Resilience Tag */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>COASTAL CHENNAI STATION</span>
                <span className="text-amber-400/80">31°C • HUMIDITY 72% • SE 14 KM/H</span>
              </div>

            </div>

            {/* Certifications Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                MANDATORY STATUTORY REGISTRATIONS
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-400">
                <div>• CMDA Class-I Special Builder</div>
                <div>• IGBC Platinum Certified</div>
                <div>• ISO 9001:2015 Civil QA</div>
                <div>• Structural Warranty Registry</div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* LOWER SECTION: Monolithic Architectural Footer */}
      {/* ========================================================= */}
      <footer className="pt-16 sm:pt-24 pb-12 border-t border-white/10 bg-[#040507]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Top Brand Hero Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/10">
            <div>
              <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                COROMANDEL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  LANDMARKS
                </span>
              </div>
              <p className="text-zinc-500 text-xs sm:text-sm font-mono uppercase tracking-widest mt-3">
                Architectural Design & Precision Civil Engineering • Chennai, South India
              </p>
            </div>

            {/* Back to Top */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer self-start md:self-auto"
            >
              <span>Back to Top</span>
              <span className="text-amber-400 font-bold">↑</span>
            </button>
          </div>

          {/* 4 Column Directory */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 sm:py-16 border-b border-white/10 text-xs">
            
            {/* Col 1 */}
            <div>
              <div className="font-mono text-amber-400 uppercase tracking-widest text-[11px] font-bold mb-4">
                01 // Portfolio
              </div>
              <ul className="space-y-2.5 text-zinc-400 font-mono text-[11px]">
                <li><a href="#projects" className="hover:text-white transition-colors">Coastal Residences (ECR)</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Commercial Towers (OMR)</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Heritage Estates (Boat Club)</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Institutional Campuses</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Industrial Cleanrooms</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <div className="font-mono text-amber-400 uppercase tracking-widest text-[11px] font-bold mb-4">
                02 // Discipline
              </div>
              <ul className="space-y-2.5 text-zinc-400 font-mono text-[11px]">
                <li><a href="#services" className="hover:text-white transition-colors">4D BIM Clash Detection</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Rotary Geotechnical Piling</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">High-Strength M60 Mixes</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Subterranean Hydro-Shield</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">140-Point Snag Audits</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="font-mono text-amber-400 uppercase tracking-widest text-[11px] font-bold mb-4">
                03 // Standards
              </div>
              <ul className="space-y-2.5 text-zinc-400 font-mono text-[11px]">
                <li className="text-zinc-400">CMDA Sanctions & Permits</li>
                <li className="text-zinc-400">CRZ Coastal Clearances</li>
                <li className="text-zinc-400">IGBC Platinum Protocols</li>
                <li className="text-zinc-400">10-Year Warranty Deed</li>
                <li className="text-zinc-400">Ultrasonic Batch Testing</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <div className="font-mono text-amber-400 uppercase tracking-widest text-[11px] font-bold mb-4">
                04 // Corridors
              </div>
              <ul className="space-y-2.5 text-zinc-400 font-mono text-[11px]">
                <li className="text-zinc-400">Boat Club Road & RA Puram</li>
                <li className="text-zinc-400">East Coast Road (ECR)</li>
                <li className="text-zinc-400">Old Mahabalipuram Rd (OMR)</li>
                <li className="text-zinc-400">Poes Garden & Alwarpet</li>
                <li className="text-zinc-400">Anna Nagar & Kilpauk</li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono text-zinc-500">
            <div>
              © 2008 – 2026 COROMANDEL LANDMARKS PRIVATE LIMITED. ALL RIGHTS RESERVED.
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span>CIN: U45200TN2008PTC068940</span>
              <span>GSTIN: 33AABCC1234F1Z9</span>
              <span>PRIVACY & TERMS</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
