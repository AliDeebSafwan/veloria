"use client";

import { useRef } from "react";
import Image from "next/image";

import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  EASE,
  DURATION,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import { STORY_MEDIA } from "@/constants/media";

/**
 * "THE ESSENCE OF VELORIA" — deliberately sparse copy. The image
 * bleeds to the viewport edge rather than sitting in a padded
 * container, breaking from every other section's contained layout on
 * purpose, for one asymmetric editorial moment.
 */
export function BrandStorySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        const trigger = {
          trigger: sectionRef.current,
          start: SCROLL_START,
          toggleActions: REVEAL_ONCE,
        };

        gsap.fromTo(
          ".story-frame",
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.slow, ease: EASE.inOut, scrollTrigger: trigger },
        );
        gsap.fromTo(
          ".story-image",
          { scale: 1.15 },
          { scale: 1, duration: DURATION.cinematic, ease: EASE.out, scrollTrigger: trigger },
        );
        gsap.to(".story-image", {
          yPercent: 6,
          ease: EASE.linear,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        const tl = gsap.timeline({ scrollTrigger: trigger });
        tl.fromTo(
          ".story-label",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out },
        )
          .fromTo(
            ".story-line",
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 1, stagger: 0.18, ease: EASE.out },
            "-=0.4",
          );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-gold-core/10 bg-ivory-50"
    >
      <div className="grid grid-cols-1 lg:min-h-[85vh] lg:grid-cols-12">
        <div className="story-frame relative aspect-[4/5] overflow-hidden lg:order-1 lg:col-span-7">
          <Image
            src={STORY_MEDIA.image}
            alt="A VELORIA fragrance box in soft studio light"
            fill
            data-cursor-explore
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="story-image object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 lg:order-2 lg:col-span-5 lg:px-16 lg:py-24">
          <p className="story-label text-xs font-medium tracking-[0.35em] text-gold-deep">
            THE ESSENCE OF VELORIA
          </p>
          <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-ink lg:text-6xl">
            <span className="story-line block">More than a fragrance.</span>
            <span className="story-line block">A presence.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
