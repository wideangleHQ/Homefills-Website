import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The dev badge sits on top of the mobile bottom navigation; errors still surface in the overlay.
  devIndicators: false,
  // Lets a phone on the same Wi-Fi open the dev server (http://<your-pc-ip>:3000). Without this Next blocks
  // the dev scripts for non-localhost origins, so the page renders but never hydrates and buttons do nothing.
  // Development only: ignored by `next build` / production.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
