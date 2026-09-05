"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`, updating live if the user changes
 * the OS setting mid-session. Cinematic sequences (preloader,
 * ScrollTrigger parallax, autoplay video) should check this and fall
 * back to a static, near-instant presentation when true.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setReduced(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
