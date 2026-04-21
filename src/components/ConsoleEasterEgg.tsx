"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    hugo?: {
      stack: () => void;
      contact: () => void;
      crowdmind: () => void;
      help: () => void;
    };
  }
}

const POLLEN = "#e8ff00";
const INK = "#0e0e0e";
const BONE = "#f5f2ec";

const banner = [
  "",
  "  ██╗  ██╗██╗   ██╗ ██████╗  ██████╗ ",
  "  ██║  ██║██║   ██║██╔════╝ ██╔═══██╗",
  "  ███████║██║   ██║██║  ███╗██║   ██║",
  "  ██╔══██║██║   ██║██║   ██║██║   ██║",
  "  ██║  ██║╚██████╔╝╚██████╔╝╚██████╔╝",
  "  ╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ",
  "",
].join("\n");

export default function ConsoleEasterEgg() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.hugo) return;

    const label = `background:${INK};color:${POLLEN};padding:2px 8px;border-radius:2px;font-weight:600;`;
    const body = `color:#6b6864;font-family:ui-monospace,monospace;`;
    const bannerStyle = `color:${POLLEN};background:${INK};font-family:ui-monospace,monospace;line-height:1.1;padding:8px 12px;`;

    console.log(`%c${banner}`, bannerStyle);
    console.log(
      "%cSalut, curieuse curieux.%c\nTu as trouvé la console. Respect.\n\nEssaie : %chugo.help()",
      `background:${POLLEN};color:${INK};padding:4px 10px;font-weight:700;`,
      body,
      `color:${INK};background:${POLLEN};padding:1px 6px;border-radius:2px;font-weight:600;`,
    );

    const stack = [
      ["front",    "React · Next.js · Vue 3 · Nuxt 3 · TypeScript · Tailwind"],
      ["motion",   "Framer Motion · GSAP · Lenis · Canvas 2D"],
      ["back",     "FastAPI · Node.js · Express · Supabase · PostgreSQL"],
      ["infra",    "Docker · Nginx · Azure VPS · GitHub Actions · Vercel"],
      ["hors-écran", "Raspberry Pi · WebSocket · C++ · Flutter"],
    ] as const;

    const log = (...args: unknown[]) => console.log(...(args as [unknown, ...unknown[]]));

    window.hugo = {
      stack: () => {
        log("%c// stack.print()", `color:${BONE};background:${INK};padding:2px 8px;font-family:ui-monospace,monospace;`);
        stack.forEach(([k, v], i) => {
          setTimeout(() => {
            log(
              `%c${k.padEnd(10)}%c ${v}`,
              `background:${POLLEN};color:${INK};padding:1px 6px;font-weight:600;font-family:ui-monospace,monospace;`,
              `color:${INK};font-family:ui-monospace,monospace;`,
            );
          }, i * 120);
        });
      },
      contact: () => {
        log(
          "%cmail%c hugoboulicaut@gmail.com",
          label,
          `color:${INK};font-family:ui-monospace,monospace;padding-left:6px;`,
        );
        log(
          "%cgithub%c github.com/8oDyy",
          label,
          `color:${INK};font-family:ui-monospace,monospace;padding-left:6px;`,
        );
      },
      crowdmind: () => {
        log(
          "%ccrowdmind%c projet de recherche — modéliser 100 citoyens synthétiques sur 22 topics, sans LLM.\nBackend FastAPI (Azure VPS) + moteur déporté sur Raspberry Pi en WebSocket + Supabase.\nCode privé — ask for a walkthrough.",
          `background:${POLLEN};color:${INK};padding:2px 8px;font-weight:700;`,
          `color:${INK};font-family:ui-monospace,monospace;line-height:1.5;`,
        );
      },
      help: () => {
        log(
          "%chugo.*%c api du terminal",
          `background:${INK};color:${POLLEN};padding:2px 8px;font-weight:700;`,
          `color:${INK};font-family:ui-monospace,monospace;padding-left:6px;`,
        );
        [
          ["hugo.stack()",     "ce que je parle, version verbeuse"],
          ["hugo.contact()",   "où me trouver"],
          ["hugo.crowdmind()", "le projet de recherche du moment"],
          ["hugo.help()",      "ce message"],
        ].forEach(([cmd, desc]) => {
          log(
            `%c${cmd}%c  ${desc}`,
            `color:${INK};background:${POLLEN};padding:1px 6px;border-radius:2px;font-weight:600;font-family:ui-monospace,monospace;`,
            `color:#6b6864;font-family:ui-monospace,monospace;`,
          );
        });
      },
    };
  }, []);

  return null;
}
