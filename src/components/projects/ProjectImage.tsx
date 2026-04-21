"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage as ProjectImageType } from "@/data/projects";

type Props = {
  image: ProjectImageType;
  /** Optional override for the aspect ratio. */
  ratio?: string;
  className?: string;
  priority?: boolean;
  /** Shown when the image fails or while empty. */
  label?: string;
};

/**
 * Renders a project image with an elegant editorial placeholder when the
 * source is empty or missing. The placeholder shows the declared ratio,
 * a label, and is framed by a hairline — so a page looks intentional even
 * before real screenshots are dropped in.
 */
export default function ProjectImage({ image, ratio, className = "", priority, label }: Props) {
  const [failed, setFailed] = useState(false);
  const aspect = ratio || image.ratio || "4/5";
  const isEmpty = !image.src || failed;

  return (
    <figure className={`relative w-full ${className}`}>
      <div
        className="relative w-full overflow-hidden bg-ink/[0.03]"
        style={{ aspectRatio: aspect }}
      >
        {!isEmpty && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority}
            onError={() => setFailed(true)}
            className="object-cover"
          />
        )}
        {isEmpty && <Placeholder ratio={aspect} label={label || image.alt} />}
      </div>
      {image.caption && (
        <figcaption className="eyebrow mt-3 flex items-baseline gap-3">
          <span className="inline-block h-px w-6 bg-ink" />
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
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
