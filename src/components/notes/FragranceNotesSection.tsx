"use client";

import { useRef } from "react";

import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  EASE,
  DURATION,
  STAGGER,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import { NoteStage } from "@/components/notes/NoteStage";
import { NOTES_JOURNEY } from "@/data/notes-journey";

export function FragranceNotesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        gsap.fromTo(
          ".notes-intro-copy",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.base,
            stagger: STAGGER,
            ease: EASE.out,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: SCROLL_START,
              ...REVEAL_ONCE,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="notes"
      className="border-t border-gold-core/10 bg-ivory-50"
    >
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 text-center lg:px-10 lg:pt-32">
        <p className="notes-intro-copy text-xs font-medium tracking-[0.35em] text-gold-deep">
          THE COMPOSITION
        </p>
        <h2 className="notes-intro-copy mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight text-ink lg:text-6xl">
          Every Fragrance, In Three Movements
        </h2>
        <p className="notes-intro-copy mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
          A VELORIA fragrance is never one impression — it unfolds in
          sequence across the hours it&apos;s worn.
        </p>
      </div>

      <div className="mx-auto max-w-5xl">
        {NOTES_JOURNEY.map((stage, index) => (
          <NoteStage
            key={stage.id}
            stage={stage}
            index={index}
            isLast={index === NOTES_JOURNEY.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
