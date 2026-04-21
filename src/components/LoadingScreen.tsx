"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const DURATION_MS = 2400;
const REDUCED_DURATION_MS = 600;

export default function LoadingScreen() {
  const reduce = useReducedMotion();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Scroll lock ownership is in Hero (covers the full reveal timeline).
    const t = setTimeout(
      () => setGone(true),
      reduce ? REDUCED_DURATION_MS : DURATION_MS,
    );
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="loader"
          exit={{ y: "-100%" }}
          transition={{ duration: reduce ? 0.3 : 1.1, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-bone"
          aria-hidden
        >
          {/* Crop marks — printer's proof corners */}
          <CropMark corner="tl" />
          <CropMark corner="tr" />
          <CropMark corner="bl" />
          <CropMark corner="br" />

          {/* Top-left label */}
          <motion.span
            className="mono absolute left-8 top-8 text-[0.65rem] uppercase tracking-[0.28em]"
            style={{ color: "rgba(245,242,236,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Édition · 2026
          </motion.span>

          {/* Top-right folio */}
          <motion.span
            className="mono absolute right-8 top-8 text-[0.65rem] uppercase tracking-[0.28em] tabular-nums"
            style={{ color: "rgba(245,242,236,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            N° 00 / 01
          </motion.span>

          {/* Center composition */}
          <div className="flex flex-col items-center">
            <Glyph reduce={!!reduce} />

            <motion.div
              className="mt-8 flex items-center gap-3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 1.3 }}
            >
              <span
                className="mono text-[0.65rem] uppercase tracking-[0.32em]"
                style={{ color: "rgba(245,242,236,0.5)" }}
              >
                H · B · R
              </span>
            </motion.div>
          </div>

          {/* Bottom-left status */}
          <motion.div
            className="absolute bottom-8 left-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 }}
          >
            <motion.span
              className="block h-[6px] w-[6px] rounded-full bg-pollen"
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

          {/* Bottom-right signature */}
          <motion.span
            className="mono absolute bottom-8 right-8 text-[0.65rem] uppercase tracking-[0.28em]"
            style={{ color: "rgba(245,242,236,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 }}
          >
            Annecy · FR
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Glyph({ reduce }: { reduce: boolean }) {
  if (reduce) {
    return (
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
        <circle
          cx="48"
          cy="48"
          r="38"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="48" cy="48" r="5" fill="#e8ff00" />
      </svg>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
        {/* Outer ring — traces + continuous rotation */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 3.2, ease: "linear", repeat: Infinity }}
          style={{ transformOrigin: "48px 48px" }}
        >
          <motion.circle
            cx="48"
            cy="48"
            r="38"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.g>

        {/* Tick marks — compass rose every 90° */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.line
            key={angle}
            x1="48"
            y1="6"
            x2="48"
            y2="10"
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1"
            style={{ transformOrigin: "48px 48px", transform: `rotate(${angle}deg)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 + (angle / 90) * 0.06 }}
          />
        ))}

        {/* Inner arc — counter-rotating fragment */}
        <motion.g
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: -360 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.6 },
            rotate: { duration: 2.4, ease: "linear", repeat: Infinity, delay: 0.6 },
          }}
          style={{ transformOrigin: "48px 48px" }}
        >
          <circle
            cx="48"
            cy="48"
            r="26"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeDasharray="14 150"
          />
        </motion.g>

        {/* Ripple — emanates from core */}
        <motion.circle
          cx="48"
          cy="48"
          r="5"
          stroke="#e8ff00"
          strokeWidth="1.25"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 6], opacity: [0.9, 0] }}
          transition={{
            duration: 1.6,
            delay: 1.1,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
          style={{ transformOrigin: "48px 48px" }}
        />

        {/* Core pollen dot */}
        <motion.circle
          cx="48"
          cy="48"
          r="5"
          fill="#e8ff00"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{ duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "48px 48px" }}
        />
      </svg>
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
