"use client";

import type { CSSProperties } from "react";

type Row = {
  items: string[];
  reverse?: boolean;
  /** Duration in seconds for one full loop. Default 45. */
  duration?: number;
};

type Props = {
  rows: Row[];
};

export default function TechMarquee({ rows }: Props) {
  return (
    <div className="border-y border-[var(--line-strong)] divide-y divide-[var(--line)] bg-bone">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          items={row.items}
          reverse={row.reverse}
          duration={row.duration}
        />
      ))}
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration = 45,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const style = {
    animationDirection: reverse ? "reverse" : "normal",
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div className="flex overflow-hidden py-4 md:py-6">
      <div
        className="flex shrink-0 animate-marquee whitespace-nowrap items-baseline"
        style={style}
      >
        <MarqueeInner items={items} />
        <MarqueeInner items={items} />
      </div>
    </div>
  );
}

function MarqueeInner({ items }: { items: string[] }) {
  return (
    <div className="flex items-baseline shrink-0">
      {items.map((it, i) => (
        <span key={i} className="display text-[12vw] md:text-[8vw] leading-none mx-6 md:mx-10 inline-flex items-center gap-8">
          {it}
          <span className="text-pollen text-[0.8em]" aria-hidden>✻</span>
        </span>
      ))}
    </div>
  );
}
