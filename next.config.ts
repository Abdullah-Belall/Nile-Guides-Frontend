import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   ppr: 'incremental',
  // },
  // experimental: {
  //   topLevelAwait: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
