"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useState } from "react";

const DURATION_MS = 2400;
const REDUCED_DURATION_MS = 600;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export default function LoadingScreen() {
  const reduce = useReducedMotion();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(
      () => setGone(true),
      reduce ? REDUCED_DURATION_MS : DURATION_MS,
    );
    return () => clearTimeout(t);
  }, [reduce]);

  const plateVariants: Variants = {
    hidden: { clipPath: "inset(50% 50% 50% 50%)" },
    visible: {
      clipPath: "inset(28% 18% 28% 18%)",
      transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.2 },
    },
    exit: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.75, ease: EASE_IN_OUT },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-ink text-bone"
          aria-hidden
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <CropMark corner="tl" />
          <CropMark corner="tr" />
          <CropMark corner="bl" />
          <CropMark corner="br" />

          <Label pos="left-8 top-8" delay={0.2}>
            Édition · 2026
          </Label>
          <Label pos="right-8 top-8 tabular-nums" delay={0.3}>
            N° 00 / 01
          </Label>

          {/* Plate — bone rectangle clipped in from center */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-bone"
            variants={plateVariants}
          />

          {/* Typography inside the plate — ink on bone (color inversion) */}
          <motion.div
            variants={contentVariants}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-5 text-ink">
              <PlateMark reduce={!!reduce} />
              <div className="h-px w-10 bg-ink/30" />
              <div className="mono text-[0.65rem] uppercase tracking-[0.3em] text-ink/70">
                Portfolio / Éd. 2026
              </div>
            </div>
          </motion.div>

          {/* Status + progress — stay on ink, outside the plate */}
          <motion.div
            className="absolute bottom-8 left-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 }}
            variants={contentVariants}
          >
            <motion.span
              className="block h-[6px] w-[6px] bg-pollen"
              animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
            />
            <span
              className="mono text-[0.65rem] uppercase tracking-[0.28em]"
              style={{ color: "rgba(245,242,236,0.55)" }}
            >
              Loading
            </span>
          </motion.div>

          <motion.div variants={contentVariants}>
            <Progress reduce={!!reduce} />
          </motion.div>

          <motion.span
            className="mono absolute bottom-8 right-8 text-[0.65rem] uppercase tracking-[0.28em]"
            style={{ color: "rgba(245,242,236,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 }}
            variants={contentVariants}
          >
            Annecy · FR
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlateMark({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return <span className="display-italic text-[3.5rem] leading-none">HBR</span>;
  }

  return (
    <div className="flex items-baseline gap-[0.08em] px-[0.2em]">
      {["H", "B", "R"].map((ch, i) => (
        <motion.span
          key={ch}
          initial={{ clipPath: "inset(-20% 100% -20% -10%)" }}
          animate={{ clipPath: "inset(-20% -10% -20% -10%)" }}
          transition={{
            duration: 0.55,
            ease: EASE_OUT_EXPO,
            delay: 0.85 + i * 0.12,
          }}
          className="display-italic text-[3.5rem] leading-none"
        >
          {ch}
        </motion.span>
      ))}
    </div>
  );
}

function Label({
  children,
  pos,
  delay,
}: {
  children: React.ReactNode;
  pos: string;
  delay: number;
}) {
  return (
    <motion.span
      className={`mono absolute text-[0.65rem] uppercase tracking-[0.28em] ${pos}`}
      style={{ color: "rgba(245,242,236,0.55)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.span>
  );
}

function Progress({ reduce }: { reduce: boolean }) {
  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v * 100}%`);
  const [countText, setCountText] = useState("0000");

  useEffect(() => {
    const start = reduce ? 0 : 0.35;
    const dur = reduce ? 0.3 : (DURATION_MS - 350) / 1000;
    const controls = animate(progress, 1, {
      duration: dur,
      delay: start,
      ease: [0.5, 0, 0.5, 1],
      onUpdate: (v) => {
        const n = Math.round(v * 100);
        setCountText(String(n).padStart(4, "0"));
      },
    });
    return () => controls.stop();
  }, [progress, reduce]);

  return (
    <motion.div
      className="absolute bottom-20 left-1/2 flex w-[min(280px,50vw)] -translate-x-1/2 flex-col gap-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: reduce ? 0 : 0.35 }}
    >
      <div className="flex items-baseline justify-between">
        <span
          className="mono text-[0.6rem] uppercase tracking-[0.28em]"
          style={{ color: "rgba(245,242,236,0.4)" }}
        >
          Chargement
        </span>
        <span
          className="mono text-[0.6rem] tabular-nums uppercase tracking-[0.22em]"
          style={{ color: "rgba(245,242,236,0.75)" }}
        >
          {countText} / 0100
        </span>
      </div>
      <div
        className="relative h-px w-full"
        style={{ backgroundColor: "rgba(245,242,236,0.15)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ width, backgroundColor: "rgba(245,242,236,0.9)" }}
        />
      </div>
    </motion.div>
  );
}

function CropMark({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const pos = {
    tl: "left-4 top-4",
    tr: "right-4 top-4",
    bl: "left-4 bottom-4",
    br: "right-4 bottom-4",
  }[corner];
  const rotate = {
    tl: "rotate(0deg)",
    tr: "rotate(90deg)",
    bl: "rotate(-90deg)",
    br: "rotate(180deg)",
  }[corner];
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`absolute ${pos}`}
      style={{ transform: rotate, color: "rgba(245,242,236,0.5)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      aria-hidden
    >
      <path d="M0 0 H14" stroke="currentColor" strokeWidth="1" />
      <path d="M0 0 V14" stroke="currentColor" strokeWidth="1" />
    </motion.svg>
  );
}
