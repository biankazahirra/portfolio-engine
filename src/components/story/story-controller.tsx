"use client";

import { getGsap } from "@/lib/motion/gsap-core";
import { useEffect } from "react";
import type { Chapter } from "@/types/chapter";

export function StoryController({ chapters }: { chapters: Chapter[] }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await getGsap();
      if (disposed) return;

      const skipped =
        document.documentElement.dataset.story === "skipped" ||
        (() => {
          try {
            return sessionStorage.getItem("storySkipped") === "1";
          } catch {
            return false;
          }
        })();
      if (skipped) return;

      const story = document.getElementById("story");
      const chapterElements = Array.from(
        document.querySelectorAll<HTMLElement>(".story-chapter"),
      );
      const vinePath = document.querySelector<SVGPathElement>(".story-vine-path");
      const progressBar = document.querySelector<HTMLElement>(".story-progress-bar");
      const dots = Array.from(document.querySelectorAll<HTMLElement>("[data-dot]"));
      const dotsNav = document.querySelector<HTMLElement>(".chapter-dots");
      if (!story || chapterElements.length === 0) return;

      const observers: IntersectionObserver[] = [];

      const dotsObserver = new IntersectionObserver(
        ([entry]) => dotsNav?.classList.toggle("is-visible", entry.isIntersecting),
        { rootMargin: "-12% 0px -55% 0px", threshold: 0 },
      );
      dotsObserver.observe(story);

      const ctx = gsap.context(() => {
        const pathLength = vinePath?.getTotalLength() ?? 0;
        if (vinePath) gsap.set(vinePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        ScrollTrigger.create({
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (vinePath) gsap.set(vinePath, { strokeDashoffset: pathLength * (1 - self.progress) });
            if (progressBar) gsap.set(progressBar, { scaleX: self.progress });
          },
        });

        function activate(index: number) {
          dots.forEach((dot, dotIndex) => {
            if (dotIndex === index) dot.setAttribute("aria-current", "step");
            else dot.removeAttribute("aria-current");
          });
        }

        function createChapterTimeline(chapter: HTMLElement, index: number, mobile: boolean) {
          const copy = chapter.querySelector<HTMLElement>(".chapter-copy");
          const parts = chapter.querySelectorAll<SVGElement>("[data-part]");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: "top top",
              end: mobile ? "+=100%" : "+=125%",
              pin: true,
              pinSpacing: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onEnter: () => activate(index),
              onEnterBack: () => activate(index),
            },
          });

          if (copy) {
            timeline.fromTo(copy, { y: 28 }, { y: 0, duration: 0.3, ease: "power2.out" }, 0);
          }

          timeline.fromTo(
            parts,
            { y: 16, scale: 0.84 },
            { y: 0, scale: 1, stagger: 0.08, duration: 0.42, ease: "back.out(1.4)" },
            0.08,
          );

          if (copy) timeline.to(copy, { y: -12, duration: 0.24 }, 0.86);
        }

        function build(mobile: boolean) {
          const observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                observer.unobserve(entry.target);
                const index = chapterElements.indexOf(entry.target as HTMLElement);
                if (index >= 0) {
                  ctx.add(() => createChapterTimeline(entry.target as HTMLElement, index, mobile));
                }
              }
            },
            { rootMargin: "0px", threshold: 0.01 },
          );

          chapterElements.forEach((chapter) => observer.observe(chapter));
          observers.push(observer);
        }

        const media = gsap.matchMedia();
        media.add("(min-width: 768px)", () => build(false));
        media.add("(max-width: 767px)", () => build(true));
        activate(0);
      });

      cleanup = () => {
        dotsObserver.disconnect();
        observers.forEach((observer) => observer.disconnect());
        dotsNav?.classList.remove("is-visible");
        ctx.revert();
      };
    })();

    const onSkip = () => {
      cleanup?.();
      cleanup = undefined;
    };

    window.addEventListener("story:skip", onSkip);

    return () => {
      disposed = true;
      window.removeEventListener("story:skip", onSkip);
      cleanup?.();
    };
  }, [chapters.length]);

  return null;
}
