import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Instrui a Vercel a incluir os binários do Chromium corretamente
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  // Aumenta limites para evitar timeout em sites lentos
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;