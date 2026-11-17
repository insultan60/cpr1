"use client";

import { useEffect, useRef } from "react";

/** Homepage background video, played a little slower than recorded. Phones
 *  get the portrait mobile cut; wider screens the desktop one. */
export default function HeroVideo({
  src,
  mobileSrc,
  poster,
  rate = 0.7,
}: {
  src: string;
  mobileSrc?: string;
  poster: string;
  rate?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Plain <video> paths don't get Next's basePath (GitHub Pages serves the
  // site from /cpr), so add it here, as lib/image-loader.ts does for images.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Pick the file in the browser, so phones never download the desktop one.
    const mobile = mobileSrc && window.matchMedia("(max-width: 767px)").matches;
    v.src = `${base}${mobile ? mobileSrc : src}`;
    const set = () => (v.playbackRate = rate);
    v.addEventListener("loadeddata", set);
    v.play().catch(() => {});
    return () => v.removeEventListener("loadeddata", set);
  }, [base, src, mobileSrc, rate]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 size-full object-cover object-[center_20%]"
      poster={`${base}${poster}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
