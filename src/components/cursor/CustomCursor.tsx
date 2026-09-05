"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsDesktopPointer } from "@/hooks/useIsDesktopPointer";

type CursorVariant = "default" | "button" | "explore";

const SCALE_BY_VARIANT: Record<CursorVariant, number> = {
  default: 0.1,
  button: 0.55,
  explore: 1,
};

/**
 * Elements that expand the cursor into a ring — every interactive
 * control site-wide, picked up generically so nothing elsewhere has
 * to opt in by hand.
 */
const BUTTON_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary";

/**
 * Elements that swap the cursor for an "EXPLORE" label — imagery and
 * video by default, or anything explicitly opted in via the data
 * attribute once product sections exist.
 */
const EXPLORE_SELECTOR = "video, img, [data-cursor-explore]";

function resolveVariant(target: EventTarget | null): CursorVariant {
  if (!(target instanceof Element)) return "default";
  if (target.closest(EXPLORE_SELECTOR)) return "explore";
  if (target.closest(BUTTON_SELECTOR)) return "button";
  return "default";
}

/**
 * Replaces the native pointer with a small dot on desktop only.
 * Position is driven by gsap.quickTo (no React re-renders per
 * frame); the hover variant is plain state, since it only changes on
 * pointerover/pointerout, not every mouse move.
 */
export function CustomCursor() {
  const isDesktop = useIsDesktopPointer();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);

  // Hide the native pointer only while the custom one is active.
  useEffect(() => {
    document.body.style.cursor = isDesktop ? "none" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [isDesktop]);

  // Position + visibility + hover-target tracking.
  useGSAP(
    () => {
      if (!isDesktop || !cursorRef.current) return;

      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, scale: SCALE_BY_VARIANT.default });
      const setX = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.18,
        ease: "power3",
      });
      const setY = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.18,
        ease: "power3",
      });

      const handleMove = (event: PointerEvent) => {
        setX(event.clientX);
        setY(event.clientY);
        setVisible(true);
      };
      const handleOver = (event: PointerEvent) => {
        setVariant(resolveVariant(event.target));
      };
      const handleLeaveWindow = () => setVisible(false);

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerover", handleOver);
      // `document`, not `window` — leave events on window aren't
      // reliably fired across browsers when the cursor exits the
      // viewport.
      document.addEventListener("pointerleave", handleLeaveWindow);

      return () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerover", handleOver);
        document.removeEventListener("pointerleave", handleLeaveWindow);
      };
    },
    { dependencies: [isDesktop], scope: cursorRef },
  );

  // Smooth scale change between variants (transform only — kept
  // separate from color/border so GSAP owns the whole transform and
  // nothing fights the quickTo position tweens above).
  useGSAP(
    () => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        scale: SCALE_BY_VARIANT[variant],
        duration: 0.45,
        ease: "power3.out",
      });
    },
    { dependencies: [variant] },
  );

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100] flex h-20 w-20 items-center justify-center rounded-full border transition-[background-color,border-color,opacity] duration-300 ease-out",
        variant === "default" && "border-transparent bg-ink",
        variant === "button" && "border-gold-core bg-transparent",
        variant === "explore" &&
          "border-gold-core/50 bg-ivory-50/90 backdrop-blur-sm",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <span
        className={cn(
          "text-[10px] font-medium tracking-[0.25em] text-ink transition-opacity duration-200",
          variant === "explore" ? "opacity-100" : "opacity-0",
        )}
      >
        EXPLORE
      </span>
    </div>
  );
}
