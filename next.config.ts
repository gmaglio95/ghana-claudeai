import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "strapi-imaginary.weroad.it",
      },
      {
        protocol: "https",
        hostname: "cdn.weroad.io",
      },
    ],
  },
};

export default nextConfig;