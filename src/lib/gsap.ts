"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * GSAP + plugin registration lives here so it only ever happens once,
 * and only in the browser (registering on the server is a no-op but
 * wasteful, and can throw in some edge runtimes).
 *
 * Import `gsap`, `ScrollTrigger`, and `useGSAP` from this file
 * everywhere else in the app instead of importing "gsap" directly,
 * so every consumer shares the same registered instance.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/**
 * Shared animation language for every scroll-reveal in the site.
 *
 * Before this existed, each section had picked its own duration/ease/
 * stagger/trigger-point by feel — power2 here, power3 there, "top
 * 72%" in one file and "top 80%" in the next. None of it was wrong
 * individually, but the inconsistency is exactly what makes a page
 * feel assembled rather than directed. Importing from here instead
 * of hand-writing numbers is what keeps every section's entrance
 * reading as the same hand.
 */
export const EASE = {
  /** Fades, slides, scale-settles — nearly everything. */
  out: "power3.out",
  /** Clip-path / mask wipes, where motion needs to feel poured, not sprung. */
  inOut: "power3.inOut",
  /** Scroll-scrubbed parallax — must be linear so it never outruns the scrollbar. */
  linear: "none",
} as const;

export const DURATION = {
  fast: 0.6,
  base: 0.9,
  slow: 1.4,
  cinematic: 2,
} as const;

/** Standard gap between staggered children (text lines, note words, list items). */
export const STAGGER = 0.1;

/** Standard ScrollTrigger entry point — the element is ~1/4 into the viewport. */
export const SCROLL_START = "top 75%";

/** Standard one-time entrance: plays once, never reverses on scroll-back. */
export const REVEAL_ONCE = "play none none none";

/**
 * Wraps scroll-triggered entrance animations so they simply don't run
 * for anyone who's asked their OS for reduced motion — GSAP's own
 * matchMedia, not a manual check, so it also reacts live if the
 * person changes that setting mid-session. Content still appears
 * (it's just sitting in its default CSS state); only the motion is
 * skipped.
 */
export function whenMotionAllowed(setup: () => void) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", setup);
  return mm;
}
