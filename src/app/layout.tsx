import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Naskh_Arabic } from "next/font/google";

import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { SITE_CONFIG } from "@/constants/site";

import "./globals.css";

/**
 * Typography, per /docs/creative-direction.md.
 *
 * Playfair Display stands in for the logo's high-contrast serif on
 * headlines; Inter carries body copy and UI chrome. Both are exposed
 * as CSS variables and mapped through Tailwind's @theme in
 * globals.css, so a future swap to licensed brand faces stays a
 * one-file change.
 *
 * Noto Naskh Arabic covers the small amount of Arabic copy (brand
 * name, location) in the Contact section — the creative direction
 * flagged the brand's bilingual EN/AR positioning early on; this is
 * the first place that's actually needed. Exposed as `--font-arabic`
 * / `font-arabic`, used only where Arabic text actually appears.
 */
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans-body",
  display: "swap",
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  display: "swap",
});

const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${arabicFont.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <a href="#main-content" className="skip-link">
            SKIP TO CONTENT
          </a>
          <Navigation />
          {children}
          <Footer />
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
