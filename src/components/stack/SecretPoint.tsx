"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const WORDS = ["salut.", "chut.", "tiens.", "bien joué.", "coucou.", "vu.", "trouvé."];
const HOLD_MS = 800;
const PARTICLE_COUNT = 220;
const GRAVITY = 0.42;
const DRAG = 0.992;

type Shape = "rect" | "square" | "circle" | "triangle" | "line";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rot: number;
  vr: number;
  shape: Shape;
};

type Shock = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

export default function SecretPoint() {
  const dotRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shocksRef = useRef<Shock[]>([]);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdingRef = useRef(false);
  const [charging, setCharging] = useState(false);
  const [flash, setFlash] = useState(false);
  const [word, setWord] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const spawnBurst = useCallback(() => {
    if (typeof window === "undefined") return;
    const dot = dotRef.current;
    if (!dot) return;
    const rect = dot.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const shapes: Shape[] = ["rect", "square", "circle", "triangle", "line"];
    const palette = ["#e8ff00", "#e8ff00", "#e8ff00", "#0e0e0e", "#f5f2ec"];

    const next: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 18;
      next.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        life: 0,
        maxLife: 110 + Math.random() * 90,
        size: 5 + Math.random() * 14,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.45,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }
    particlesRef.current.push(...next);

    shocksRef.current.push({ x: cx, y: cy, life: 0, maxLife: 40 });
    shocksRef.current.push({ x: cx, y: cy, life: -6, maxLife: 50 });

    setFlash(true);
    window.setTimeout(() => setFlash(false), 120);

    const pick = WORDS[Math.floor(Math.random() * WORDS.length)];
    setWord(pick);
    window.setTimeout(() => setWord((w) => (w === pick ? null : w)), 1400);

    document.body.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: "translate(-4px, 3px)" },
        { transform: "translate(5px, -2px)" },
        { transform: "translate(-3px, -3px)" },
        { transform: "translate(2px, 2px)" },
        { transform: "translate(0, 0)" },
      ],
      { duration: 240, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }, []);

  const startHold = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      holdingRef.current = true;
      setCharging(true);
      clearTimer();
      timerRef.current = setTimeout(() => {
        if (holdingRef.current) {
          spawnBurst();
        }
        setCharging(false);
      }, HOLD_MS);
    },
    [spawnBurst],
  );

  const cancelHold = useCallback(() => {
    holdingRef.current = false;
    setCharging(false);
    clearTimer();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawShape = (p: Particle) => {
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      switch (p.shape) {
        case "rect":
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          break;
        case "square":
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case "line":
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-p.size / 2, 0);
          ctx.lineTo(p.size / 2, 0);
          ctx.stroke();
          break;
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // shockwaves
      const shocks = shocksRef.current;
      for (let i = shocks.length - 1; i >= 0; i--) {
        const s = shocks[i];
        s.life++;
        if (s.life < 0) continue;
        const t = s.life / s.maxLife;
        if (t >= 1) {
          shocks.splice(i, 1);
          continue;
        }
        const radius = t * 620;
        const alpha = 1 - t;
        ctx.save();
        ctx.globalAlpha = alpha * 0.9;
        ctx.strokeStyle = "#e8ff00";
        ctx.lineWidth = 6 * (1 - t) + 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // particles
      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.vx *= DRAG;
        p.vy = p.vy * DRAG + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life++;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = alpha;
        drawShape(p);
        ctx.restore();

        if (p.life >= p.maxLife || p.y > window.innerHeight + 40) {
          list.splice(i, 1);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <>
      <button
        ref={dotRef}
        type="button"
        aria-label="."
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        onPointerCancel={cancelHold}
        className="relative inline-block align-baseline bg-transparent border-0 p-0 select-none"
        style={{
          font: "inherit",
          color: "inherit",
          letterSpacing: "inherit",
          lineHeight: "inherit",
          transform: charging ? "translateY(-0.04em) scale(1.1)" : "none",
          transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        .
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: charging
              ? "0 0 0 0.08em var(--pollen), 0 0 2em 0.4em rgba(232,255,0,0.45)"
              : "none",
            borderRadius: "9999px",
            transition: "box-shadow 800ms ease-out",
          }}
        />
      </button>

      {mounted &&
        createPortal(
          <>
            <canvas
              ref={canvasRef}
              aria-hidden
              className="fixed inset-0 pointer-events-none"
              style={{ zIndex: 91 }}
            />

            <div
              aria-hidden
              className="fixed inset-0 pointer-events-none"
              style={{
                background: "var(--pollen)",
                opacity: flash ? 0.7 : 0,
                transition: flash ? "opacity 40ms linear" : "opacity 280ms ease-out",
                zIndex: 90,
                mixBlendMode: "difference",
              }}
            />

            {word && (
              <div
                aria-hidden
                className="fixed inset-0 pointer-events-none flex items-center justify-center"
                style={{ zIndex: 92 }}
              >
                <span
                  className="display-italic"
                  style={{
                    fontSize: "clamp(7rem, 22vw, 24rem)",
                    lineHeight: 0.85,
                    color: "var(--pollen)",
                    WebkitTextStroke: "3px var(--ink)",
                    textShadow:
                      "0 0 2em rgba(232,255,0,0.6), 0 0.04em 0 var(--ink), 0 0.08em 0 rgba(14,14,14,0.4)",
                    animation: "secret-word 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {word}
                </span>
              </div>
            )}
          </>,
          document.body,
        )}
    </>
  );
}
