/**
 * Official VELORIA contact details. Single source of truth — every
 * WhatsApp link, phone number, Instagram handle, and location string
 * anywhere in the site should import from here rather than being
 * retyped in a component. That's what makes "the number changed"
 * a one-line fix instead of a project-wide search.
 */
export const BRAND_CONTACT = {
  phone: {
    display: "+961 76 101 175",
    href: "tel:+96176101175",
  },
  whatsapp: {
    display: "+961 76 101 175",
    /** The only WhatsApp entry point anywhere in the site — every CTA links here. */
    url: "https://wa.me/96176101175",
  },
  instagram: {
    handle: "@Veloria_leb",
    url: "https://www.instagram.com/veloria_leb/",
  },
  location: {
    city: "HERMEL",
    addressEn: "Entrance of Souk Al-Daya'a, Lebanon",
    addressAr: "الهرمل – مدخل سوق الضيعة",
  },
  nameAr: "فيلوريا",
} as const;
