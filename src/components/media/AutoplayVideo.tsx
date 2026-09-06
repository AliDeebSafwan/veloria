"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface VideoSource {
  src: string;
  type: string;
}

interface AutoplayVideoProps {
  className?: string;
  poster: string;
  sources: VideoSource[];
  /**
   * "auto" eagerly downloads the full file — right for the hero,
   * which is visible immediately. Anything further down the page
   * should pass "metadata" so it doesn't compete with above-the-fold
   * assets for bandwidth on first load; the poster covers it until
   * the section is actually scrolled near.
   */
  preload?: "auto" | "metadata" | "none";
}

/**
 * Muted/looping/autoplaying `<video>` with reduced-motion and
 * autoplay-block handling built in. Renders just the video element
 * (no wrapper div), so the class name can be a GSAP selector target
 * directly, and callers build their own frame/mask markup around it.
 */
export function AutoplayVideo({
  className,
  poster,
  sources,
  preload = "auto",
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    // Only decode/play while actually on screen — this section sits
    // well down the page, so the video would otherwise keep looping
    // for anyone scrolled past it for the rest of the session.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={preload}
      poster={poster}
      aria-hidden="true"
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
