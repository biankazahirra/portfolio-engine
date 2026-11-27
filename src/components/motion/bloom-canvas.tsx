"use client";

import { useEffect, useRef, useState } from "react";
import { BloomFallback } from "./bloom-fallback";

const PETAL = 0xe98fa6;
const PETAL_LIGHT = 0xf3b7c6;
const PETAL_SOFT = 0xf8cdd6;
const LEAF = 0x4f7a5a;
const CENTER = 0xf2c14e;

interface Ring {
  count: number;
  radius: number;
  scale: number;
  tilt: number;
  z: number;
  color: number;
  offset: number;
}

const RINGS: Ring[] = [
  { count: 5, radius: 1.55, scale: 0.95, tilt: 1.1, z: -0.35, color: LEAF, offset: 0.15 },
  { count: 9, radius: 1.48, scale: 0.95, tilt: 0.55, z: -0.05, color: PETAL, offset: 0 },
  { count: 8, radius: 1.15, scale: 0.78, tilt: 0.42, z: 0.14, color: PETAL_LIGHT, offset: 0.22 },
  { count: 7, radius: 0.85, scale: 0.6, tilt: 0.3, z: 0.28, color: PETAL_SOFT, offset: 0.45 },
];

export default function BloomCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    const mount = mountElement;
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) {
      setFailed(true);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const THREE = await import("three");
        const { default: gsap } = await import("gsap");
        if (disposed) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0, 10);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.className = "bloom-webgl";
        mount.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.78));
        const key = new THREE.DirectionalLight(0xffffff, 1.85);
        key.position.set(3, 4, 6);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffe9d6, 0.38);
        fill.position.set(-4, -2, 3);
        scene.add(fill);

        const flower = new THREE.Group();
        flower.scale.setScalar(0.82);
        flower.rotation.set(0.12, 0, -0.14);
        scene.add(flower);

        const geometry = new THREE.SphereGeometry(1, 24, 16);
        const materials = new Map<number, import("three").MeshStandardMaterial>();
        const petals: import("three").Mesh[] = [];

        function material(color: number) {
          const existing = materials.get(color);
          if (existing) return existing;
          const created = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.68,
            metalness: 0,
          });
          materials.set(color, created);
          return created;
        }

        RINGS.forEach((ring) => {
          for (let index = 0; index < ring.count; index += 1) {
            const pivot = new THREE.Group();
            pivot.rotation.z = (index / ring.count) * Math.PI * 2 + ring.offset;

            const petal = new THREE.Mesh(geometry, material(ring.color));
            petal.position.set(ring.radius, 0, ring.z);
            petal.rotation.x = ring.tilt;
            petal.scale.set(ring.scale * 1.05, ring.scale * 0.42, ring.scale * 0.16);
            petal.userData.base = petal.scale.clone();
            petal.scale.set(0.001, 0.001, 0.001);

            pivot.add(petal);
            flower.add(pivot);
            petals.push(petal);
          }
        });

        const center = new THREE.Mesh(
          new THREE.SphereGeometry(0.4, 32, 24),
          material(CENTER),
        );
        center.position.z = 0.58;
        center.scale.set(1, 1, 0.78);
        center.userData.base = center.scale.clone();
        center.scale.set(0.001, 0.001, 0.001);
        flower.add(center);

        const stamenGeometry = new THREE.SphereGeometry(0.055, 12, 8);
        const stamens: import("three").Mesh[] = [];
        for (let index = 0; index < 10; index += 1) {
          const angle = (index / 10) * Math.PI * 2;
          const stamen = new THREE.Mesh(stamenGeometry, material(0xd8a32e));
          stamen.position.set(Math.cos(angle) * 0.26, Math.sin(angle) * 0.26, 0.88);
          stamen.userData.base = stamen.scale.clone();
          stamen.scale.set(0.001, 0.001, 0.001);
          flower.add(stamen);
          stamens.push(stamen);
        }

        const all = [...petals, center, ...stamens];

        if (reduced) {
          all.forEach((mesh) => {
            const base = mesh.userData.base as import("three").Vector3;
            mesh.scale.copy(base);
          });
        } else {
          all.forEach((mesh, index) => {
            const base = mesh.userData.base as import("three").Vector3;
            gsap.to(mesh.scale, {
              x: base.x,
              y: base.y,
              z: base.z,
              duration: 0.9,
              delay: 0.1 + index * 0.035,
              ease: "back.out(1.8)",
            });
          });
        }

        const pointer = { x: 0, y: 0 };
        function onPointer(event: PointerEvent) {
          if (reduced) return;
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
        }

        function resize() {
          const rect = mount.getBoundingClientRect();
          const width = Math.max(rect.width, 1);
          const height = Math.max(rect.height, 1);
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          if (reduced) renderer.render(scene, camera);
        }

        const clock = new THREE.Clock();
        let frame = 0;
        let visible = true;

        function tick() {
          const time = clock.getElapsedTime();
          flower.position.y = Math.sin(time * 0.9) * 0.06;
          flower.rotation.z = -0.14 + Math.sin(time * 0.5) * 0.03;
          flower.rotation.y += (pointer.x * 0.42 - flower.rotation.y) * 0.06;
          flower.rotation.x += (pointer.y * 0.22 - flower.rotation.x) * 0.06;
          renderer.render(scene, camera);
          frame = window.requestAnimationFrame(tick);
        }

        function start() {
          if (reduced || frame) return;
          frame = window.requestAnimationFrame(tick);
        }

        function stop() {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }

        function onVisibility() {
          if (document.hidden || !visible) stop();
          else start();
        }

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);

        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible && !document.hidden) start();
          else stop();
        });
        intersection.observe(mount);

        window.addEventListener("pointermove", onPointer, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);

        resize();
        if (reduced) renderer.render(scene, camera);
        else start();

        cleanup = () => {
          stop();
          resizeObserver.disconnect();
          intersection.disconnect();
          window.removeEventListener("pointermove", onPointer);
          document.removeEventListener("visibilitychange", onVisibility);
          geometry.dispose();
          stamenGeometry.dispose();
          materials.forEach((entry) => entry.dispose());
          center.geometry.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        if (!disposed) setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  if (failed) return <BloomFallback />;

  return <div ref={mountRef} className="bloom-canvas" aria-hidden="true" />;
}
