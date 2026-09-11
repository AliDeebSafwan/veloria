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
import { useLanguage } from "@/i18n/LanguageProvider";
import { CraftEntry } from "@/components/craft/CraftEntry";
import { CRAFT_IMAGES } from "@/data/craft";

/**
 * `id="collection"` — this section now serves as the site's main
 * showcase, replacing the old 4-fragrance catalog. The nav's
 * COLLECTION link and the hero CTA both already pointed at
 * `#collection`; retargeting the id here means neither Navigation.tsx
 * nor Hero.tsx needed to change at all.
 */
export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        gsap.fromTo(
          ".craft-intro-copy",
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
      id="collection"
      className="border-t border-gold-core/10 bg-ivory-50"
    >
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-20 text-center lg:px-10 lg:pt-32">
        <p className="craft-intro-copy text-xs font-medium tracking-[0.35em] text-gold-deep">
          {t.craft.label}
        </p>
        <h2 className="craft-intro-copy mx-auto mt-4 max-w-xl font-serif text-4xl leading-tight text-ink lg:text-6xl">
          {t.craft.heading}
        </h2>
      </div>

      <div className="divide-y divide-gold-core/10">
        {t.craft.entries.map((entry, index) => (
          <CraftEntry
            key={CRAFT_IMAGES[index]}
            image={CRAFT_IMAGES[index]}
            entry={entry}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
