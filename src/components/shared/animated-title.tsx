"use client";

import { useEffect, useRef } from "react";

interface AnimatedTitleProps {
  text: string;
  as?: "h1" | "h2";
  className?: string;
}

export function AnimatedTitle({ text, as: Tag = "h2", className }: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const words = element.querySelectorAll<HTMLElement>("[data-word]");
      const tween = gsap.fromTo(
        words,
        { opacity: 0, yPercent: 40 },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        },
      );

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text
        .split(/\s+/)
        .filter(Boolean)
        .map((word, index) => (
          <span
            key={`${word}-${index}`}
            data-word
            aria-hidden="true"
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </span>
        ))}
    </Tag>
  );
}
