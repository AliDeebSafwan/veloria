export const HERO_MEDIA = {
  videoMp4: "/videos/hero.mp4",
  videoWebm: "/videos/hero.webm",
  poster: "/images/hero/hero-poster.jpg",
  logo: "/images/logo/veloria-lockup.webp",
  logoMark: "/images/logo/veloria-mark.webp",
} as const;

/**
 * The Film section's own dedicated footage — a separate, wider
 * (1280×720) piece shot for this purpose, distinct from the hero's
 * portrait packaging clip.
 */
export const FILM_MEDIA = {
  videoMp4: "/videos/film.mp4",
  videoWebm: "/videos/film.webm",
  poster: "/images/film/film-poster.jpg",
} as const;

export const STORY_MEDIA = {
  image: "/images/brand/story-frame.jpg",
} as const;

/**
 * The three-image craft sequence (dropper, filled bottle, boxed
 * product) behind the Craftsmanship section.
 */
export const CRAFT_MEDIA = {
  dropper: "/images/craft/craft-dropper.webp",
  bottle: "/images/craft/craft-bottle.webp",
  box: "/images/craft/craft-box.webp",
} as const;

/** Native pixel dimensions of the source assets, used to keep aspect ratios exact. */
export const HERO_MEDIA_DIMENSIONS = {
  video: { width: 478, height: 850 },
  logo: { width: 920, height: 621 },
  logoMark: { width: 530, height: 275 },
} as const;

export const FILM_MEDIA_DIMENSIONS = {
  video: { width: 1280, height: 720 },
} as const;

export const CRAFT_MEDIA_DIMENSIONS = {
  image: { width: 1086, height: 1448 },
} as const;
