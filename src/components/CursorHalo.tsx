'use client';

import { useEffect, useRef } from 'react';

export default function CursorHalo() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = haloRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let x = 0;
    let y = 0;

    const onMouseMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          el.style.setProperty('--halo-x', `${x}px`);
          el.style.setProperty('--halo-y', `${y}px`);
          el.style.opacity = '1';
          rafId = null;
        });
      }
    };

    const onMouseLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300 mix-blend-screen"
      style={{
        background:
          'radial-gradient(600px circle at var(--halo-x, -1000px) var(--halo-y, -1000px), var(--gradient-glow-blue), transparent 60%)',
      }}
    />
  );
}
