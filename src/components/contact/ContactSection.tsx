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
import { BRAND_CONTACT } from "@/constants/contact";

/**
 * `id="contact"` — the nav's CONTACT link has pointed at `#contact`
 * since the navigation was first built; this is the section that
 * finally resolves it. WhatsApp is the primary action per brand
 * guidance ("a customer-contact CTA, not an aggressive phone-number
 * display") — the button is the loud element, the number itself
 * sits small and secondary beside Instagram.
 */
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      whenMotionAllowed(() => {
        gsap.fromTo(
          ".contact-line",
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.base,
            stagger: STAGGER,
            ease: EASE.out,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: SCROLL_START,
              ...REVEAL_ONCE,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-t border-gold-core/10 bg-ivory-100"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center lg:py-32">
        <p className="contact-line text-xs font-medium tracking-[0.35em] text-gold-deep">
          GET IN TOUCH
        </p>
        <h2 className="contact-line mt-4 font-serif text-4xl leading-tight text-ink lg:text-6xl">
          Visit us, or simply say hello.
        </h2>

        <div className="contact-line mt-12 flex flex-col items-center gap-1.5">
          <p className="font-serif text-lg tracking-wide text-ink">
            {BRAND_CONTACT.location.city}
          </p>
          <p className="text-[13px] text-ink/70">
            {BRAND_CONTACT.location.addressEn}
          </p>
          <p dir="rtl" className="mt-1 font-arabic text-[15px] text-ink/70">
            {BRAND_CONTACT.location.addressAr}
          </p>
        </div>

        <span
          className="contact-line mx-auto mt-10 block h-px w-10 bg-gold-core/40"
          aria-hidden="true"
        />

        <a
          href={BRAND_CONTACT.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-line group relative mt-10 inline-flex items-center overflow-hidden border border-gold-core px-10 py-4 text-xs font-medium tracking-[0.3em] text-ink transition-colors duration-500 hover:text-ivory-50"
        >
          <span
            className="absolute inset-0 origin-left scale-x-0 bg-gold-core transition-transform duration-500 ease-out group-hover:scale-x-100"
            aria-hidden="true"
          />
          <span className="relative z-10">CHAT ON WHATSAPP</span>
        </a>

        <div className="contact-line mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-medium tracking-[0.25em] text-ink/70">
          <a
            href={BRAND_CONTACT.phone.href}
            className="transition-colors duration-300 hover:text-gold-deep"
          >
            {BRAND_CONTACT.phone.display}
          </a>
          <a
            href={BRAND_CONTACT.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-gold-deep"
          >
            {BRAND_CONTACT.instagram.handle.toUpperCase()}
          </a>
        </div>
      </div>
    </section>
  );
}
