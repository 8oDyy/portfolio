"use client";

import { useEffect, useRef, useState } from "react";
import MagneticLetters from "./kinetic/MagneticLetters";

export default function Hero() {
  const [now, setNow] = useState<string>("");
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const fmt = new Intl.DateTimeFormat("fr-FR", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Paris",
      }).format(d);
      setNow(fmt.replace(".", ""));
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Reveal veil slides off on mount
  useEffect(() => {
    const v = veilRef.current;
    if (!v) return;
    requestAnimationFrame(() => {
      v.style.transform = "translateY(-100%)";
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-bone text-ink"
    >
      {/* Reveal veil */}
      <div
        ref={veilRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 bg-ink"
        style={{
          transform: "translateY(0%)",
          transition: "transform 1.2s cubic-bezier(0.83, 0, 0.17, 1)",
        }}
      />

      {/* Top meta bar */}
      <div className="absolute inset-x-0 top-14 z-10 px-6 md:px-10 pt-10">
        <div className="flex items-baseline justify-between rule-b pb-3">
          <span className="eyebrow">Portfolio — Éd. 2026</span>
          <span className="eyebrow tabular-nums">{now || "— Chargement —"}</span>
        </div>
      </div>

      {/* Name composition */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-10">
        <div className="flex items-baseline gap-4 mb-6 md:mb-10">
          <span className="eyebrow">N° 00 / Hello</span>
          <span className="hidden md:block h-px flex-1 bg-[var(--line-strong)]" />
          <span className="eyebrow hidden md:block">Développeur fullstack</span>
        </div>

        <h1 className="display text-[18vw] md:text-[15vw] leading-[0.86] tracking-tight">
          <span className="block">
            <MagneticLetters text="Hugo" strength={22} radius={160} />
          </span>
          <span className="display-italic block -mt-[0.04em] text-ink/95">
            <MagneticLetters text="Boulicaut–Raffort" strength={30} radius={220} wobble />
          </span>
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <p className="mono col-span-1 md:col-span-4 text-xs uppercase tracking-[0.22em] text-muted">
            Basé à Annecy
            <br />
            Disponible — Alternance
          </p>

          <p className="col-span-1 md:col-span-7 md:col-start-6 text-xl md:text-2xl leading-snug max-w-xl">
            Je construis des <span className="marker display-italic">interfaces soignées</span>,
            rapides et robustes. Des bases propres, des <span className="marker">détails qui comptent</span>,
            et du code qu&apos;on aime relire.
          </p>
        </div>
      </div>

      {/* Bottom edge: scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 px-6 md:px-10">
        <div className="flex items-center justify-between rule-t pt-3">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="eyebrow group inline-flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-ink transition-all duration-500 group-hover:w-16" />
            Scroll / Commencer
          </a>
          <span className="eyebrow hidden md:block">© 2026 — HBR</span>
        </div>
      </div>
    </section>
  );
}
