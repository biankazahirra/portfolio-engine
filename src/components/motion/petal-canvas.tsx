"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  angle: number;
  spin: number;
  alpha: number;
  color: string;
}

const COLORS = ["#E98FA6", "#F3B7C6", "#F2C14E"];

export function PetalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = ref.current;
    if (!canvasElement) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const contextElement = canvasElement.getContext("2d");
    if (!contextElement) return;

    const canvas = canvasElement;
    const context = contextElement;

    let width = 0;
    let height = 0;
    let petals: Petal[] = [];
    let frame = 0;
    let visible = true;

    function makePetal(randomY: boolean): Petal {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -20,
        size: 4 + Math.random() * 7,
        speed: 0.25 + Math.random() * 0.55,
        drift: 0.35 + Math.random() * 0.8,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.01,
        alpha: 0.28 + Math.random() * 0.35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = width < 768 ? 10 : 26;
      petals = Array.from({ length: count }, () => makePetal(true));
    }

    function draw() {
      context.clearRect(0, 0, width, height);

      for (const petal of petals) {
        petal.y += petal.speed;
        petal.x += Math.sin(petal.angle) * petal.drift;
        petal.angle += petal.spin;

        if (petal.y > height + 24) Object.assign(petal, makePetal(false));

        context.save();
        context.translate(petal.x, petal.y);
        context.rotate(petal.angle);
        context.globalAlpha = petal.alpha;
        context.fillStyle = petal.color;
        context.beginPath();
        context.ellipse(0, 0, petal.size, petal.size * 0.55, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    function loop() {
      draw();
      frame = window.requestAnimationFrame(loop);
    }

    function start() {
      if (frame) return;
      frame = window.requestAnimationFrame(loop);
    }

    function stop() {
      window.cancelAnimationFrame(frame);
      frame = 0;
    }

    function onVisibility() {
      if (document.hidden || !visible) stop();
      else start();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });

    resize();
    observer.observe(canvas);
    start();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="petal-canvas" aria-hidden="true" />;
}
