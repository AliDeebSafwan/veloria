"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { HERO_MEDIA } from "@/constants/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroVideoProps {
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}

/**
 * The VELORIA packaging film, looping silently behind the hero copy.
 * Falls back to a static poster frame if the browser blocks autoplay
 * or the person has requested reduced motion.
 */
export function HeroVideo({ ref, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    // Autoplay can still be blocked by the browser (e.g. low-power
    // mode); the poster frame stays visible if play() rejects.
    void video.play().catch(() => undefined);
  }, [reducedMotion]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_MEDIA.poster}
        aria-hidden="true"
      >
        <source src={HERO_MEDIA.videoWebm} type="video/webm" />
        <source src={HERO_MEDIA.videoMp4} type="video/mp4" />
      </video>
    </div>
  );
}
