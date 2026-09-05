"use client";

import { useRef } from "react";

import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  EASE,
  DURATION,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import { AutoplayVideo } from "@/components/media/AutoplayVideo";
import { FILM_MEDIA } from "@/constants/media";

/**
 * The one deliberate departure from the site's ivory palette — a dark
 * stage for the same packaging film shown in the hero, framed and
 * paced completely differently: masked open on scroll, then a slow
 * continuous scale/parallax drift for as long as the section is in
 * view, rather than the hero's static framed panel.
 */
export function CinematicFilmSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        const revealTrigger = {
          trigger: sectionRef.current,
          start: SCROLL_START,
          toggleActions: REVEAL_ONCE,
        };

        // Masked reveal — the frame opens from a small centered
        // rectangle out to its full size.
        gsap.fromTo(
          ".film-frame",
          { clipPath: "inset(32% 38% 32% 38%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: DURATION.slow + 0.4,
            ease: EASE.inOut,
            scrollTrigger: revealTrigger,
          },
        );
        gsap.fromTo(
          ".film-video",
          { scale: 1.28 },
          { scale: 1, duration: DURATION.cinematic + 0.2, ease: EASE.out, scrollTrigger: revealTrigger },
        );

        const tl = gsap.timeline({ scrollTrigger: revealTrigger });
        tl.fromTo(
          ".film-label",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out },
        )
          .fromTo(
            ".film-heading",
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 1, ease: EASE.out },
            "-=0.4",
          )
          .fromTo(
            ".film-caption",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out },
            "-=0.3",
          );

        // Continuous subtle scale drift while the section is in view —
        // separate from the entrance tween above, composited on the
        // same element without conflict since both are GSAP-owned.
        gsap.to(".film-video", {
          scale: 1.09,
          ease: EASE.linear,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-gold-core/10 bg-ink py-24 lg:py-36"
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p className="film-label text-xs font-medium tracking-[0.35em] text-gold-highlight">
          THE FILM
        </p>
        <h2 className="film-heading mx-auto mt-4 font-serif text-3xl leading-tight text-ivory-50 lg:text-5xl">
          Every detail, considered.
        </h2>
      </div>

      <div className="film-frame relative mx-auto mt-14 h-[62vh] max-h-[680px] overflow-hidden border border-gold-core/25 lg:mt-20 lg:h-[74vh]" style={{ aspectRatio: "478 / 850" }}>
        <AutoplayVideo
          className="film-video h-full w-full object-cover"
          poster={FILM_MEDIA.poster}
          preload="metadata"
          sources={[
            { src: FILM_MEDIA.videoWebm, type: "video/webm" },
            { src: FILM_MEDIA.videoMp4, type: "video/mp4" },
          ]}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-5 lg:p-7">
          <p className="film-caption text-[11px] font-medium tracking-[0.3em] text-gold-highlight">
            VELORIA — ESSENCE OF ELEGANCE
          </p>
        </div>
      </div>
    </section>
  );
}
