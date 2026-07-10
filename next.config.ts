import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output → small production Docker image (.next/standalone/server.js).
  output: "standalone",
  // The app is early/WIP — don't fail the production build on lint/type errors.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
