import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/lib/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Développeur Fullstack",
  description: "Portfolio moderne et immersif d'un développeur fullstack JavaScript spécialisé en React, Next.js et Three.js",
  keywords: ["portfolio", "développeur", "fullstack", "react", "nextjs", "threejs"],
  authors: [{ name: "Votre Nom" }],
  openGraph: {
    title: "Portfolio - Développeur Fullstack",
    description: "Portfolio moderne et immersif",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
