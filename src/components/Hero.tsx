"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

// Sequence: loader exit → NAME BOOM BOOM BOOM (nothing else before) → header/navbar/intro arrive after
// Rhythm: 100 BPM — noire = 0.6s, double croche = 0.15s
const SNAP_EASE = [0.16, 1, 0.3, 1] as const; // expo-out — clean, sharp, no overshoot
const BEAT = 0.6;
const NAME_REVEAL_BASE_DELAY = 2.7;
const NAME_SLAM_STAGGER = BEAT; // each name line = 1 noire
const REVEAL_DONE_MS = 6700;

// Arrives AFTER the name slams — top meta bar slides down
const topBarVariants: Variants = {
  hidden: { y: "-120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: SNAP_EASE, delay: 5.0 },
  },
};

// Eyebrow — arrives with the top bar group
const eyebrowRowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: SNAP_EASE, delay: 5.2 },
  },
};

// Name h1 — orchestrates 3 line slams at 1 noire apart
const nameContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: NAME_SLAM_STAGGER,
      delayChildren: NAME_REVEAL_BASE_DELAY,
    },
  },
};

// Each name line = 1 noire — clean sharp slam, no bounce, settles before next beat
const nameLineVariants: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.45, ease: SNAP_EASE },
  },
};

// Double croche after the 3 slams ring out — intro arrives as quick accent
// line 3 hits at 2.7 + 2*0.6 = 3.9s → short rest → header group at 5.0s → intro at 5.5s
const introVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: SNAP_EASE, delay: 5.5 },
  },
};

// Scroll cue — last to arrive
const bottomCueVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 6.1 },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [now, setNow] = useState<string>("");

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

  // Lock scroll for the full reveal so the user can't miss the sequence.
  // Covers the LoadingScreen phase and extends through the final slam + header arrival.
  useEffect(() => {
    if (reduce) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const release = () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
    const t = window.setTimeout(release, REVEAL_DONE_MS);
    return () => {
      window.clearTimeout(t);
      release();
    };
  }, [reduce]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-bone text-ink"
    >
      {/* Top meta bar */}
      <div className="absolute inset-x-0 top-14 z-10 px-6 md:px-10 pt-10 overflow-hidden">
        <motion.div
          className="flex items-baseline justify-between rule-b pb-3"
          variants={reduce ? undefined : topBarVariants}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
        >
          <span className="eyebrow">Portfolio / Éd. 2026</span>
          <span className="eyebrow tabular-nums">{now || "— Chargement —"}</span>
        </motion.div>
      </div>

      {/* Name composition */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 md:px-10">
        <motion.div
          className="flex items-baseline gap-4 mb-6 md:mb-10"
          variants={reduce ? undefined : eyebrowRowVariants}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
        >
          <span className="eyebrow">N° 00 / Bonjour</span>
          <span className="hidden md:block h-px flex-1 bg-[var(--line-strong)]" />
          <span className="eyebrow hidden md:block">Dév. fullstack — Annecy</span>
        </motion.div>

        <motion.h1
          data-invert-zone
          className="display text-[18vw] md:text-[15vw] leading-[0.86] tracking-tight"
          variants={reduce ? undefined : nameContainerVariants}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
        >
          <NameLine reduce={!!reduce}>Hugo</NameLine>
          <NameLine reduce={!!reduce} italic>Boulicaut–</NameLine>
          <NameLine reduce={!!reduce} italic>Raffort</NameLine>
        </motion.h1>

        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
          variants={reduce ? undefined : introVariants}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
        >
          <p className="mono col-span-1 md:col-span-4 text-xs uppercase tracking-[0.22em] text-muted">
            Annecy — France
            <br />
            Dispo alternance / Sept. 2026
          </p>

          <p className="col-span-1 md:col-span-7 md:col-start-6 text-xl md:text-2xl leading-snug max-w-xl">
            J&apos;écris des{" "}
            <span className="marker display-italic">
              interfaces qui tiennent
            </span>
            . Rapides, lisibles, sans approximation — du code qu&apos;on peut{" "}
            <span className="marker">relire six mois plus tard</span>{" "}
            sans grimacer.
          </p>
        </motion.div>
      </div>

      {/* Bottom edge: scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 px-6 md:px-10">
        <motion.div
          className="flex items-center justify-between rule-t pt-3"
          variants={reduce ? undefined : bottomCueVariants}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "visible"}
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="eyebrow group inline-flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-ink transition-all duration-500 group-hover:w-16" />
            Descendre / Voir le travail
          </a>
          <span className="eyebrow hidden md:block">© 2026 — HBR</span>
        </motion.div>
      </div>
    </section>
  );
}

function NameLine({
  children,
  italic = false,
  reduce = false,
}: {
  children: React.ReactNode;
  italic?: boolean;
  reduce?: boolean;
}) {
  const [done, setDone] = useState(false);

  if (reduce) {
    return (
      <span
        className={`block ${italic ? "display-italic -mt-[0.04em] text-ink/95" : ""}`}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`block ${italic ? "display-italic -mt-[0.04em] text-ink/95" : ""}`}
      style={{ clipPath: done ? "none" : "inset(-20% -25% -20% -20%)" }}
    >
      <motion.span
        className="block"
        variants={nameLineVariants}
        onAnimationComplete={() => setDone(true)}
        style={{ willChange: done ? "auto" : "transform" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
