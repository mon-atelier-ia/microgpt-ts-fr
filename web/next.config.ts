import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["../microgpt", "../datasets"],
  // The app imports ../microgpt and ../datasets, so the workspace root is the repo root.
  // Next >= 16.4 no longer infers it from the parent lockfile: pin it explicitly.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
