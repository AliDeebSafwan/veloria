import { HeroExperience } from "@/components/hero/HeroExperience";
import { CraftsmanshipSection } from "@/components/craft/CraftsmanshipSection";
import { BrandStorySection } from "@/components/story/BrandStorySection";
import { CinematicFilmSection } from "@/components/film/CinematicFilmSection";
import { FinalCtaSection } from "@/components/cta/FinalCtaSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroExperience />
      <CraftsmanshipSection />
      <BrandStorySection />
      <CinematicFilmSection />
      <FinalCtaSection />
      <ContactSection />
    </main>
  );
}
