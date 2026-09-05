# VELORIA — Creative Direction
Derived directly from the supplied logo, brand mockups, product photography, and promotional video. This is the source of truth for the visual build — nothing here introduces colors, type styles, or concepts absent from the assets.

---

## 1. Asset Analysis

**Logo.** An infinity symbol fused with a stylized "V" — two interlocking loops (one grounded/heavier on the left, one open/lighter on the right) resolving into a serif-terminal "V" at center. The mark reads as *eternity + initial*, i.e. timelessness. It sits above a serif wordmark "VELORIA" and a smaller tracked-out small-caps tagline "ESSENCE OF ELEGANCE." A thin gold rule with a small ◆ (diamond) appears between wordmark and tagline in the canonical vertical lockup (image 3) — a real structural motif, not decoration.

**Typography.** The wordmark is a classic, high-contrast serif with generous letter-spacing — closer to Didot/Trajan-family luxury serifs than a workhorse text serif. The tagline is set in wide-tracked small caps. One mockup (image 2) shows an alternate sans-serif tagline treatment — this reads as an off-brand mockup variant, not the canonical lockup, since every other asset (including the actual product box and promo creative) uses the serif small-caps version. Treat the serif small-caps tagline as canonical.

**Gold.** Sampled directly from the assets, gold is not one flat color but a foil gradient: a mid gold core around `#B8924D`, deepening to an antique/shadow gold around `#8C6D35`, and lifting to a bright champagne highlight around `#D4B98A`. This gradient behavior (not a flat swatch) is what makes it read as metallic foil rather than yellow.

**Ivory / beige.** Also a family, not one color: near-white warm ivory (`#F5F3EE`–`#F3F0EB`) for primary backgrounds, a slightly deeper cream (`#EDE7DD`–`#EBE2D7`) for photography backdrops, and a deeper stone-beige (`#DAD4C9`) for contrast surfaces (footer, section breaks). All warm, all low-saturation, never cool or grey.

**Photography style.** Soft, diffused studio lighting with a recurring dappled/window-blind light pattern sweeping across a warm-neutral backdrop. Apothecary and craft motifs — glass beakers, dropper bottles, raw amber liquid, dried gypsophila branches, a marble/stone riser. This is ingredient-and-craft storytelling, not glossy lifestyle/model imagery — nothing in the supplied assets shows people.

**Composition.** Centered, symmetrical, generous negative space — the product or mark typically occupies well under a third of the frame. The vertical mockup (image 3) adds a thin single-pixel border frame around the whole composition, which reads as a deliberate signature framing device.

**Brand personality.** Quiet luxury. Restrained, not maximalist — one metallic accent, one neutral family, serif authority, small-caps structure. Nothing shouts.

**Luxury level.** High — foil-stamped packaging cues, marble surfaces, apothecary glass, generous whitespace all signal premium/niche perfumery rather than mass-market retail.

**Arabic typography.** The promotional still (image 4) carries Arabic body copy — "قريبًا... ليس مجرد عطر... بل توقيع لحضورك" ("Coming soon... not just a perfume... a signature of your presence") and a transliterated wordmark "فيلوريا." This confirms the brand is built for a bilingual EN/AR luxury market, and — importantly — sets the *copy register*: poetic, personal, presence-focused, not sales-driven.

**Overall visual mood.** Hushed, warm, still. Light and material (foil, marble, glass) do the storytelling rather than color or motion.

**Video style.** A single continuous, slow rotation of the outer packaging on a glossy white surface, with the same dappled window-light sweeping across it and a soft floor reflection beneath. No cuts, no fast camera movement — the pacing itself is a brand signal.

---

## 2. Color Palette

| Token | Hex | Role |
|---|---|---|
| `ivory-50` | `#F5F3EE` | Primary background |
| `ivory-100` | `#EDE7DD` | Secondary surface / photography backdrop |
| `stone-200` | `#DAD4C9` | Contrast surface (footer, section breaks) |
| `gold-highlight` | `#D4B98A` | Foil shine / gradient top |
| `gold-core` | `#B8924D` | Primary gold accent (rules, icons, links) |
| `gold-shadow` | `#8C6D35` | Foil gradient base / hover depth |
| `ink` | `#1C1915` | Body text — warm near-black, never pure `#000` |

No other hues appear anywhere in the source material. Gold should almost always be implemented as a gradient (highlight → core → shadow) rather than a flat fill, to read as foil rather than "yellow."

## 3. Typography Direction

