"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PhoneFrame({ children, className = "" }: Props) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      <div
        className="absolute inset-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.18)]"
        style={{
          borderRadius: "14% / 6.5%",
          background:
            "linear-gradient(180deg, #2b2b2e 0%, #161618 50%, #2b2b2e 100%)",
        }}
        aria-hidden
      />

      <span
        aria-hidden
        className="absolute left-[-1.2%] top-[19%] h-[5%] w-[1.4%] rounded-l-sm bg-[#0c0c0d]"
      />
      <span
        aria-hidden
        className="absolute left-[-1.2%] top-[27%] h-[9%] w-[1.4%] rounded-l-sm bg-[#0c0c0d]"
      />
      <span
        aria-hidden
        className="absolute left-[-1.2%] top-[38%] h-[9%] w-[1.4%] rounded-l-sm bg-[#0c0c0d]"
      />
      <span
        aria-hidden
        className="absolute right-[-1.2%] top-[27%] h-[13%] w-[1.4%] rounded-r-sm bg-[#0c0c0d]"
      />

      <div
        className="absolute inset-[2.6%] overflow-hidden bg-black"
        style={{ borderRadius: "11.5% / 5.5%" }}
      >
        {children}

        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[1.4%] z-10 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
        />
      </div>
    </div>
  );
}
