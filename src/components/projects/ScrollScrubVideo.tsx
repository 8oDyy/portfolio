"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import PhoneFrame from "./PhoneFrame";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string;
  poster?: string;
};

export default function ScrollScrubVideo({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;
      const trigger =
        video.closest<HTMLElement>("[data-scrub-root]") ?? video.closest("article");
      if (!trigger) return;

      const tween = gsap.to(video, {
        currentTime: () => (isFinite(video.duration) ? video.duration : 0),
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top+=96",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const onMeta = () => {
        tween.invalidate();
        ScrollTrigger.refresh();
      };
      if (video.readyState >= 1) onMeta();
      else video.addEventListener("loadedmetadata", onMeta, { once: true });
      video.load();

      return () => {
        video.removeEventListener("loadedmetadata", onMeta);
      };
    },
    { scope: videoRef },
  );

  return (
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
  );
}
