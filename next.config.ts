import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output → small production Docker image (.next/standalone/server.js).
  output: "standalone",
  // The app is early/WIP — don't fail the production build on lint/type errors.
  // @ts-ignore
  eslint: { ignoreDuringBuilds: true },
  // @ts-ignore
  typescript: { ignoreBuildErrors: true },
  // Pin the workspace root: a stray /Users/mac/package-lock.json otherwise makes
  // Turbopack infer $HOME as the root and watch the entire home directory.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
