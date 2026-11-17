"use client";

import { useEffect, useRef } from "react";

/** Homepage background video, played a little slower than recorded. */
export default function HeroVideo({ src, poster, rate = 0.7 }: { src: string; poster: string; rate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const set = () => (v.playbackRate = rate);
    set();
    // Some browsers reset the rate when the source (re)loads.
    v.addEventListener("loadeddata", set);
    return () => v.removeEventListener("loadeddata", set);
  }, [rate]);

  // Plain <video> paths don't get Next's basePath (GitHub Pages serves the
  // site from /cpr), so add it here, as lib/image-loader.ts does for images.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <video
      ref={ref}
      className="absolute inset-0 -z-20 size-full object-cover object-[center_20%]"
      src={`${base}${src}`}
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
