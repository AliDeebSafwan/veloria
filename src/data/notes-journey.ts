export interface NoteStageData {
  id: "top" | "heart" | "base";
  numeral: string;
  label: string;
  title: string;
  duration: string;
  description: string;
  notes: string[];
}

/**
 * Illustrates how a VELORIA fragrance unfolds over time — distinct
 * from the per-product notes in FeaturedFragrances, which describe
 * one specific bottle each. This is the house's general composition
 * philosophy, so the notes here are representative rather than tied
 * to any single fragrance.
 */
export const NOTES_JOURNEY: NoteStageData[] = [
  {
    id: "top",
    numeral: "I",
    label: "TOP NOTES",
    title: "Top Notes",
    duration: "0 – 15 MINUTES",
    description:
      "The first impression — bright, brief, gone almost as soon as it arrives.",
    notes: ["Bergamot", "Pink Pepper", "Mandarin", "Citrus Zest"],
  },
  {
    id: "heart",
    numeral: "II",
    label: "HEART NOTES",
    title: "Heart Notes",
    duration: "15 MINUTES – 4 HOURS",
    description:
      "The soul of the fragrance, emerging as the top fades — where its true character lives.",
    notes: ["Jasmine", "Iris", "Rose", "Orange Blossom"],
  },
  {
    id: "base",
    numeral: "III",
    label: "BASE NOTES",
    title: "Base Notes",
    duration: "4+ HOURS",
    description:
      "The foundation that lingers long after — deep, warm, and unmistakably yours.",
    notes: ["Amber", "Sandalwood", "White Musk", "Vanilla"],
  },
];
