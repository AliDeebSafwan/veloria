/**
 * Official VELORIA contact details. Single source of truth — every
 * WhatsApp link, phone number, and Instagram handle anywhere in the
 * site should import from here rather than being retyped in a
 * component. That's what makes "the number changed" a one-line fix
 * instead of a project-wide search.
 *
 * Location (city/address) is NOT here — it's copy that changes per
 * language, so it lives in `src/i18n/translations.ts` (`t.contact.city`
 * / `t.contact.address`) alongside everything else that's translated.
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
} as const;
