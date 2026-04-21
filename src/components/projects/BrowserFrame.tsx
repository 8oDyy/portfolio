"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Fake URL rendered in the chrome bar. */
  url?: string;
  /** Aspect ratio of the inner viewport (CSS aspect-ratio string). */
  ratio?: string;
  className?: string;
};

export default function BrowserFrame({ children, url, ratio, className = "" }: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--bone)] shadow-[0_30px_80px_-20px_rgba(14,14,14,0.28),0_4px_12px_rgba(14,14,14,0.08)] ${className}`}
    >
      <div className="flex h-8 items-center gap-3 border-b border-[var(--line)] bg-[var(--bone)] px-3 md:h-9 md:px-4">
        <div className="group/dots flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[var(--ink)] opacity-[0.22] transition-[background-color,opacity] duration-200 ease-out group-hover/dots:bg-[#ff5f57] group-hover/dots:opacity-100 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[var(--ink)] opacity-[0.14] transition-[background-color,opacity] duration-200 ease-out group-hover/dots:bg-[#febc2e] group-hover/dots:opacity-100 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[var(--ink)] opacity-[0.14] transition-[background-color,opacity] duration-200 ease-out group-hover/dots:bg-[#28c840] group-hover/dots:opacity-100 md:h-2.5 md:w-2.5" />
        </div>
        <span className="hidden h-px flex-1 bg-[var(--line)] md:block" />
        {url && (
          <div className="ml-auto flex min-w-0 max-w-[75%] items-center gap-1.5 rounded-md bg-[var(--overlay-ink-05)] px-2 py-0.5 md:mx-0 md:ml-0">
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              fill="none"
              className="h-3 w-3 shrink-0 text-[var(--muted)]"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="4" y="7.5" width="8" height="5" rx="0.6" />
              <path d="M5.5 7.5V5.5a2.5 2.5 0 015 0v2" />
            </svg>
            <span className="mono truncate text-[9px] tracking-tight text-[var(--muted)] md:text-[10px]">
              {url}
            </span>
          </div>
        )}
        <span className="hidden h-px flex-1 bg-[var(--line)] md:block" />
      </div>

      <div
        className="relative w-full bg-[var(--overlay-ink-05)]"
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
