export const HERO_MEDIA = {
  videoMp4: "/videos/hero.mp4",
  videoWebm: "/videos/hero.webm",
  poster: "/images/hero/hero-poster.jpg",
  logo: "/images/logo/veloria-lockup.webp",
  logoMark: "/images/logo/veloria-mark.webp",
} as const;

/**
 * The film section reuses the same source video as the hero, but
 * presented full-scale and cinematically rather than in a small
 * framed panel — so it's kept as its own named export even though the
 * underlying files are identical, to make that reuse explicit.
 */
export const FILM_MEDIA = {
  videoMp4: HERO_MEDIA.videoMp4,
  videoWebm: HERO_MEDIA.videoWebm,
  poster: HERO_MEDIA.poster,
} as const;

export const STORY_MEDIA = {
  image: "/images/brand/story-frame.jpg",
} as const;

/** Native pixel dimensions of the source assets, used to keep aspect ratios exact. */
export const HERO_MEDIA_DIMENSIONS = {
  video: { width: 478, height: 850 },
  logo: { width: 920, height: 621 },
  logoMark: { width: 530, height: 275 },
} as const;
