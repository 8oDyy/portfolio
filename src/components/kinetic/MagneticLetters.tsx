"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
  /** Max translation in px applied to a letter right under the cursor. */
  strength?: number;
  /** Radius in px beyond which letters are not affected. */
  radius?: number;
  /** If true, apply a subtle italic/rotation to nearby letters. */
  wobble?: boolean;
};

/**
 * Splits text into per-letter spans and applies a magnetic transform
 * based on cursor distance. Transforms are written directly to each
 * letter's style (no React re-renders).
 */
export default function MagneticLetters({
  text,
  className = "",
  strength = 28,
  radius = 180,
  wobble = false,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(wrap.querySelectorAll<HTMLElement>(".letter"));
    let centers: { x: number; y: number }[] = [];

    const measure = () => {
      centers = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };
    measure();

    let mx = -9999;
    let my = -9999;
    let raf: number | null = null;

    const tick = () => {
      raf = null;
      for (let i = 0; i < letters.length; i++) {
        const c = centers[i];
        const dx = mx - c.x;
        const dy = my - c.y;
        const dist = Math.hypot(dx, dy);
        if (dist > radius) {
          letters[i].style.transform = "translate3d(0,0,0)";
          continue;
        }
        const force = (1 - dist / radius) ** 1.6;
        const tx = (dx / dist) * force * strength;
        const ty = (dy / dist) * force * strength;
        const rot = wobble ? force * 6 * Math.sign(dx) : 0;
        letters[i].style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
      }
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (raf == null) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      if (raf == null) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      measure();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [text, strength, radius, wobble]);

  return (
    <span ref={wrapRef} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="letter"
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
