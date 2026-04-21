"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Index", href: "#hero", num: "00" },
  { label: "À propos", href: "#about", num: "01" },
  { label: "Projets", href: "#projects", num: "02" },
  { label: "Stack", href: "#stack", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf: number | null = null;
    let last = false;
    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const next = window.scrollY > 20;
        if (next !== last) {
          last = next;
          setScrolled(next);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Sync initial state on next frame to avoid setState in effect body
    const initRaf = requestAnimationFrame(() => {
      last = window.scrollY > 20;
      setScrolled(last);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(initRaf);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-bone/90 backdrop-blur-sm border-b border-[var(--line)]" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="mono text-xs uppercase tracking-[0.22em] text-ink"
        >
          Hugo B-R <span className="text-subtle">/ portfolio</span>
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="group mono text-xs uppercase tracking-[0.18em] text-ink flex items-baseline gap-1.5"
              >
                <span className="text-subtle tabular-nums">{item.num}</span>
                <span className="relative">
                  {item.label}
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-pollen scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden mono text-xs uppercase tracking-[0.22em] text-ink"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-bone">
          <ul className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-[var(--line)] last:border-b-0">
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="mono flex items-baseline gap-3 py-4 text-sm uppercase tracking-[0.18em] text-ink"
                >
                  <span className="text-subtle tabular-nums">{item.num}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
