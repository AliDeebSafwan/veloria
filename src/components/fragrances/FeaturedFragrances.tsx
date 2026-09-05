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
import { FragranceEntry } from "@/components/fragrances/FragranceEntry";
import { FRAGRANCES } from "@/data/fragrances";

/**
 * `id="collection"` — the nav's COLLECTION link and the hero CTA
 * already point here (`#collection`), set up before this section
 * existed. No changes needed to either.
 */
export function FeaturedFragrances() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredFragrances = FRAGRANCES.filter((fragrance) => fragrance.featured);

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        gsap.fromTo(
          ".section-copy",
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
              toggleActions: REVEAL_ONCE,
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
      id="collection"
      className="border-t border-gold-core/10 bg-ivory-50 py-4 lg:py-8"
    >
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 lg:px-10 lg:pt-32">
        <p className="section-copy text-xs font-medium tracking-[0.35em] text-gold-deep">
          THE COLLECTION
        </p>
        <h2 className="section-copy mt-4 max-w-xl font-serif text-4xl leading-tight text-ink lg:text-6xl">
          Featured Fragrances
        </h2>
        <p className="section-copy mt-5 max-w-md text-[15px] leading-relaxed text-ink/70">
          Four compositions, each a study in restraint — built from rare
          naturals and worn close.
        </p>
      </div>

      <div className="divide-y divide-gold-core/10">
        {featuredFragrances.map((fragrance, index) => (
          <FragranceEntry key={fragrance.id} fragrance={fragrance} index={index} />
        ))}
      </div>
    </section>
  );
}
