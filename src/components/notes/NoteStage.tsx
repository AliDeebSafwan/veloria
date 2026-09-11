"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  EASE,
  DURATION,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import type { NoteStageTranslation } from "@/i18n/translations";

interface NoteStageProps {
  stage: NoteStageTranslation;
  index: number;
  isLast: boolean;
}

/**
 * Type scale grows from Top → Base, echoing the actual weight
 * progression of a fragrance: light and fleeting at first, larger and
 * more grounded as it settles.
 */
const SCALE_BY_INDEX = [
  { title: "text-3xl lg:text-4xl", note: "text-lg lg:text-xl", weight: "font-normal" },
  { title: "text-4xl lg:text-5xl", note: "text-xl lg:text-2xl", weight: "font-normal" },
  { title: "text-5xl lg:text-6xl", note: "text-2xl lg:text-3xl", weight: "font-medium" },
];

// gold-deep, not gold-core — this dot is a meaningful status
// indicator (which stage is active), and gold-core only clears
// 2.6:1 against ivory, under the 3:1 WCAG floor for non-text UI.
const GOLD_MARKER = "#7D6232";
const IVORY_50 = "#F5F3EE";

export function NoteStage({ stage, index, isLast }: NoteStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scale = SCALE_BY_INDEX[index];

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      whenMotionAllowed(() => {
        const scrollTrigger = {
          trigger: root,
          start: SCROLL_START,
          ...REVEAL_ONCE,
        };

        if (!isLast) {
          gsap.fromTo(
            ".note-connector",
            { scaleY: 0 },
            { scaleY: 1, duration: DURATION.base, ease: EASE.out, scrollTrigger },
          );
        }

        gsap.fromTo(
          ".note-marker",
          { backgroundColor: IVORY_50 },
          { backgroundColor: GOLD_MARKER, duration: 0.5, ease: "power1.out", scrollTrigger },
        );

        const tl = gsap.timeline({ scrollTrigger });
        tl.fromTo(
          ".note-meta",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out },
        )
          .fromTo(
            ".note-title",
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE.out },
            "-=0.5",
          )
          .fromTo(
            ".note-description",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out },
            "-=0.55",
          )
          .fromTo(
            ".note-word",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: EASE.out },
            "-=0.45",
          );
      });
    },
    { scope: rootRef, dependencies: [index, isLast] },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative grid grid-cols-1 gap-6 px-6 py-16 lg:grid-cols-[96px_1fr] lg:gap-10 lg:px-10 lg:py-24",
        index === 2 && "bg-stone-200/40",
      )}
    >
      <div className="relative hidden lg:flex lg:justify-center">
        {!isLast && (
          <span
            className="note-connector absolute left-1/2 top-3 bottom-0 w-px origin-top -translate-x-1/2 scale-y-0 bg-gold-core/30"
            aria-hidden="true"
          />
        )}
        <span
          className="note-marker relative z-10 mt-3 h-2.5 w-2.5 rounded-full border border-gold-core"
          aria-hidden="true"
        />
      </div>

      <div>
        <div className="note-meta flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-serif text-sm text-gold-deep">
            {stage.numeral}
          </span>
          <span className="text-xs font-medium tracking-[0.35em] text-gold-deep">
            {stage.label}
          </span>
          <span className="text-[11px] tracking-[0.2em] text-ink/70">
            {stage.duration}
          </span>
        </div>

        <h3
          className={cn(
            "note-title mt-4 font-serif leading-[1.05] text-ink",
            scale.title,
            scale.weight,
          )}
        >
          {stage.title}
        </h3>

        <p className="note-description mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
          {stage.description}
        </p>

        <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
          {stage.notes.map((note) => (
            <span
              key={note}
              className={cn("note-word font-serif italic text-ink/85", scale.note)}
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
