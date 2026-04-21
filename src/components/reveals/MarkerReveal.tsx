"use client";

import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
  delay?: number;
};

export function MarkerReveal({
  children,
  className = "",
  amount = 0.8,
  once = true,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount });

  return (
    <span
      ref={ref}
      className={`marker ${inView ? "marker-on" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </span>
  );
}
