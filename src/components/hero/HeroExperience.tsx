"use client";

import { useEffect, useRef, useState } from "react";

import { gsap, ScrollTrigger, useGSAP, EASE } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Preloader } from "@/components/hero/Preloader";
import { Hero, type HeroRefs } from "@/components/hero/Hero";

/**
 * Owns the single choreography that ties the preloader and the hero
 * together: logo reveal → gold sweep → hand-off into the fullscreen
 * hero. Split into `Preloader` and `Hero` for markup/reuse, but the
 * timeline lives here so both can be driven in perfect sync.
 */
export function HeroExperience() {
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  // Preloader refs
  const preloaderContainerRef = useRef<HTMLDivElement>(null);
  const preloaderLogoWrapRef = useRef<HTMLDivElement>(null);
  const preloaderSweepRef = useRef<HTMLDivElement>(null);

  // Hero refs
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const heroRefs: HeroRefs = {
    sectionRef,
    videoWrapRef,
    contentRef,
    headlineRef,
    taglineRef,
    ctaRef,
    scrollIndicatorRef,
  };

  // Keep the page still while the preloader owns the screen.
  useEffect(() => {
    if (preloaderVisible) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
  }, [preloaderVisible, lenis]);

  useGSAP(
    () => {
      if (reducedMotion) {
        // CSS (`motion-safe:` variants) already keeps every element in
        // its finished state when reduced motion is on, so there's
        // nothing to animate — just drop the preloader immediately.
        setPreloaderVisible(false);
        return;
      }

      const tl = gsap.timeline({ delay: 0.1 });

      // 1 — the mark settles in, slow and deliberate
      tl.fromTo(
        preloaderLogoWrapRef.current,
        { autoAlpha: 0, scale: 0.94, filter: "blur(10px)" },
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out",
        },
      )
        // 2 — a single pass of light crosses the gold
        .fromTo(
          preloaderSweepRef.current,
          { backgroundPosition: "-70% 0%" },
          {
            backgroundPosition: "170% 0%",
            duration: 0.9,
            ease: "power1.inOut",
          },
          "-=0.3",
        )
        // 3 — a quiet beat before the hand-off
        .to({}, { duration: 0.25 })
        // 4 — preloader recedes; hero begins revealing underneath
        .to(
          preloaderContainerRef.current,
          {
            autoAlpha: 0,
            scale: 1.03,
            duration: 0.9,
            ease: "power2.inOut",
            onStart: () => {
              if (preloaderContainerRef.current) {
                preloaderContainerRef.current.style.pointerEvents = "none";
              }
            },
          },
          "exit",
        )
        .fromTo(
          videoWrapRef.current,
          { autoAlpha: 0, scale: 1.06 },
          { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power3.out" },
          "exit+=0.05",
        )
        // 5 — wordmark mask-reveals up, matching the logo's own hierarchy
        .fromTo(
          headlineRef.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "power4.out" },
          "exit+=0.35",
        )
        .fromTo(
          taglineRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: "power2.out" },
          "exit+=0.65",
        )
        .fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: "power2.out" },
          "exit+=0.85",
        )
        .fromTo(
          scrollIndicatorRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.85, ease: "power2.out" },
          "exit+=1.05",
        )
        .call(() => setPreloaderVisible(false));

      // Cinematic hand-off on scroll: the film settles back and the
      // copy quietly recedes across the hero's own scroll runway,
      // rather than just vanishing when the next section arrives.
      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          animation: gsap
            .timeline()
            .to(
              videoWrapRef.current,
              { scale: 1.12, opacity: 0.35, ease: EASE.linear },
              0,
            )
            .to(
              contentRef.current,
              { autoAlpha: 0, yPercent: -18, ease: EASE.linear },
              0,
            ),
        });
      }
    },
    { dependencies: [reducedMotion], scope: sectionRef },
  );

  return (
    <>
      {preloaderVisible && (
        <Preloader
          containerRef={preloaderContainerRef}
          logoWrapRef={preloaderLogoWrapRef}
          sweepRef={preloaderSweepRef}
        />
      )}
      <Hero refs={heroRefs} />
    </>
  );
}
