"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

// Sequence: loader exit → NAME BOOM BOOM BOOM → tout le reste apparaît sec & net, en 3 coups
const SNAP_EASE = [0.16, 1, 0.3, 1] as const; // expo-out — clean, sharp, no overshoot
const BEAT = 0.75;
const NAME_REVEAL_BASE_DELAY = 2.9;
const NAME_SLAM_STAGGER = BEAT; // chaque ligne = 1 noire — un chouia + lent entre les lignes

// Après Raffort (~4.15s) : cascade resserrée pour arriver plus vite au contenu.
// Haut : Navbar (4.7s, dans Navbar.tsx) → N° 00 → Portfolio. Pose courte.
// Bas : scroll cue → mono col → paragraphe.
const SNAP_DURATION = 0; // vrai cut, pas d'interpolation — évite le micro-saut sur le texte
const EYEBROW_DELAY = 4.8; // "N° 00 / Bonjour" — très court après la navbar
const TOP_BAR_DELAY = 4.95; // "Portfolio / Éd. 2026"
const BELOW_EDGE_DELAY = 5.4; // pose puis scroll cue
const INTRO_MONO_DELAY = 5.55; // col gauche "Annecy / Dispo"
const INTRO_PARAGRAPH_DELAY = 5.7; // paragraphe "J'écris des interfaces…"
const REVEAL_DONE_MS = 6000;

const snapAt = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: SNAP_DURATION, delay },
  },
});

const topBarVariants = snapAt(TOP_BAR_DELAY);
const eyebrowRowVariants = snapAt(EYEBROW_DELAY);
const bottomCueVariants = snapAt(BELOW_EDGE_DELAY);
const introMonoVariants = snapAt(INTRO_MONO_DELAY);
const introParagraphVariants = snapAt(INTRO_PARAGRAPH_DELAY);

// Name h1 — trois lignes qui pop en cut sec.
// Gaps légèrement asymétriques pour compenser la perception visuelle : Boulicaut– est long,
// Raffort est court — raccourcir le 2e intervalle (−0.2s) rééquilibre le ressenti.
const nameContainerVariants: Variants = {
  hidden: {},
  visible: {},
};

// offsets (s) depuis NAME_REVEAL_BASE_DELAY pour Hugo / Boulicaut– / Raffort
const NAME_LINE_OFFSETS = [0, NAME_SLAM_STAGGER, NAME_SLAM_STAGGER * 2 - 0.25] as const;

const nameLineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0,
      delay: NAME_REVEAL_BASE_DELAY + NAME_LINE_OFFSETS[i],
    },
  }),
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
          <NameLine index={0} reduce={!!reduce}>Hugo</NameLine>
          <NameLine index={1} reduce={!!reduce} italic>Boulicaut–</NameLine>
          <NameLine index={2} reduce={!!reduce} italic>Raffort</NameLine>
        </motion.h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <motion.p
            className="mono col-span-1 md:col-span-4 text-xs uppercase tracking-[0.22em] text-muted"
            variants={reduce ? undefined : introMonoVariants}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "visible"}
          >
            Fullstack JS — React / Nuxt / Flutter / Python
            <br />
            Annecy — France
            <br />
            Dispo alternance / Sept. 2026
          </motion.p>

          <motion.p
            className="col-span-1 md:col-span-7 md:col-start-6 text-xl md:text-2xl leading-snug max-w-xl"
            variants={reduce ? undefined : introParagraphVariants}
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "visible"}
          >
            J&apos;écris des{" "}
            <span className="marker display-italic">
              interfaces qui tiennent
            </span>
            . Rapides, lisibles, sans approximation — du code qu&apos;on peut{" "}
            <span className="marker">relire six mois plus tard</span>{" "}
            sans grimacer.
          </motion.p>
        </div>
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
  index,
}: {
  children: React.ReactNode;
  italic?: boolean;
  reduce?: boolean;
  index: number;
}) {
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
    <motion.span
      className={`block ${italic ? "display-italic -mt-[0.04em] text-ink/95" : ""}`}
      custom={index}
      variants={nameLineVariants}
    >
      {children}
    </motion.span>
  );
}