- **Display/wordmark pairing:** the logo itself is locked and untouched. Headline typography on the site should be a refined high-contrast serif that sits comfortably beside it — candidates: Cormorant Garamond, Playfair Display, or Marcellus — confirmed visually against the actual logo file once implemented.
- **Body/UI:** a quiet, humanist sans (e.g. an Inter-class neutral) for paragraph copy, nav labels, and UI chrome. It should never compete with the serif.
- **Tracked small caps:** the wide-tracked small-caps treatment from the tagline is a real brand device and can recur for section eyebrows, nav labels, and product specs — but deliberately, in a handful of key spots, not on every heading. It's already the brand's signature move; overusing it dilutes it.
- **Arabic pairing (future bilingual support):** an elegant Arabic serif such as Noto Naskh Arabic or Amiri, matched in weight and warmth to the Latin serif, for if/when EN/AR toggling is built.

## 4. Layout Direction

- Generous, uninterrupted whitespace — the logo compositions never fill the frame, and the site shouldn't either.
- Center-aligned, symmetrical for hero/key brand moments; asymmetric layouts reserved for supporting story/craft content so the site doesn't feel monotonous.
- Full-bleed ivory/stone fields rather than boxed cards — no SaaS-style card grid, no uniform border-radius-and-shadow treatment.
- Thin gold hairline rules with the ◆ motif as a recurring section divider — pulled directly from the vertical lockup, not invented.
- A thin single-pixel border frame around full-bleed hero moments, echoing image 3.

## 5. Photography Direction

- Warm neutral backdrops only — no colored gels, no contrasting product backgrounds.
- Recurring dappled window-light pattern as an atmospheric signature, not a one-off hero treatment.
- Apothecary/craft framing — glass vessels, amber liquid, dried botanicals, marble risers — for ingredient storytelling sections.
- Consistent soft floor reflection beneath product shots, matching the video.
- No lifestyle/model photography implied by the current assets; revisit if new reference images introduce people.

## 6. Animation Direction

- Pace is the brand: slow, continuous, unhurried — mirror the video's single unbroken rotation. Long durations (1.2–2.5s), gentle expo/cubic-out easing, nothing bouncy or snappy.
- The scroll-driven signature move: a GSAP ScrollTrigger–powered light sweep across hero/product sections, translating the video's dappled-light motion into a scroll-scrubbed effect.
- One orchestrated load-in sequence for the hero (mark settles → wordmark → tagline → gold rule draws in) rather than scattered fade-ups on every section — restraint over repetition.
- Gold hairline dividers can "draw" on scroll (stroke animation) as a small recurring detail tied to the mark's line-based construction.
- Role split: **GSAP + ScrollTrigger** for large pinned/scroll-driven cinematic sequences (hero, product reveal, scroll-through story); **Framer Motion** for smaller UI-level interactions (menu open/close, hover states, transitions) — matching the stack already in place.

## 7. Hero Concept

A full-viewport ivory stage, camera essentially static like the video, product centered. As the user scrolls, a slow rotation/parallax plays out — the promo video's physical motion translated into a scroll-scrubbed sequence (using the video itself as a textured layer, or recreated once bottle renders exist). Wordmark and tagline settle in with restrained, staggered timing mirroring the locked logo hierarchy exactly — mark, then wordmark, then tagline, then the gold rule. A single quiet CTA in tracked small caps — text and a thin underline, no button chrome.

## 8. Navigation Concept

Minimal fixed header: small logo mark, 3–4 nav words in tracked small-caps sans, transparent over the hero and shifting to a translucent ivory blur on scroll. On mobile, a full-screen ivory takeover with large serif nav words, staggered reveal, gold hairline separators between items. Text-first — no icon clutter.

## 9. Product Presentation Concept

Each fragrance presented like the reference stills: centered, generous negative space, the dappled light sweep scroll-scrubbed rather than looping automatically. Craft/ingredient sections (glass, botanicals, amber liquid) interspersed between product shots, framed by the gold-rule-and-◆ divider. Specs set exactly like the packaging typography — small tracked caps beneath the name, echoing "EAU DE PARFUM / 100 ml."

## 10. Mobile Design Direction

The vertical reference (image 3) is essentially a ready-made mobile hero template — full-bleed ivory, thin border frame, centered lockup. Preserve whitespace ratios rather than compressing them; scale type down but keep tracking generous. Simplify scroll-driven animation distances for performance while keeping the light-sweep and gold-shimmer moments, since those define the brand. Large touch targets for any product carousel, no tiny inline chrome.

## 11. Overall UX Direction

Every screen reads as one considered frame — a photograph — rather than a stack of content blocks; pacing over density. Copy voice follows the Arabic reference's register even in English: intimate, presence-focused ("a signature of your presence," "essence," "elegance") rather than typical e-commerce sell copy. Keep layout and type choices RTL-friendly in case bilingual EN/AR support is built later. Lenis's scroll feel should lean slower/heavier than a typical site — scrolling should feel like leafing through a printed lookbook, not browsing a storefront.

---

**Status:** awaiting approval. No visual implementation has started.
