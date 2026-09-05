# VELORIA — Essence of Elegance

Frontend-only luxury perfume brand website. Next.js 16, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build` (production build), `npm run start` (serve the production build), `npm run lint`, `npm run type-check`.

Requires Node.js 20.9+.

## Structure

```
src/
  app/            Next.js App Router — layout, page, global styles
  components/     One folder per feature area (hero, fragrances, notes,
                  story, film, cta, contact, layout, cursor, media)
  constants/      Site copy, nav links, contact details, media paths
  data/           Fragrance catalog and the composition-notes content —
                  edit these to add/change products, not the components
  hooks/          useReducedMotion, useIsDesktopPointer, useLenis
  lib/            GSAP setup + shared animation constants (EASE/DURATION/
                  STAGGER/SCROLL_START), cn() utility
  providers/      Lenis smooth-scroll provider
public/
  images/, videos/  All site media, including the hand-built gold
                    line-art fragrance illustrations (placeholders —
                    see src/data/fragrances.ts)
docs/
  creative-direction.md   The design brief this build follows, derived
                          from the original brand assets
```

## Adding a fragrance

Add an entry to `src/data/fragrances.ts` — no component changes needed. Set `featured: true` to show it on the homepage, `available: false` to show a "coming soon" tag instead of hiding it.

## Contact details

Single source of truth: `src/constants/contact.ts` (phone, WhatsApp, Instagram, location).
