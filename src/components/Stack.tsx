"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TechMarquee from "./stack/TechMarquee";
import SecretPoint from "./stack/SecretPoint";

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
              <SecretPoint />
            </h2>
          </div>
        </div>
      </header>

      {/* Kinetic marquee */}
      <TechMarquee rows={marqueeRows} />
    </section>
  );
}
