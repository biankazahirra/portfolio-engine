"use client";

import { getGsap } from "@/lib/motion/gsap-core";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
        import("lenis"),
        getGsap(),
      ]);
      if (disposed) return;

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: true,
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.off("scroll", onScroll);
        lenis.destroy();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
