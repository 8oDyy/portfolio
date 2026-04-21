"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import PhoneFrame from "./PhoneFrame";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Caption = { untilProgress: number; label: string };

type Props = {
  src: string;
  poster?: string;
  captions?: Caption[];
};

export default function ScrollScrubVideo({ src, poster, captions }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const trigger =
      video.closest<HTMLElement>("[data-scrub-root]") ?? video.closest("article");
    if (!trigger) return;

    const sorted = captions
      ? [...captions].sort((a, b) => a.untilProgress - b.untilProgress)
      : [];
    const captionFor = (p: number) =>
      sorted.find((c) => p <= c.untilProgress)?.label ?? "";

    let duration = 0;
    let st: ScrollTrigger | null = null;

    const setup = () => {
      duration = isFinite(video.duration) ? video.duration : 0;
      if (!duration) return;

      st?.kill();
      st = ScrollTrigger.create({
        trigger,
        start: "top top+=96",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const t = Math.min(self.progress * duration, duration - 0.05);
          if (Math.abs(video.currentTime - t) > 0.01) {
            video.currentTime = t;
          }
          const node = captionRef.current;
          if (node) {
            const next = captionFor(self.progress);
            if (node.textContent !== next) node.textContent = next;
          }
        },
      });
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1 && isFinite(video.duration) && video.duration > 0) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      st?.kill();
    };
  }, [captions]);

  const initial = captions?.[0]?.label ?? "";

  return (
    <>
      <PhoneFrame>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover"
        />
      </PhoneFrame>
      {captions && captions.length > 0 && (
        <div className="mt-4 flex items-baseline justify-center gap-3">
          <span className="inline-block h-px w-6 bg-ink" aria-hidden />
          <span ref={captionRef} className="eyebrow text-ink">
            {initial}
          </span>
        </div>
      )}
    </>
  );
}
