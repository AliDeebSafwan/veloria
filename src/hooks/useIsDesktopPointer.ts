"use client";

import { useEffect, useState } from "react";

/**
 * True only for a real mouse on a large viewport — `(hover: hover) and
 * (pointer: fine)` excludes touchscreens (including large touch
 * laptops in some configurations), and the width check keeps the
 * cutoff aligned with the `lg` breakpoint used everywhere else in
 * the app. Reactive to window resizing and pointer changes.
 */
export function useIsDesktopPointer(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const widthQuery = window.matchMedia("(min-width: 1024px)");

    const update = () => setIsDesktop(pointerQuery.matches && widthQuery.matches);
    update();

    pointerQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    return () => {
      pointerQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, []);

  return isDesktop;
}
