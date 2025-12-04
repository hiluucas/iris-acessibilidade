import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO DE RESPEITO ---
export const metadata: Metadata = {
  title: "Iris | Auditoria de Acessibilidade Digital",
  description: "Ferramenta gratuita para auditar a acessibilidade do seu site (WCAG 2.2). Torne a web mais inclusiva com diagnósticos precisos e didáticos.",
  keywords: ["acessibilidade", "wcag", "inclusão digital", "teste de acessibilidade", "pcd", "desenvolvimento web"],
  authors: [{ name: "Lucas Gentrop" }], // Coloque seu nome ou da empresa
  openGraph: {
    title: "Iris - Acessibilidade Descomplicada",
    description: "Descubra se seu site é acessível para todos. Faça um teste gratuito agora.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Adicionamos 'lang="pt-BR"' -> Essencial para leitores de tela saberem o sotaque correto!
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}