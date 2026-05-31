import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // App router is stable in Next 15, but we can keep PPR off
  },
};

export default nextConfig;
