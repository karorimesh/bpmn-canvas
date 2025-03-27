import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];  // Add canvas to externals
    return config;
  },
};

export default nextConfig;
