"use client";

import { useEffect, useRef, useState } from "react";

/** Course story reels in public/videos/courses, one per course. */
export const REELS: Record<string, string> = {
  bls: "bls",
  "heartsaver-cpr-first-aid-aed": "heartsaver",
  "pediatric-first-aid-cpr-aed": "pediatric",
};

/**
 * A course's story reel. Shows the poster with a play button and only loads
 * the video when someone presses play, so pages stay light. `shape` picks the
 * cut: "wide" swaps to the portrait cut on phones, "tall" is always portrait.
 */
export default function StoryReel({
  reel,
  title,
  shape = "wide",
}: {
  reel: string;
  title: string;
  shape?: "wide" | "tall";
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [tall, setTall] = useState(shape === "tall");

  useEffect(() => {
    if (shape === "tall") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setTall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [shape]);

  const cut = tall ? "9x16" : "16x9";
  const src = `${base}/videos/courses/${reel}-${cut}.mp4`;
  const poster = `${base}/videos/courses/${reel}-${cut}.jpg`;

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-navy-950 shadow-lg ${
        tall ? "mx-auto aspect-[9/16] w-full max-w-[420px]" : "aspect-video w-full"
      }`}
    >
      {playing ? (
        <video
          key={src}
          ref={ref}
          className="size-full object-cover"
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={title}
        />
      ) : (
        <button
          type="button"
          onClick={play}
          className="group absolute inset-0 size-full text-left"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-red text-white shadow-xl transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 size-8" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="absolute inset-x-0 bottom-0 p-6 font-heading text-lg font-bold text-white sm:text-xl">{title}</span>
        </button>
      )}
    </div>
  );
}
