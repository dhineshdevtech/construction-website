import HeroConstructionScroll from "@/components/HeroConstructionScroll";
import FeaturedProjectsRail from "@/components/FeaturedProjectsRail";
import ServicesCylinderScroll from "@/components/ServicesCylinderScroll";
import AboutCompanySection from "@/components/AboutCompanySection";
import ProcessRoadmapSection from "@/components/ProcessRoadmapSection";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0b0d] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
        {/* 1. HERO: Interactive Scroll-Scrubbed Construction Animation */}
        <HeroConstructionScroll />

        {/* 2. FEATURED PROJECTS: Horizontal Sticky Parallax Rail */}
        <FeaturedProjectsRail />

        {/* 3. CAPABILITIES & SERVICES: 3D Cylindrical Drum Scroll */}
        <ServicesCylinderScroll />

        {/* 4. ABOUT THE COMPANY: Split-Screen Scrollytelling & Telemetry HUD */}
        <AboutCompanySection />

        {/* 5. PROCESS ROADMAP: Interactive 5-Stage Construction Protocol */}
        <ProcessRoadmapSection />

        {/* 6. CTA / CONTACT SECTION */}
        <section id="contact" className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#0e1014] to-[#0a0b0d] border-t border-white/10 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-amber-400 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
              06 / Build With Us
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tight mt-3 sm:mt-4 leading-tight">
              Ready to Build Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Chennai Landmark?
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 text-zinc-400 text-xs sm:text-base md:text-lg max-w-xl mx-auto">
              Schedule a confidential consultation with our principal architects and engineering directors.
            </p>

            <form className="mt-8 sm:mt-10 max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Your Phone or Email"
                className="flex-1 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-xl shadow-amber-500/20"
              >
                Request Consultation
              </button>
            </form>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-zinc-500">
              <span>📍 Boat Club Road, RA Puram, Chennai</span>
              <span className="hidden sm:inline">•</span>
              <span>📞 +91 (044) 4800 2900</span>
              <span className="hidden sm:inline">•</span>
              <span>✉️ build@coromandellandmarks.com</span>
            </div>
          </div>
        </section>

        {/* 7. FOOTER */}
        <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-white/5 text-center text-[11px] sm:text-xs text-zinc-600">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
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
