"use client";

import { useRef } from "react";

import {
  gsap,
  useGSAP,
  whenMotionAllowed,
  EASE,
  DURATION,
  STAGGER,
  SCROLL_START,
  REVEAL_ONCE,
} from "@/lib/gsap";
import { NAV_LINKS } from "@/constants/nav";
import { BRAND_CONTACT } from "@/constants/contact";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * Deliberately reads as a closing page, not a utility footer: one
 * centered column, pure typography, generous whitespace. The thin
 * rule-and-diamond echoes the divider between wordmark and tagline in
 * the original brand lockup reference.
 */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        gsap.fromTo(
          ".footer-line",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.base,
            stagger: STAGGER,
            ease: EASE.out,
            scrollTrigger: {
              trigger: footerRef.current,
              start: SCROLL_START,
              ...REVEAL_ONCE,
            },
          },
        );
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="border-t border-gold-core/15 bg-ivory-100">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <p className="footer-line font-serif text-2xl tracking-wide text-ink lg:text-3xl">
          VELORIA
        </p>

        <span
          className="footer-line mt-5 flex items-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-8 bg-gold-core/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold-core/60" />
          <span className="h-px w-8 bg-gold-core/40" />
        </span>

        <p className="footer-line mt-5 text-xs font-medium tracking-[0.35em] text-gold-deep">
          {t.footer.tagline}
        </p>

        <nav
          className="footer-line mt-16 flex flex-wrap items-center justify-center"
          aria-label="Footer"
        >
          {NAV_LINKS.map((link, index) => (
            <span key={link.href} className="flex items-center">
              <a
                href={link.href}
                className="px-4 text-[11px] font-medium tracking-[0.3em] text-ink/70 transition-colors duration-300 hover:text-gold-deep"
              >
                {t.nav[link.key]}
              </a>
              {index < NAV_LINKS.length - 1 && (
                <span className="h-3 w-px bg-gold-core/25" aria-hidden="true" />
              )}
            </span>
          ))}
        </nav>

        <div className="footer-line mt-10 flex items-center gap-6">
          <a
            href={BRAND_CONTACT.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium tracking-[0.3em] text-ink/70 transition-colors duration-300 hover:text-gold-deep"
          >
            INSTAGRAM
          </a>
          <span className="h-3 w-px bg-gold-core/25" aria-hidden="true" />
          <a
            href={BRAND_CONTACT.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium tracking-[0.3em] text-ink/70 transition-colors duration-300 hover:text-gold-deep"
          >
            WHATSAPP
          </a>
        </div>

        <span
          className="footer-line mt-16 h-px w-16 bg-gold-core/20"
          aria-hidden="true"
        />

        <p className="footer-line mt-8 text-[11px] tracking-[0.2em] text-ink/70">
          © {year} VELORIA. {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
