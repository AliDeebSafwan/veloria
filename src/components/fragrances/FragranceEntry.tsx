"use client";

import { useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
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
import { NotesList } from "@/components/fragrances/NotesList";
import type { Fragrance } from "@/data/fragrances";

interface FragranceEntryProps {
  fragrance: Fragrance;
  index: number;
}

/**
 * Image scale (entrance + parallax) and the hover zoom all live on the
 * same `.fragrance-image` element, but every one of those tweens is
 * GSAP's — never a Tailwind/CSS transform utility on that element.
 * Mixing GSAP-managed transforms with CSS-class transforms on one
 * element causes the CSS side to lose silently (GSAP's inline style
 * wins), so hover is wired as GSAP tweens here rather than
 * `group-hover:scale-*`. Opacity-only effects (the gold accent frame)
 * don't touch transform, so those stay plain Tailwind.
 */
export function FragranceEntry({ fragrance, index }: FragranceEntryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reversed = index % 2 === 1;
  const orderNumber = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      whenMotionAllowed(() => {
        const revealTrigger = {
          trigger: root,
          start: SCROLL_START,
          toggleActions: REVEAL_ONCE,
        };

        gsap.fromTo(
          ".fragrance-frame",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DURATION.slow,
            ease: EASE.inOut,
            scrollTrigger: revealTrigger,
          },
        );
        gsap.fromTo(
          ".fragrance-image",
          { scale: 1.18 },
          {
            scale: 1,
            duration: DURATION.cinematic,
            ease: EASE.out,
            scrollTrigger: revealTrigger,
          },
        );
        gsap.fromTo(
          ".fragrance-copy > *",
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.base,
            stagger: STAGGER,
            ease: EASE.out,
            scrollTrigger: revealTrigger,
          },
        );

        // Continuous subtle parallax drift while the entry is in view.
        gsap.to(".fragrance-image", {
          yPercent: 7,
          ease: EASE.linear,
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });

      // Hover: extra zoom on the same image element (GSAP composites
      // this with the parallax's yPercent fine, since they're
      // different transform components) plus a subtle heading shift.
      // Kept outside whenMotionAllowed — it only ever fires in
      // response to an actual mouse movement, not on page load.
      const image = root.querySelector<HTMLElement>(".fragrance-image");
      const heading = root.querySelector<HTMLElement>(".fragrance-heading");

      const handleEnter = () => {
        gsap.to(image, { scale: 1.07, duration: 1.1, ease: "power2.out", overwrite: "auto" });
        gsap.to(heading, { x: 6, duration: 0.6, ease: "power2.out", overwrite: "auto" });
      };
      const handleLeave = () => {
        gsap.to(image, { scale: 1, duration: 0.9, ease: "power2.out", overwrite: "auto" });
        gsap.to(heading, { x: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      };

      root.addEventListener("mouseenter", handleEnter);
      root.addEventListener("mouseleave", handleLeave);

      return () => {
        root.removeEventListener("mouseenter", handleEnter);
        root.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="group mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-28"
    >
      <div className={cn("relative lg:col-span-7", reversed && "lg:order-2")}>
        <span className="mb-4 block font-serif text-sm tracking-[0.2em] text-gold-deep lg:absolute lg:-top-9 lg:mb-0">
          {orderNumber}
        </span>

        <div className="fragrance-frame relative aspect-[4/5] overflow-hidden border border-gold-core/20 p-2">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={fragrance.image}
              alt={fragrance.imageAlt}
              fill
              data-cursor-explore
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="fragrance-image object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-gold-core opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </div>

      <div
        className={cn(
          "fragrance-copy flex flex-col justify-center lg:col-span-5",
          reversed && "lg:order-1",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-deep">
            {fragrance.category}
          </p>
          {!fragrance.available && (
            <span className="border border-gold-core/40 px-2 py-0.5 text-[10px] font-medium tracking-[0.25em] text-gold-deep">
              COMING SOON
            </span>
          )}
        </div>
        <h3 className="fragrance-heading mt-3 font-serif text-4xl leading-[1.05] text-ink lg:text-5xl">
          {fragrance.name}
        </h3>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
          {fragrance.description}
        </p>
        <NotesList
          topNotes={fragrance.topNotes}
          heartNotes={fragrance.heartNotes}
          baseNotes={fragrance.baseNotes}
          className="mt-8 max-w-md"
        />
        <p className="mt-6 text-[11px] font-medium tracking-[0.25em] text-ink/70">
          {fragrance.size} · {fragrance.currency} {fragrance.price}
        </p>
      </div>
    </div>
  );
}
