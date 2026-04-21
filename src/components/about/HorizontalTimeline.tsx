"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type TimelineEntry = {
  year: string;
  title: string;
  place: string;
  description: string;
};

type Props = {
  entries: TimelineEntry[];
};

export default function HorizontalTimeline({ entries }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        return () => {
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <>
      {/* Desktop — pinned horizontal scroll */}
      <div ref={sectionRef} className="relative hidden md:block overflow-hidden bg-bone">
        <div ref={trackRef} className="flex h-screen items-stretch">
          <header className="shrink-0 w-[60vw] flex flex-col justify-center px-10">
            <span className="eyebrow mb-4">01 / Parcours</span>
            <h3 data-invert-zone className="display text-[clamp(3rem,7vw,7rem)] leading-[0.9]">
              Quatre ans,
              <br />
              <span className="display-italic">quatre étapes.</span>
            </h3>
            <p className="mono text-xs text-subtle uppercase tracking-[0.22em] mt-10">
              → Scroll pour parcourir
            </p>
          </header>

          {entries.map((e, i) => (
            <article
              key={e.year}
              className="shrink-0 w-[55vw] flex flex-col justify-center px-10 border-l border-[var(--line-strong)] relative"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="eyebrow tabular-nums">N° {String(i + 1).padStart(2, "0")}</span>
                <span className="eyebrow">{e.place}</span>
              </div>
              <div className="display text-[clamp(6rem,16vw,16rem)] leading-none tabular-nums">
                {e.year}
              </div>
              <h4 className="display-italic mt-6 text-4xl md:text-5xl leading-tight">{e.title}</h4>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{e.description}</p>
            </article>
          ))}

          <footer className="shrink-0 w-[40vw] flex flex-col justify-end px-10 pb-24">
            <span className="eyebrow mb-3">Aujourd&apos;hui</span>
            <p className="display-italic text-3xl md:text-4xl leading-tight max-w-sm">
              En recherche d&apos;alternance — ouvert aux rencontres.
            </p>
          </footer>
        </div>
      </div>

      {/* Mobile — simple vertical list */}
      <div className="md:hidden px-6 py-20">
        <span className="eyebrow mb-4 block">01 / Parcours</span>
        <h3 data-invert-zone className="display text-6xl leading-[0.9] mb-10">
          Quatre ans,
          <br />
          <span className="display-italic">quatre étapes.</span>
        </h3>
        <ol className="space-y-10">
          {entries.map((e, i) => (
            <li key={e.year} className="rule-t pt-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow tabular-nums">N° {String(i + 1).padStart(2, "0")}</span>
                <span className="eyebrow">{e.place}</span>
              </div>
              <div className="display text-7xl tabular-nums mt-3">{e.year}</div>
              <h4 className="display-italic text-3xl leading-tight mt-3">{e.title}</h4>
              <p className="mt-4 text-base leading-relaxed text-muted">{e.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
