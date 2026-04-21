"use client";

import { useEffect, useRef, useState } from "react";

const BASE_SIZE = 24;
const HOT_SIZE = 180;
const LERP = 0.22; // higher = snappier tracking (0 = frozen, 1 = instant)
const TRANSITION = "width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1), margin 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s";
const HOT_SELECTOR = "[data-invert-zone]";

export default function InvertCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip on touch-only devices — no cursor to invert
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = -500;
    let targetY = -500;
    let curX = -500;
    let curY = -500;
    let rafId: number | null = null;

    const loop = () => {
      curX += (targetX - curX) * LERP;
      curY += (targetY - curY) * LERP;
      el.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(HOT_SELECTOR)) setHot(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest?.(HOT_SELECTOR)) setHot(false);
    };
    const onLeaveDoc = () => setVisible(false);
    const onEnterDoc = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseenter", onEnterDoc);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseenter", onEnterDoc);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  const size = hot ? HOT_SIZE : BASE_SIZE;
  const halfSize = size / 2;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full bg-white will-change-transform"
      style={{
        mixBlendMode: "difference",
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: `-${halfSize}px`,
        marginTop: `-${halfSize}px`,
        opacity: visible ? 1 : 0,
        transition: TRANSITION,
      }}
    />
  );
}
