"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  words: string[];
};

/**
 * Matter.js-powered playground. Tech words fall into the frame and can be
 * dragged, thrown, and stacked. Loaded lazily when the frame enters view
 * and disabled under prefers-reduced-motion.
 */
export default function TechPlayground({ words }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [resetKey, setResetKey] = useState(0);

  // Respect reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Arm when the frame enters view
  useEffect(() => {
    if (reducedMotion) return;
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  // Boot Matter.js
  useEffect(() => {
    if (!ready) return;
    let mounted = true;

    (async () => {
      const Matter = (await import("matter-js")).default;
      if (!mounted) return;

      const frame = frameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;

      const engine = Matter.Engine.create();
      engine.gravity.y = 1;

      const wallOpts = { isStatic: true, render: { visible: false } };
      Matter.World.add(engine.world, [
        // floor
        Matter.Bodies.rectangle(W / 2, H + 30, W + 200, 60, wallOpts),
        // left wall — extends above the frame so falling words are guided in
        Matter.Bodies.rectangle(-30, H / 2 - H, 60, H * 4, wallOpts),
        // right wall — same
        Matter.Bodies.rectangle(W + 30, H / 2 - H, 60, H * 4, wallOpts),
        // NOTE: no top wall — words drop into the frame via gravity.
      ]);

      // Sandbox layer inside frame — holds positioned word DOM nodes
      const sandbox = document.createElement("div");
      sandbox.style.position = "absolute";
      sandbox.style.inset = "0";
      frame.appendChild(sandbox);

      type Piece = { body: Matter.Body; el: HTMLDivElement };
      const pieces: Piece[] = [];

      words.forEach((word, i) => {
        const el = document.createElement("div");
        el.textContent = word;
        el.style.position = "absolute";
        el.style.top = "0";
        el.style.left = "0";
        el.style.whiteSpace = "nowrap";
        el.style.padding = "10px 20px";
        el.style.fontFamily = "var(--font-fraunces), Georgia, serif";
        el.style.fontSize = "clamp(1.25rem, 2.4vw, 2rem)";
        el.style.fontStyle = i % 3 === 1 ? "italic" : "normal";
        el.style.lineHeight = "1";
        el.style.letterSpacing = "-0.02em";
        el.style.border = "1px solid var(--ink)";
        el.style.background = i % 5 === 0 ? "var(--pollen)" : "var(--bone)";
        el.style.color = "var(--ink)";
        el.style.userSelect = "none";
        el.style.cursor = "grab";
        el.style.willChange = "transform";
        el.style.transformOrigin = "center center";
        sandbox.appendChild(el);

        const size = el.getBoundingClientRect();
        const w = size.width;
        const h = size.height;

        const x = Math.max(w / 2 + 10, Math.min(W - w / 2 - 10, Math.random() * W));
        const y = -(80 + i * 60 + Math.random() * 100);

        const body = Matter.Bodies.rectangle(x, y, w, h, {
          restitution: 0.35,
          friction: 0.12,
          frictionAir: 0.015,
          density: 0.0018,
          chamfer: { radius: 3 },
        });
        Matter.World.add(engine.world, body);
        pieces.push({ body, el });
      });

      // Mouse interaction
      const mouse = Matter.Mouse.create(frame);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.15, render: { visible: false } },
      });
      Matter.World.add(engine.world, mouseConstraint);

      // Don't block page scroll on wheel over the frame.
      // matter-js attaches a wheel handler (mouse.mousewheel) that calls preventDefault.
      const wheelHandler = (mouse as unknown as { mousewheel: EventListener }).mousewheel;
      if (wheelHandler) {
        mouse.element.removeEventListener("wheel", wheelHandler);
        mouse.element.removeEventListener("DOMMouseScroll", wheelHandler);
      }

      // Grabbing cursor feedback
      Matter.Events.on(mouseConstraint, "startdrag", () => {
        frame.style.cursor = "grabbing";
      });
      Matter.Events.on(mouseConstraint, "enddrag", () => {
        frame.style.cursor = "";
      });

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      let rafId: number | null = null;
      const tickDOM = () => {
        for (const { body, el } of pieces) {
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
        }
        rafId = requestAnimationFrame(tickDOM);
      };
      tickDOM();

      cleanupRef.current = () => {
        if (rafId != null) cancelAnimationFrame(rafId);
        Matter.Runner.stop(runner);
        Matter.Events.off(mouseConstraint, undefined as unknown as string, undefined as unknown as () => void);
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
        sandbox.remove();
      };
    })();

    return () => {
      mounted = false;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [ready, words, resetKey]);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-baseline justify-between rule-t pt-4 mb-4 px-0">
        <span className="eyebrow">Terrain de jeu · Ø Easter egg</span>
        <button
          onClick={handleReset}
          disabled={!ready || reducedMotion}
          className="mono text-xs uppercase tracking-[0.18em] text-ink underline underline-offset-4 hover:text-muted disabled:text-subtle disabled:no-underline"
        >
          Reset
        </button>
      </div>
      <div
        ref={frameRef}
        className="relative w-full h-[70vh] min-h-[480px] max-h-[780px] overflow-hidden border border-[var(--line-strong)] bg-bone"
      >
        {!ready && !reducedMotion && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="eyebrow text-subtle">↓ Scroll — les mots tombent dans le terrain</span>
            <span className="display-italic text-3xl md:text-5xl text-ink/30">en attente</span>
          </div>
        )}
        {reducedMotion && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="flex flex-wrap gap-2 max-w-2xl justify-center">
              {words.map((w) => (
                <span key={w} className="mono text-sm border border-[var(--line-strong)] px-3 py-1.5">
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="mono mt-3 text-xs text-subtle uppercase tracking-[0.18em]">
        Attrape, lance, empile. <span className="text-muted">Les mots ont des règles de physique.</span>
      </p>
    </div>
  );
}
