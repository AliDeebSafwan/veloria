"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScrollIndicatorProps {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
  /** Text/line color, inherited from the parent — light on video, dark on ivory. */
  tone?: "light" | "dark";
}

/**
 * A quiet scroll cue: a hairline track with a short segment trickling
 * down it on a slow, continuous loop. Deliberately not a bounce —
 * the brand's motion language is unhurried, not playful.
 */
export function ScrollIndicator({
  ref,
  className,
  tone = "dark",
}: ScrollIndicatorProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { yPercent: -100 },
        {
          yPercent: 100,
          duration: 2.2,
          ease: "sine.inOut",
          repeat: -1,
        },
      );
    },
    { dependencies: [reducedMotion], scope: lineRef },
  );

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-3",
        tone === "light" ? "text-ivory-50" : "text-ink",
        className,
      )}
    >
      <span className="text-[10px] font-medium tracking-[0.35em] opacity-70">
        SCROLL
      </span>
      <span className="relative h-9 w-px overflow-hidden bg-current/25">
        <span
          ref={lineRef}
          className="absolute inset-x-0 top-0 h-1/2 bg-current"
        />
      </span>
    </div>
  );
}
