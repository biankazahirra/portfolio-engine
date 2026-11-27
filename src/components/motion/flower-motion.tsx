"use client";

import { useEffect } from "react";

export function FlowerMotion() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".journal-item"));
    if (items.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.querySelector("[data-vine-flower]")?.classList.add("is-bloomed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.querySelector("[data-vine-flower]")?.classList.add("is-bloomed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}
