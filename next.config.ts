import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote patterns / domains will be added once VELORIA's
    // media hosting (CDN, CMS, etc.) is decided.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
