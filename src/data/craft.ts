import { CRAFT_MEDIA } from "@/constants/media";

/**
 * The three-image craft sequence, in display order. Text content
 * (paragraphs/list/alt text, in both languages) lives in
 * `src/i18n/translations.ts` under `craft.entries` — matched to
 * these images by array index.
 */
export const CRAFT_IMAGES: string[] = [
  CRAFT_MEDIA.dropper,
  CRAFT_MEDIA.bottle,
  CRAFT_MEDIA.box,
];
