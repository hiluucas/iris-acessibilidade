import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Impede que o build quebre tentando empacotar o navegador
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  
  // Aumenta limites para evitar timeout em sites pesados
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;