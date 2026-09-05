"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/** Access the active Lenis instance, e.g. for programmatic `scrollTo`. */
export function useLenisInstance(): Lenis | null {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Wraps the app in Lenis smooth scrolling and keeps it perfectly in
 * sync with GSAP's ticker, so ScrollTrigger positions stay accurate
 * on every frame instead of drifting from requestAnimationFrame.
 */
export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Lenis's smoothing/lerp is itself a motion effect — skip it
    // entirely for anyone who's asked for reduced motion and let the
    // browser's native (instant) scroll take over. ScrollTrigger
    // doesn't require Lenis to function; it reads scroll position
    // directly regardless of what's driving it, so every section's
    // reveals still work correctly, just without the smoothing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenisInstance = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      wheelMultiplier: 1,
      syncTouch: true,
      // Lenis blocks in-page anchor links entirely unless this is
      // set — needed now that the nav/hero CTA both link to
      // #collection. Offset clears the fixed header height.
      anchors: { offset: -96 },
    });

    setLenis(lenisInstance);

    const onScroll = () => ScrollTrigger.update();
    lenisInstance.on("scroll", onScroll);

    const onTick = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenisInstance.off("scroll", onScroll);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
