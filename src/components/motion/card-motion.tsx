"use client";

import { animate } from "motion/react";
import { useEffect } from "react";

export function CardMotion() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-card]"));
    if (cards.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => {
        card.style.transform = "none";
      });
      return;
    }

    const cleanups: Array<() => void> = [];
    let order = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);

          const delay = Math.min(order * 0.05, 0.3);
          order += 1;
          animate(
            entry.target as HTMLElement,
            { y: 0 },
            { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
          );
        }
      },
      { threshold: 0.2 },
    );

    cards.forEach((card) => {
      observer.observe(card);

      const enter = () => animate(card, { y: -3 }, { duration: 0.2, ease: "easeOut" });
      const leave = () => animate(card, { y: 0 }, { duration: 0.2, ease: "easeOut" });

      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
      });
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
