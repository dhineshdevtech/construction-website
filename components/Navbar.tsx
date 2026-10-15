"use client";

import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects", num: "01" },
  { label: "Capabilities", href: "#services", num: "02" },
  { label: "The Firm", href: "#about", num: "03" },
  { label: "Process", href: "#process", num: "04" },
  { label: "Why Us", href: "#why-us", num: "05" },
  { label: "Contact", href: "#contact", num: "06" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* GLOBAL FIXED NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? "bg-[#08090c]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3 sm:py-3.5"
            : "bg-gradient-to-b from-[#08090c]/80 via-[#08090c]/40 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-amber-400 text-base sm:text-lg group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-sm shadow-amber-500/20">
              C
            </div>
            <div>
              <div className="text-white font-bold tracking-widest text-xs sm:text-sm uppercase leading-tight">
                COROMANDEL <span className="text-amber-400 font-light">LANDMARKS</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                Chennai · Luxury Design-Build
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-zinc-300">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5 group py-1"
              >
                <span className="text-[9px] text-zinc-500 group-hover:text-amber-400 transition-colors">
                  {link.num}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action: CTA & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="hidden sm:inline-flex px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-black text-[11px] sm:text-xs tracking-wider uppercase transition-transform hover:scale-105 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Start Your Build
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:text-amber-400 hover:border-amber-400/40 transition-colors cursor-pointer flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              aria-label="Toggle Navigation Menu"
            >
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION DRAWER */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-[#07080a]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between pt-24 pb-8 px-6 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Nav Links List */}
        <div className="flex flex-col space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
            NAVIGATION DIRECTORY
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="flex items-center justify-between py-3.5 border-b border-white/5 text-lg font-black text-white uppercase tracking-tight hover:text-amber-400 active:text-amber-400 transition-colors"
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-amber-500 font-bold">
                {link.num} →
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Drawer Bottom: Direct Contact & Primary Action */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <a
              href="tel:+914448002900"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center gap-1.5"
            >
              <span>📞</span>
              <span>Call HQ</span>
            </a>
            <a
              href="tel:+919840012890"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </a>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            className="w-full py-4 rounded-xl bg-amber-500 active:bg-amber-400 text-black font-black text-xs uppercase tracking-wider text-center block shadow-xl shadow-amber-500/25"
          >
            Start Your Build / Get a Quote →
          </a>

          <div className="text-center text-[10px] font-mono text-zinc-500">
            Boat Club Road, RA Puram, Chennai • Mon–Sat 9AM–7PM
          </div>
        </div>
      </div>
    </>
  );
}
