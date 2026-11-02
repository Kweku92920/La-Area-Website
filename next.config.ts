import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    qualities: [75, 85],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
