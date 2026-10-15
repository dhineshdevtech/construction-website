import Navbar from "@/components/Navbar";
import HeroConstructionScroll from "@/components/HeroConstructionScroll";
import FeaturedProjectsRail from "@/components/FeaturedProjectsRail";
import ServicesCylinderScroll from "@/components/ServicesCylinderScroll";
import AboutCompanySection from "@/components/AboutCompanySection";
import ProcessRoadmapSection from "@/components/ProcessRoadmapSection";
import WhyUsAndTestimonialsSection from "@/components/WhyUsAndTestimonialsSection";
import ContactAndFooterSection from "@/components/ContactAndFooterSection";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#0a0b0d] text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
        {/* GLOBAL NAVIGATION: Desktop Bar & Responsive Mobile Drawer */}
        <Navbar />

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

        {/* 6. WHY CHOOSE US + TESTIMONIALS: 4 Core Pillars & Executive Client Endorsements */}
        <WhyUsAndTestimonialsSection />

        {/* 7. CONTACT / GET A QUOTE + MONOLITHIC LUXURY FOOTER */}
        <ContactAndFooterSection />
      </div>
    </SmoothScroll>
  );
}
