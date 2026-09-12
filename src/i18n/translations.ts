export type Language = "en" | "ar";

export interface CraftEntryTranslation {
  type: "paragraph" | "list";
  imageAlt: string;
  text?: string;
  heading?: string;
  items?: string[];
}

export interface Translation {
  nav: {
    home: string;
    collection: string;
    about: string;
    contact: string;
    close: string;
  };
  hero: {
    tagline: string;
    cta: string;
  };
  craft: {
    label: string;
    heading: string;
    entries: CraftEntryTranslation[];
  };
  story: {
    label: string;
    line1: string;
    line2: string;
  };
  film: {
    label: string;
    heading: string;
    caption: string;
  };
  cta: {
    wordmark: string;
    tagline: string;
    statement: string;
    button: string;
  };
  contact: {
    label: string;
    heading: string;
    city: string;
    address: string;
    whatsappButton: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: "HOME",
      collection: "COLLECTION",
      about: "ABOUT",
      contact: "CONTACT",
      close: "CLOSE",
    },
    hero: {
      tagline: "ESSENCE OF ELEGANCE",
      cta: "DISCOVER THE COLLECTION",
    },
    craft: {
      label: "OUR CRAFT",
      heading: "The Art of Composition",
      entries: [
        {
          type: "paragraph",
          imageAlt: "VELORIA fragrance dropper amid dried white flowers",
          text:
            "Composing a fragrance… a craft we make with feeling. At VELORIA, we believe a fragrance is never just a scent — it is a presence, a memory, a detail that speaks for you. We choose our compositions with care, balancing ingredients and accords to reach a blend that is both harmonious and lasting, giving you a fragrance experience with a quality that matches your taste. From the first notes, to the heart of the fragrance, to the base that stays with you…",
        },
        {
          type: "paragraph",
          imageAlt: "VELORIA fragrance bottle on a stone pedestal",
          text: "We attend to every detail to bring you a fragrance that carries the spirit of fine perfumery, with VELORIA's own sense of feeling.",
        },
        {
          type: "list",
          imageAlt: "VELORIA fragrance box",
          heading: "Why VELORIA?",
          items: [
            "Fragrance compositions chosen with care",
            "A balance of accords for a complete experience",
            "A variety of options to suit every taste",
            "Fragrances for everyday wear and for occasions",
            "The freedom to choose a scent that reflects who you are",
          ],
        },
      ],
    },
    story: {
      label: "THE ESSENCE OF VELORIA",
      line1: "More than a fragrance.",
      line2: "A presence.",
    },
    film: {
      label: "THE FILM",
      heading: "Every detail, considered.",
      caption: "VELORIA — ESSENCE OF ELEGANCE",
    },
    cta: {
      wordmark: "VELORIA",
      tagline: "ESSENCE OF ELEGANCE",
      statement: "Leave an impression.",
      button: "DISCOVER VELORIA",
    },
    contact: {
      label: "GET IN TOUCH",
      heading: "Visit us, or simply say hello.",
      city: "HERMEL",
      address: "Entrance of Souk Al-Daya'a, Lebanon",
      whatsappButton: "CHAT ON WHATSAPP",
    },
    footer: {
      tagline: "ESSENCE OF ELEGANCE",
      copyright: "ALL RIGHTS RESERVED.",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      collection: "المجموعة",
      about: "من نحن",
      contact: "تواصل معنا",
      close: "إغلاق",
    },
    hero: {
      tagline: "جوهر الأناقة",
      cta: "اكتشف المجموعة",
    },
    craft: {
      label: "حرفتنا",
      heading: "فنّ التركيب",
      entries: [
        {
          type: "paragraph",
          imageAlt: "قطارة عطر VELORIA وسط أزهار بيضاء مجففة",
          text: "تركيب العطور… فنٌّ نصنعه بإحساس. في VELORIA، نؤمن أن العطر ليس مجرد رائحة، بل هو حضور وذكرى وتفصيل يعبّر عن شخصيتك. نختار تركيباتنا بعناية، ونوازن بين المكوّنات والنفحات العطرية للوصول إلى تركيبة متناسقة وثابتة، تمنحك تجربة عطرية مميزة بجودة تليق بذوقك. من النفحات الأولى، إلى قلب العطر، وصولًا إلى القاعدة التي تبقى معك…",
        },
        {
          type: "paragraph",
          imageAlt: "زجاجة عطر VELORIA على قاعدة حجرية",
          text: "نعتني بكل تفصيل لنقدّم لك عطرًا يحمل روح العطور الفاخرة بإحساس VELORIA الخاص",
        },
        {
          type: "list",
          imageAlt: "علبة عطر VELORIA",
          heading: "لماذا VELORIA؟",
          items: [
            "تركيبات عطرية مختارة بعناية",
            "توازن بين النفحات للحصول على تجربة متكاملة",
            "خيارات متنوعة تناسب مختلف الأذواق",
            "عطور للاستخدام اليومي والمناسبات",
            "إمكانية اختيار العطر الذي يعكس شخصيتك",
          ],
        },
      ],
    },
    story: {
      label: "جوهر VELORIA",
      line1: "أكثر من مجرد عطر.",
      line2: "إنه حضور.",
    },
    film: {
      label: "الفيلم",
      heading: "كل تفصيل، بعناية.",
      caption: "VELORIA — جوهر الأناقة",
    },
    cta: {
      wordmark: "VELORIA",
      tagline: "جوهر الأناقة",
      statement: "اترك انطباعًا لا يُنسى.",
      button: "اكتشف VELORIA",
    },
    contact: {
      label: "تواصل معنا",
      heading: "زورونا، أو راسلونا ببساطة.",
      city: "الهرمل",
      address: "مدخل سوق الضيعة، لبنان",
      whatsappButton: "راسلنا عبر واتساب",
    },
    footer: {
      tagline: "جوهر الأناقة",
      copyright: "جميع الحقوق محفوظة.",
    },
  },
};
