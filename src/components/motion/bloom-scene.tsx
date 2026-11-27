"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BloomFallback } from "./bloom-fallback";

const BloomCanvas = dynamic(() => import("./bloom-canvas"), {
  ssr: false,
  loading: () => <BloomFallback />,
});

export function BloomScene() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let timer = 0;

    function update() {
      window.clearTimeout(timer);
      if (desktop.matches) timer = window.setTimeout(() => setReady(true), 500);
      else setReady(false);
    }

    update();
    desktop.addEventListener("change", update);

    return () => {
      window.clearTimeout(timer);
      desktop.removeEventListener("change", update);
    };
  }, []);

  return ready ? <BloomCanvas /> : <BloomFallback />;
}
