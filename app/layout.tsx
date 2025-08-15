import type { Metadata } from "next";
import "./globals.css";
// 1. A linha de importação foi adicionada aqui
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Dra. Klei Prior - Biomédica Esteta",
  description: "Especialista em harmonização facial com foco na naturalidade em Erechim, RS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        {/* 2. O componente de análise foi adicionado aqui, antes de fechar o body */}
        <Analytics />
      </body>
    </html>
  );
}