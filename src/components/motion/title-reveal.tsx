"use client";

import { getGsap } from "@/lib/motion/gsap-core";
import { useEffect } from "react";

export function TitleReveal() {
  useEffect(() => {
    const titles = Array.from(document.querySelectorAll<HTMLElement>("[data-animated-title]"));
    if (titles.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await getGsap();
      if (disposed) return;

      const tweens = titles.map((title) =>
        gsap.fromTo(
          title.querySelectorAll<HTMLElement>("[data-word]"),
          { opacity: 0, yPercent: 40 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: title, start: "top 88%", once: true },
          },
        ),
      );

      cleanup = () => {
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
