"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    let raf: number | null = null;
    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        setShowTop(window.scrollY > 800);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  // Publish footer height as a CSS var so the main content can reserve space
  // above it (the footer is position: fixed and sits behind the main).
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const publish = () => {
      document.documentElement.style.setProperty("--footer-h", `${el.offsetHeight}px`);
    };
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    window.addEventListener("resize", publish);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publish);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="fixed inset-x-0 bottom-0 z-0 bg-ink text-bone"
    >
      {/* Big sign-off */}
      <div className="px-6 md:px-10 pt-24 md:pt-36 pb-10">
        <h3 className="display text-[clamp(3rem,14vw,14rem)] leading-[0.86]">
          Fin.
        </h3>
        <p className="display-italic text-3xl md:text-5xl mt-4 text-bone/80 max-w-2xl leading-tight">
          Merci d&apos;avoir fait défiler.
        </p>
      </div>

      {/* Editorial info bar */}
      <div className="px-6 md:px-10 pb-10 border-t border-bone/15">
        <div className="grid grid-cols-12 gap-6 md:gap-10 pt-8">
          <div className="col-span-12 md:col-span-4">
            <span className="mono text-xs uppercase tracking-[0.22em] text-bone/60">HBR — Portfolio</span>
            <p className="display-italic text-xl mt-2">Annecy, France</p>
          </div>
          <div className="col-span-6 md:col-span-4 flex flex-col gap-2">
            <span className="mono text-xs uppercase tracking-[0.22em] text-bone/60">Liens</span>
            <a href="https://github.com/8oDyy" className="mono text-sm uppercase tracking-[0.18em] hover:text-pollen transition-colors" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/boulicautraffort-hugo/" className="mono text-sm uppercase tracking-[0.18em] hover:text-pollen transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="mailto:hugoboulicaut@gmail.com" className="mono text-sm uppercase tracking-[0.18em] hover:text-pollen transition-colors">Email ↗</a>
          </div>
          <div className="col-span-6 md:col-span-4 md:text-right">
            <span className="mono text-xs uppercase tracking-[0.22em] text-bone/60 block">Colophon</span>
            <p className="mono text-xs text-bone/60 mt-2 leading-relaxed">
              Next.js — Tailwind — GSAP — <br />
              Framer Motion — Matter.js
            </p>
            <p className="mono text-xs text-bone/60 mt-2">
              Typographie : Fraunces + Geist
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-bone/15 flex items-center justify-between">
          <span className="mono text-xs uppercase tracking-[0.22em] text-bone/60">
            © {year} Hugo Boulicaut-Raffort
          </span>
          {showTop && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mono text-xs uppercase tracking-[0.22em] inline-flex items-center gap-2 hover:text-pollen transition-colors"
            >
              ↑ Retour en haut
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
