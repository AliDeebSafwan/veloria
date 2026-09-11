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

/**
 * Deliberately sparse — the hero already delivered the big brand
 * moment, so this closes the page quietly instead of repeating it:
 * a small signature-scale wordmark, one strong line, one button.
 */
export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        const revealTrigger = {
          trigger: sectionRef.current,
          start: SCROLL_START,
          ...REVEAL_ONCE,
        };

        gsap.fromTo(
          ".cta-line",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.base,
            stagger: STAGGER,
            ease: EASE.out,
            scrollTrigger: revealTrigger,
          },
        );

        // A slow, infrequent sweep of light across the button — the
        // same masked-sheen idea from the preloader's logo reveal,
        // bookending the site with the one recurring gold motif.
        // Kept inside whenMotionAllowed since it repeats
        // indefinitely — exactly the kind of motion reduced-motion
        // is meant to suppress.
        gsap.fromTo(
          ".cta-sweep",
          { backgroundPosition: "-70% 0%" },
          {
            backgroundPosition: "170% 0%",
            duration: 1.4,
            ease: "power1.inOut",
            repeat: -1,
            repeatDelay: 3.5,
            scrollTrigger: revealTrigger,
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-gold-core/10 bg-ivory-50"
    >
      <div className="mx-auto max-w-xl px-6 py-28 text-center lg:py-40">
        <p className="cta-line font-serif text-2xl tracking-wide text-ink lg:text-3xl">
          {t.cta.wordmark}
        </p>
        <p className="cta-line mt-3 text-xs font-medium tracking-[0.35em] text-gold-deep">
          {t.cta.tagline}
        </p>

        <span
          className="cta-line mx-auto mt-8 block h-px w-10 bg-gold-core/40"
          aria-hidden="true"
        />

        <h2 className="cta-line mt-8 font-serif text-5xl italic leading-tight text-ink lg:text-7xl">
          {t.cta.statement}
        </h2>

        <a
          href="#collection"
          className="cta-line group relative mt-12 inline-flex items-center overflow-hidden border border-gold-core px-10 py-4 text-xs font-medium tracking-[0.3em] text-ink transition-colors duration-500 hover:text-ivory-50"
        >
          <span
            className="absolute inset-0 origin-left scale-x-0 bg-gold-core transition-transform duration-500 ease-out group-hover:scale-x-100"
            aria-hidden="true"
          />
          <span
            className="cta-sweep pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.7) 50%, transparent 65%)",
              backgroundSize: "250% 100%",
              backgroundPosition: "-70% 0%",
              mixBlendMode: "overlay",
            }}
            aria-hidden="true"
          />
          <span className="relative z-10">{t.cta.button}</span>
        </a>
      </div>
    </section>
  );
}
