"use client";

import { getGsap } from "@/lib/motion/gsap-core";
import { useEffect, useRef } from "react";

export function GrowingVine() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const path = svg.querySelector<SVGPathElement>(".vine-stem");
    if (!path) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await getGsap();
      if (disposed) return;

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      const tween = gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: svg.parentElement,
          start: mobile ? "top 85%" : "top 78%",
          end: mobile ? "bottom 88%" : "bottom 65%",
          scrub: 0.6,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="vine"
      viewBox="0 0 60 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="vine-stem"
        d="M30 0 C 14 170, 46 330, 30 500 C 14 670, 46 830, 30 1000"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="vine-leaf"
        d="M30 220 C 12 210, 8 190, 10 178 C 26 182, 34 200, 30 220 Z"
      />
      <path
        className="vine-leaf"
        d="M30 520 C 48 510, 52 490, 50 478 C 34 482, 26 500, 30 520 Z"
      />
      <path
        className="vine-leaf"
        d="M30 810 C 12 800, 8 780, 10 768 C 26 772, 34 790, 30 810 Z"
      />
    </svg>
  );
}
