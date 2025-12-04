import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CRÍTICO: Impede que o Next.js tente processar o Puppeteer no build
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min", "puppeteer"],
  
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;