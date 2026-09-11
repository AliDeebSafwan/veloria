/** `key` looks up the label text in the translation dictionary (t.nav[key]) so the same link list works in either language. */
export interface NavLink {
  key: "home" | "collection" | "about" | "contact";
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { key: "home", href: "#" },
  { key: "collection", href: "#collection" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" },
];
