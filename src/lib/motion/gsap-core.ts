type Core = {
  gsap: typeof import("gsap").default;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let pending: Promise<Core> | null = null;

export function getGsap(): Promise<Core> {
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([module, plugin]) => {
      const gsap = module.default;
      const ScrollTrigger = plugin.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return { gsap, ScrollTrigger };
    });
  }
  return pending;
}
