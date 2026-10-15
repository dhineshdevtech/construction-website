import HeroConstructionScroll from "@/components/HeroConstructionScroll";
import FeaturedProjectsRail from "@/components/FeaturedProjectsRail";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0b0d] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* 1. HERO: Interactive Scroll-Scrubbed Construction Animation */}
      <HeroConstructionScroll />

      {/* 2. FEATURED PROJECTS: Horizontal Sticky Parallax Rail */}
      <FeaturedProjectsRail />

      {/* 3. STATS & OVERVIEW SECTION */}
      <section id="about" className="relative z-10 py-28 px-6 border-t border-white/10 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                01 / The Firm
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mt-3 leading-none">
                Ground-Up. <br />
                <span className="text-zinc-500">Uncompromising.</span>
              </h2>
              <p className="mt-6 text-zinc-400 text-base md:text-lg leading-relaxed">
                COROMANDEL LANDMARKS is Chennai&apos;s foremost architectural design-build firm.
                From coastal foundations on ECR to high-density commercial towers across the OMR
                tech corridor, we deliver turnkey engineering mastery with single-point accountability.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 w-full lg:w-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-3xl sm:text-4xl font-black text-amber-400">18+</div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 mt-1">Years in Chennai</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-3xl sm:text-4xl font-black text-white">160+</div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 mt-1">Luxury Homes</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-3xl sm:text-4xl font-black text-amber-400">99%</div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 mt-1">On-Time Delivery</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-3xl sm:text-4xl font-black text-white">₹450Cr</div>
                <div className="text-xs uppercase tracking-wider text-zinc-400 mt-1">Total Built Value</div>
              </div>
            </div>
          </div>

          {/* 3. CAPABILITIES / SERVICES */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Coastal Luxury Villas</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Bespoke residences engineered specifically for coastal salinity resistance, open tropical ventilation, and private sea-facing infinity layouts.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                🏢
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Commercial Landmarks</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Modern corporate headquarters, boutique retail complexes, and IT tech parks with double-glazed acoustic curtain walling.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                📐
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Turnkey Design-Build</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Architectural blueprints, CMDA sanction permits, structural engineering, and premium interior execution under one unified contract.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                🌿
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Green Sustainable Architecture</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                IGBC Gold-rated standards, integrated solar photovoltaic arrays, rainwater harvesting, and thermal-insulated wall construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS ROADMAP */}
      <section id="phases" className="py-28 px-6 bg-[#0a0b0d] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
              02 / The Process
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mt-3">
              Precision at Every Stage
            </h2>
            <p className="text-zinc-400 mt-4 text-sm md:text-base">
              Weekly digital progress audits, live drone inspections, and transparent fixed-cost milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="border-t-2 border-amber-500/40 pt-6">
              <div className="text-4xl font-black text-zinc-700 font-mono mb-2">01</div>
              <h4 className="text-lg font-bold text-white uppercase">Site & Soil Dynamics</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Geotechnical borehole testing, water table analysis, and CMDA compliance approval.
              </p>
            </div>

            <div className="border-t-2 border-amber-500/40 pt-6">
              <div className="text-4xl font-black text-zinc-700 font-mono mb-2">02</div>
              <h4 className="text-lg font-bold text-white uppercase">BIM & 3D Engineering</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Full virtual structural modeling, clash detection, and photorealistic client walkthroughs.
              </p>
            </div>

            <div className="border-t-2 border-amber-500/40 pt-6">
              <div className="text-4xl font-black text-zinc-700 font-mono mb-2">03</div>
              <h4 className="text-lg font-bold text-white uppercase">Superstructure Build</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Ready-mix concrete batches, ultrasonic rebar testing, and laser-guided leveling.
              </p>
            </div>

            <div className="border-t-2 border-amber-500 pt-6">
              <div className="text-4xl font-black text-amber-500 font-mono mb-2">04</div>
              <h4 className="text-lg font-bold text-white uppercase">Turnkey Handover</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Complete snag-free inspection, 10-year structural warranty, and ceremonial keys delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA / CONTACT SECTION */}
      <section id="contact" className="relative py-32 px-6 bg-gradient-to-b from-[#0e1014] to-[#0a0b0d] border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
            03 / Build With Us
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight mt-4 leading-tight">
            Ready to Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Chennai Landmark?
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 text-base md:text-lg">
            Schedule a confidential consultation with our principal architects and engineering directors.
          </p>

          <form className="mt-10 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your Phone or Email"
              className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-xl shadow-amber-500/20"
            >
              Request Consultation
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-zinc-500">
            <span>📍 Boat Club Road, RA Puram, Chennai</span>
            <span>•</span>
            <span>📞 +91 (044) 4800 2900</span>
            <span>•</span>
            <span>✉️ build@coromandellandmarks.com</span>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-zinc-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-bold text-zinc-400 tracking-wider">
            COROMANDEL LANDMARKS © 2026
          </div>
          <div>All rights reserved. Luxury Construction & Architectural Engineering.</div>
        </div>
      </footer>
    </div>
    </SmoothScroll>
  );
}
