import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hugo Boulicaut-Raffort — Développeur",
  description:
    "Portfolio éditorial de Hugo Boulicaut-Raffort, développeur fullstack JavaScript. Projets, parcours, stack technique.",
  keywords: ["portfolio", "développeur", "fullstack", "react", "nextjs", "typescript"],
  authors: [{ name: "Hugo Boulicaut-Raffort" }],
  openGraph: {
    title: "Hugo Boulicaut-Raffort — Développeur",
    description: "Portfolio éditorial — développeur fullstack JavaScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
