import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@': path.join(__dirname),
      '@/lib': path.join(__dirname, 'lib'),
      '@/models': path.join(__dirname, 'models'),
      '@/components': path.join(__dirname, 'components'),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      
    ],
  },
};

export default nextConfig;
