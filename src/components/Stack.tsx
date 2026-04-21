"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TechMarquee from "./stack/TechMarquee";
import TechPlayground from "./stack/TechPlayground";

const marqueeRows = [
  {
    duration: 55,
    items: [
      "React",
      "Next.js",
      "Vue 3",
      "Nuxt 3",
      "TypeScript",
      "Tailwind",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    duration: 40,
    reverse: true,
    items: ["Node.js", "Supabase", "PostgreSQL", "Express", "MongoDB", "Redis", "GraphQL"],
  },
  {
    duration: 70,
    items: ["Git", "Docker", "Vercel", "AWS", "GitHub Actions", "Figma", "Flutter", "C++"],
  },
];

const playgroundWords = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Nuxt",
  "Supabase",
  "PostgreSQL",
  "GSAP",
  "Framer Motion",
  "Vercel",
  "Docker",
  "Flutter",
  "Node.js",
  "Figma",
  "Git",
];

export default function Stack() {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const parleX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section id="stack" className="relative bg-bone text-ink">
      <header
        ref={headerRef}
        className="px-6 md:px-10 pt-24 md:pt-36 rule-b pb-8 md:pb-12"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow">03 / Stack technique</span>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="display text-[clamp(3rem,9vw,9rem)] leading-[0.88]">
              Ce que je{" "}
              <motion.span
                style={{ x: parleX }}
                className="display-italic inline-block will-change-transform"
              >
                parle
              </motion.span>
              .
            </h2>
          </div>
        </div>
      </header>

      {/* Kinetic marquee */}
      <TechMarquee rows={marqueeRows} />

      {/* Easter egg playground */}
      <div className="px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12">
          <div className="col-span-12 md:col-span-5">
            <p className="display-italic text-3xl md:text-4xl leading-tight">
              Un terrain de jeu — <br />
              sans règles utiles.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 max-w-lg">
            <p className="text-base md:text-lg leading-relaxed text-muted">
              Les outils deviennent des objets physiques. Attrapez-les, lancez-les,
              empilez-les. Cliquez sur <em className="not-italic text-ink">Reset</em> pour
              tout laisser retomber.
            </p>
          </div>
        </div>
        <TechPlayground words={playgroundWords} />
      </div>
    </section>
  );
}
