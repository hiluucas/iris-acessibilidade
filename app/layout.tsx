import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Importe o Footer
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iris | Auditoria de Acessibilidade Digital",
  description: "Ferramenta gratuita para auditar a acessibilidade do seu site (WCAG 2.2).",
  // ... seus outros metadados
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* O 'flex-1' garante que o conteúdo empurre o footer para baixo mesmo em páginas curtas */}
        <div className="flex-1">
          {children}
        </div>
        
        {/* Footer Global */}
        <Footer />
      </body>
    </html>
  );
}