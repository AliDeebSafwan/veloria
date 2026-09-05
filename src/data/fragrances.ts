export type FragranceGender = "unisex" | "feminine" | "masculine";

export interface Fragrance {
  id: string;
  name: string;
  slug: string;
  image: string;
  /** Additional angles/contexts once real photography exists — currently just the one image, correctly typed as an array so a future shoot with 4–5 shots per fragrance is a data change, not a component change. */
  gallery: string[];
  description: string;
  price: number;
  currency: string;
  size: string;
  gender: FragranceGender;
  category: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  /** Shown on the homepage Featured Fragrances section when true. */
  featured: boolean;
  /** false renders a "coming soon" tag instead of hiding the entry — matches the brand's own "قريبًا / coming soon" pre-launch messaging. */
  available: boolean;
  imageAlt: string;
}

/**
 * Mock data for the fragrance catalog. Adding a fifth fragrance later
 * means adding an object here — FeaturedFragrances and FragranceEntry
 * read this array and its `featured` flag; neither needs editing.
 *
 * `image`/`gallery` currently point to hand-built gold line-art
 * placeholder illustrations (`/public/images/fragrances/*.svg`) —
 * there's no real product photography for these four fragrances yet,
 * only for the single VELORIA box shown in the hero. Swapping in real
 * photography later means replacing these paths (ideally keeping the
 * 4:5 portrait aspect the layout is built around) — no component
 * changes needed. Price/size/gender/category are placeholder values
 * pending real pricing and positioning.
 */
export const FRAGRANCES: Fragrance[] = [
  {
    id: "eclat",
    name: "Éclat",
    slug: "eclat",
    description:
      "A luminous first impression — citrus and white petals catching morning light.",
    price: 145,
    currency: "USD",
    size: "100ML",
    gender: "unisex",
    category: "Citrus Floral",
    topNotes: ["Bergamot", "Pink Pepper", "Mandarin"],
    heartNotes: ["Jasmine", "Orange Blossom", "Iris"],
    baseNotes: ["White Musk", "Cedarwood", "Amber"],
    featured: true,
    available: true,
    image: "/images/fragrances/eclat.svg",
    gallery: ["/images/fragrances/eclat.svg"],
    imageAlt: "Éclat — a luminous VELORIA fragrance",
  },
  {
    id: "noir",
    name: "Noir",
    slug: "noir",
    description:
      "A quiet intensity — dark woods and smoked amber for the hours after dusk.",
    price: 195,
    currency: "USD",
    size: "100ML",
    gender: "unisex",
    category: "Woody Oriental",
    topNotes: ["Black Pepper", "Bergamot", "Cardamom"],
    heartNotes: ["Oud", "Leather", "Violet"],
    baseNotes: ["Vetiver", "Amber", "Tonka Bean"],
    featured: true,
    available: false,
    image: "/images/fragrances/noir.svg",
    gallery: ["/images/fragrances/noir.svg"],
    imageAlt: "Noir — a deep VELORIA fragrance",
  },
  {
    id: "ivoire",
    name: "Ivoire",
    slug: "ivoire",
    description: "Powdery and soft — a second skin of musk and white florals.",
    price: 155,
    currency: "USD",
    size: "100ML",
    gender: "unisex",
    category: "Powdery Floral",
    topNotes: ["Pear", "Neroli", "Pink Peppercorn"],
    heartNotes: ["Peony", "Iris", "Heliotrope"],
    baseNotes: ["White Musk", "Sandalwood", "Vanilla"],
    featured: true,
    available: true,
    image: "/images/fragrances/ivoire.svg",
    gallery: ["/images/fragrances/ivoire.svg"],
    imageAlt: "Ivoire — a soft VELORIA fragrance",
  },
  {
    id: "ambre",
    name: "Ambre",
    slug: "ambre",
    description: "Warm and resinous — amber and spice wrapped in golden light.",
    price: 175,
    currency: "USD",
    size: "100ML",
    gender: "unisex",
    category: "Oriental Amber",
    topNotes: ["Saffron", "Cinnamon", "Mandarin"],
    heartNotes: ["Rose", "Amber", "Incense"],
    baseNotes: ["Vanilla", "Benzoin", "Sandalwood"],
    featured: true,
    available: true,
    image: "/images/fragrances/ambre.svg",
    gallery: ["/images/fragrances/ambre.svg"],
    imageAlt: "Ambre — a warm VELORIA fragrance",
  },
];
