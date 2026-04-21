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
  metadataBase: new URL("https://www.hugoboulicautraffort.fr"),
  title: "Hugo Boulicaut-Raffort — Développeur",
  description:
    "Portfolio éditorial de Hugo Boulicaut-Raffort, développeur fullstack JavaScript. Projets, parcours, stack technique.",
  keywords: ["portfolio", "développeur", "fullstack", "react", "nextjs", "typescript"],
  authors: [{ name: "Hugo Boulicaut-Raffort" }],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Hugo Boulicaut-Raffort",
    title: "Hugo Boulicaut-Raffort — Développeur",
    description: "Portfolio éditorial — développeur fullstack JavaScript.",
    type: "website",
    locale: "fr_FR",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Boulicaut-Raffort — Développeur",
    description: "Portfolio éditorial — développeur fullstack JavaScript.",
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
      <body className="antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ink focus:text-bone focus:px-4 focus:py-2 focus:text-sm mono uppercase tracking-[0.22em]"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
