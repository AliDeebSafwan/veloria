"use client";

import { useRef } from "react";

import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  isDesktopViewport,
  EASE,
  DURATION,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import { AutoplayVideo } from "@/components/media/AutoplayVideo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { FILM_MEDIA, FILM_MEDIA_DIMENSIONS } from "@/constants/media";

const FILM_ASPECT = `${FILM_MEDIA_DIMENSIONS.video.width} / ${FILM_MEDIA_DIMENSIONS.video.height}`;

/**
 * The one deliberate departure from the site's ivory palette — a dark
 * stage for its own dedicated widescreen film, framed and paced
 * completely differently from the hero's portrait packaging clip:
 * masked open on scroll, then a slow continuous scale drift for as
 * long as the section is in view.
 */
export function CinematicFilmSection() {
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

        // Masked reveal — the frame opens from a small centered
        // rectangle out to its full size.
        gsap.fromTo(
          ".film-frame",
          { clipPath: "inset(30% 20% 30% 20%)" },
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
        // desktop only. Scaling a playing <video> via transform on
        // every scroll tick is meaningful extra GPU work stacked on
        // top of decoding itself; not worth it on mobile for an
        // effect this subtle.
        if (isDesktopViewport()) {
          gsap.to(".film-video", {
            scale: 1.08,
            ease: EASE.linear,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
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
          {t.film.label}
        </p>
        <h2 className="film-heading mx-auto mt-4 font-serif text-3xl leading-tight text-ivory-50 lg:text-5xl">
          {t.film.heading}
        </h2>
      </div>

      <div
        className="film-frame relative mx-auto mt-14 w-[92vw] max-w-5xl overflow-hidden border border-gold-core/25 lg:mt-20"
        style={{ aspectRatio: FILM_ASPECT }}
      >
        <AutoplayVideo
          className="film-video h-full w-full object-cover"
          poster={FILM_MEDIA.poster}
          preload="none"
          sources={[
            { src: FILM_MEDIA.videoWebm, type: "video/webm" },
            { src: FILM_MEDIA.videoMp4, type: "video/mp4" },
          ]}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-5 lg:p-7">
          <p className="film-caption text-[11px] font-medium tracking-[0.3em] text-gold-highlight">
            {t.film.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
