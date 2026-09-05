"use client";

import { useEffect, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import { NAV_LINKS } from "@/constants/nav";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = "a[href], button:not([disabled])";

/**
 * Below `lg`, the header's inline links are replaced by this — a
 * full-screen ivory panel with large serif words and thin gold
 * hairlines between them, rather than a cramped dropdown.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const lenis = useLenis();

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;

      if (open) {
        document.body.style.overflow = "hidden";
        lenis?.stop();

        gsap.set(panel, { display: "flex" });
        gsap.fromTo(
          panel,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
        );
        gsap.fromTo(
          itemRefs.current,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.12,
            ease: "power2.out",
          },
        );
      } else {
        document.body.style.overflow = "";
        lenis?.start();

        gsap.to(panel, {
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    },
    { dependencies: [open] },
  );

  // Keyboard trap: while open, Tab/Shift+Tab cycle only within the
  // panel, Escape closes it, and focus returns to whatever triggered
  // it on close. Without this, keyboard users could tab straight
  // through to the hero/content sitting behind the overlay.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const focusTimeout = window.setTimeout(() => {
      getFocusable()[0]?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[45] hidden flex-col items-center justify-center gap-10 bg-ivory-50 lg:hidden"
      style={{ visibility: "hidden", opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Site menu"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 text-[11px] font-medium tracking-[0.3em] text-ink"
      >
        CLOSE
      </button>

      <ul className="flex flex-col items-center gap-7">
        {NAV_LINKS.map((link, index) => (
          <li
            key={link.href}
            ref={(el: HTMLLIElement | null) => {
              if (el) itemRefs.current[index] = el;
            }}
            className="flex flex-col items-center gap-7"
          >
            <a
              href={link.href}
              onClick={onClose}
              className="font-serif text-3xl tracking-wide text-ink transition-colors hover:text-gold-deep"
            >
              {link.label}
            </a>
            {index < NAV_LINKS.length - 1 && (
              <span className="h-px w-10 bg-gold-core/30" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
