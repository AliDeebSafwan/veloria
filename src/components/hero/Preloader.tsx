import Image from "next/image";

import { HERO_MEDIA, HERO_MEDIA_DIMENSIONS } from "@/constants/media";

interface PreloaderProps {
  containerRef: React.Ref<HTMLDivElement>;
  logoWrapRef: React.Ref<HTMLDivElement>;
  sweepRef: React.Ref<HTMLDivElement>;
}

const LOGO_ASPECT = `${HERO_MEDIA_DIMENSIONS.logo.width} / ${HERO_MEDIA_DIMENSIONS.logo.height}`;

/**
 * Full-viewport ivory stage shown before the hero. Presentational
 * only — HeroExperience owns the GSAP timeline that reveals the logo
 * and sweeps light across it via the refs passed in.
 */
export function Preloader({
  containerRef,
  logoWrapRef,
  sweepRef,
}: PreloaderProps) {
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ivory-50"
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={logoWrapRef}
        className="relative w-[68vw] max-w-[340px] motion-safe:scale-95 motion-safe:opacity-0 motion-safe:blur-[10px] sm:max-w-[420px]"
        style={{ aspectRatio: LOGO_ASPECT }}
      >
        <Image
          src={HERO_MEDIA.logo}
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 420px, 68vw"
          className="object-contain"
        />

        {/* Masked to the logo's own alpha shape, so the sheen only crosses gold pixels. */}
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.95) 50%, transparent 65%)",
            backgroundSize: "260% 100%",
            backgroundPosition: "-70% 0%",
            WebkitMaskImage: `url(${HERO_MEDIA.logo})`,
            maskImage: `url(${HERO_MEDIA.logo})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
}
