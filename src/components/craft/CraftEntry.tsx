"use client";

import { useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  isDesktopViewport,
  EASE,
  DURATION,
  STAGGER,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { CraftEntryTranslation } from "@/i18n/translations";

interface CraftEntryProps {
  image: string;
  entry: CraftEntryTranslation;
  index: number;
}

/**
 * Same GSAP-owns-the-transform discipline as the rest of the site:
 * the image's entrance scale and hover zoom both live on
 * `.craft-image`, and both are GSAP tweens — never a Tailwind
 * transform utility on that element — so nothing fights over the
 * transform property.
 *
 * Text direction/font isn't hardcoded here — it follows whichever
 * language is currently active (the `t` dictionary already resolves
 * to the right one), so this reads correctly in both EN and AR
 * rather than always rendering as Arabic.
 */
export function CraftEntry({ image, entry, index }: CraftEntryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const reversed = index % 2 === 1;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      whenMotionAllowed(() => {
        const revealTrigger = {
          trigger: root,
          start: SCROLL_START,
          ...REVEAL_ONCE,
        };

        gsap.fromTo(
          ".craft-frame",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DURATION.slow,
            ease: EASE.inOut,
            scrollTrigger: revealTrigger,
          },
        );
        gsap.fromTo(
          ".craft-image",
          { scale: 1.18 },
          { scale: 1, duration: DURATION.cinematic, ease: EASE.out, scrollTrigger: revealTrigger },
        );
        gsap.fromTo(
          ".craft-copy > *",
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

        if (isDesktopViewport()) {
          gsap.to(".craft-image", {
            yPercent: 6,
            ease: EASE.linear,
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      });

      const image = root.querySelector<HTMLElement>(".craft-image");
      const handleEnter = () =>
        gsap.to(image, { scale: 1.07, duration: 1.1, ease: "power2.out", overwrite: "auto" });
      const handleLeave = () =>
        gsap.to(image, { scale: 1, duration: 0.9, ease: "power2.out", overwrite: "auto" });

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
      className="group mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-24"
    >
      <div className={cn("relative lg:col-span-6", reversed && "lg:order-2")}>
        <div className="craft-frame relative aspect-[3/4] overflow-hidden border border-gold-core/20 p-2">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={image}
              alt={entry.imageAlt}
              fill
              data-cursor-explore
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="craft-image object-cover"
            />
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-2 border border-gold-core opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      </div>

      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={cn(
          "craft-copy flex flex-col justify-center lg:col-span-6",
          isArabic ? "text-right" : "text-left",
          reversed && "lg:order-1",
        )}
      >
        {entry.type === "paragraph" && (
          <p className="max-w-lg text-[17px] leading-[2] text-ink/80">{entry.text}</p>
        )}

        {entry.type === "list" && (
          <>
            <h3 className="font-serif text-3xl leading-tight text-ink lg:text-4xl">
              {entry.heading}
            </h3>
            <ul className="mt-6 flex max-w-lg flex-col gap-3">
              {entry.items?.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-start gap-3 text-[16px] leading-relaxed text-ink/80",
                    isArabic ? "flex-row-reverse justify-end" : "justify-start",
                  )}
                >
                  <span className="mt-1 shrink-0 text-gold-deep" aria-hidden="true">
                    ✦
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
