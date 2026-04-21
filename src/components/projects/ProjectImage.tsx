"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage as ProjectImageType } from "@/data/projects";
import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";

type Props = {
  image: ProjectImageType;
  /** Optional override for the aspect ratio. */
  ratio?: string;
  className?: string;
  priority?: boolean;
  /** Shown when the image fails or while empty. */
  label?: string;
};

export default function ProjectImage({ image, ratio, className = "", priority, label }: Props) {
  const [failed, setFailed] = useState(false);
  const aspect = ratio || image.ratio || "4/5";
  const isEmpty = !image.src || failed;
  const frame = resolveFrame(image.frame, aspect);

  const content = (
    <>
      {!isEmpty && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
      {isEmpty && <Placeholder ratio={aspect} label={label || image.alt} />}
    </>
  );

  return (
    <figure className={`relative w-full ${className}`}>
      {frame === "phone" ? (
        <PhoneFrame>{content}</PhoneFrame>
      ) : frame === "browser" ? (
        <BrowserFrame url={image.url} ratio={aspect}>
          {content}
        </BrowserFrame>
      ) : (
        <div
          className="relative w-full overflow-hidden bg-ink/[0.03]"
          style={{ aspectRatio: aspect }}
        >
          {content}
        </div>
      )}
      {image.caption && (
        <figcaption className="eyebrow mt-3 flex items-baseline gap-3">
          <span className="inline-block h-px w-6 bg-ink" />
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function isPhoneRatio(ratio: string): boolean {
  const [w, h] = ratio.split("/").map(Number);
  if (!w || !h) return false;
  return h / w >= 2;
}

function resolveFrame(
  explicit: ProjectImageType["frame"],
  ratio: string,
): "browser" | "phone" | "none" {
  if (explicit) return explicit;
  return isPhoneRatio(ratio) ? "phone" : "none";
}

function Placeholder({ ratio, label }: { ratio: string; label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 border border-[var(--line-strong)]">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-ink/[0.06]"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="eyebrow relative text-subtle">Image — {ratio}</span>
      <span className="relative max-w-[70%] text-center text-sm text-muted">{label}</span>
    </div>
  );
}
