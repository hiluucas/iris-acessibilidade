import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isso evita que o Next.js tente "empacotar" o navegador, o que quebraria o deploy
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  experimental: {
    serverActions: {
      // Aumenta o limite para não dar erro em sites grandes
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;