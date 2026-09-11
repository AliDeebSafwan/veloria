import { HeroExperience } from "@/components/hero/HeroExperience";
import { FragranceNotesSection } from "@/components/notes/FragranceNotesSection";
import { CraftsmanshipSection } from "@/components/craft/CraftsmanshipSection";
import { BrandStorySection } from "@/components/story/BrandStorySection";
import { CinematicFilmSection } from "@/components/film/CinematicFilmSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroExperience />
      <FragranceNotesSection />
      <CraftsmanshipSection />
      <BrandStorySection />
      <CinematicFilmSection />
      <FinalCtaSection />
      <ContactSection />
    </main>
  );
}
