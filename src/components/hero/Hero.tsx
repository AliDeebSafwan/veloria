"use client";

import type { RefObject } from "react";

import { HeroVideo } from "@/components/hero/HeroVideo";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";
import { useLanguage } from "@/i18n/LanguageProvider";

export interface HeroRefs {
  sectionRef: RefObject<HTMLElement | null>;
  videoWrapRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  headlineRef: RefObject<HTMLHeadingElement | null>;
  taglineRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLAnchorElement | null>;
  scrollIndicatorRef: RefObject<HTMLDivElement | null>;
}

interface HeroProps {
  refs: HeroRefs;
}

/**
 * Phone (< md): the film runs full-bleed edge to edge, with copy
 * overlaid near the bottom over a gradient scrim — an immersive,
 * one-frame composition sized for a portrait screen the video
 * already matches.
 *
 * Tablet and up (md+): the same film sits inside a framed vertical
 * stage — echoing the bordered lockup in the brand references —
 * with the wordmark, tagline, and CTA arranged beneath it across
 * generous ivory space, rather than stretched into a blurry
 * full-bleed cover.
 *
 * The framed treatment switches at `md` (768px), not `lg`, on
 * purpose — the source video is a fixed 478px wide, and a tablet in
 * the 768–1023px range stretching it full-bleed looked exactly as
 * soft as the desktop case this framing was originally built to
 * avoid. Everywhere else in the site treats `lg` as the tablet/
 * desktop line; the hero is the one deliberate exception, because
 * it's the one section whose mobile treatment is media-resolution-
 * bound rather than just a layout preference.
 */
export function Hero({ refs }: HeroProps) {
  const {
    sectionRef,
    videoWrapRef,
    contentRef,
    headlineRef,
    taglineRef,
    ctaRef,
    scrollIndicatorRef,
  } = refs;
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="relative h-[145dvh] md:h-[175dvh]">
      <div className="sticky top-0 flex h-dvh w-full flex-col items-center overflow-hidden bg-ivory-50 md:justify-center md:gap-10 md:py-16">
        <HeroVideo
          ref={videoWrapRef}
          className="absolute inset-0 motion-safe:scale-105 motion-safe:opacity-0 md:static md:inset-auto md:order-1 md:aspect-[478/850] md:h-[48vh] md:max-h-[520px] md:w-auto md:shrink-0 md:border md:border-gold-core/30 md:p-1.5 md:shadow-[0_50px_90px_-45px_rgba(28,25,21,0.35)]"
        />

        {/* Legibility scrim for text over video — phone only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent md:hidden"
        />

        <div
          ref={contentRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 px-6 pb-14 text-center md:static md:order-2 md:pb-0"
        >
          <div className="overflow-hidden">
            <h1
              ref={headlineRef}
              className="font-serif text-[clamp(2.75rem,13vw,4.75rem)] leading-none tracking-wide text-ivory-50 motion-safe:translate-y-[110%] md:text-7xl md:text-ink"
            >
              VELORIA
            </h1>
          </div>

          <p
            ref={taglineRef}
            className="text-xs font-medium tracking-[0.35em] text-gold-highlight motion-safe:translate-y-3 motion-safe:opacity-0 md:text-sm md:text-gold-deep"
          >
            {t.hero.tagline}
          </p>

          <a
            ref={ctaRef}
            href="#collection"
            className="mt-3 text-[11px] font-medium tracking-[0.25em] text-ivory-50 underline decoration-gold-core/70 underline-offset-[6px] transition-opacity hover:opacity-70 motion-safe:translate-y-3 motion-safe:opacity-0 md:text-ink"
          >
            {t.hero.cta}
          </a>
        </div>

        <ScrollIndicator
          ref={scrollIndicatorRef}
          tone="light"
          className="absolute inset-x-0 bottom-6 mx-auto motion-safe:opacity-0 md:static md:order-3 md:mt-2 md:text-ink"
        />
      </div>
    </section>
  );
}
