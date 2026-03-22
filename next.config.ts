import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Explicitly pin the Turbopack workspace root to THIS project directory.
  // Without this, Next.js detects ~/package-lock.json and uses ~ as the root,
  // which breaks process.cwd() and causes server-side file reads to fail.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
