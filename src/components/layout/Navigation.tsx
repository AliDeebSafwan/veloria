"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { NAV_LINKS } from "@/constants/nav";
import { HERO_MEDIA, HERO_MEDIA_DIMENSIONS } from "@/constants/media";
import { MobileMenu } from "@/components/layout/MobileMenu";

const MARK_ASPECT = `${HERO_MEDIA_DIMENSIONS.logoMark.width} / ${HERO_MEDIA_DIMENSIONS.logoMark.height}`;

/**
 * Fixed header, transparent over the hero by default. Past an 80px
 * scroll threshold it gains a soft ivory ground, hairline border, and
 * backdrop blur — tracked via a single ScrollTrigger rather than a
 * scroll listener, and applied purely through Tailwind transitions so
 * the change reads as one smooth cross-fade, not a hard cut.
 */
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 80,
      end: 99999,
      onToggle: (self: { isActive: boolean }) => setScrolled(self.isActive),
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ease-out",
          scrolled
            ? "border-gold-core/15 bg-ivory-50/80 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-10">
          <a href="#" className="flex items-center gap-2.5">
            <div
              className="relative h-5 w-auto lg:h-6"
              style={{ aspectRatio: MARK_ASPECT }}
            >
              <Image
                src={HERO_MEDIA.logoMark}
                alt="VELORIA"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <span className="font-serif text-base tracking-[0.15em] text-ink lg:text-lg">
              VELORIA
            </span>
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[11px] font-medium tracking-[0.25em] text-ink/80 transition-colors duration-300 hover:text-gold-deep"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex flex-col items-end gap-1.5 lg:hidden"
          >
            <span className="h-px w-6 bg-ink" />
            <span className="h-px w-4 bg-ink" />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
