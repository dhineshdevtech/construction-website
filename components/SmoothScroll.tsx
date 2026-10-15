"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToSection(target: string | number, offset = 0) {
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else if (typeof document !== "undefined") {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll configuration tuned for responsive luxury momentum
    const lenis = new Lenis({
      duration: 1.2, // Snappier deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly faster, natural wheel response
      touchMultiplier: 1.2,
    });

    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete window.__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
