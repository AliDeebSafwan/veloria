import { HeroExperience } from "@/components/hero/HeroExperience";
import { FeaturedFragrances } from "@/components/fragrances/FeaturedFragrances";
import { FragranceNotesSection } from "@/components/notes/FragranceNotesSection";
import { BrandStorySection } from "@/components/story/BrandStorySection";
import { CinematicFilmSection } from "@/components/film/CinematicFilmSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroExperience />
      <FeaturedFragrances />
      <FragranceNotesSection />
      <BrandStorySection />
      <CinematicFilmSection />
      <FinalCtaSection />
      <ContactSection />
    </main>
  );
}
