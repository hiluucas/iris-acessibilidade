import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Instrui a Vercel a incluir esses binários corretamente na função Serverless
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
};

export default nextConfig;