import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avisa o Next.js para não tentar processar esses pacotes pesados no build
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  // Aumenta o tempo limite para não dar erro em sites lentos
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;