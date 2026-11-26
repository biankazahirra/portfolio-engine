"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type MotionTag = "div" | "article" | "li";

const motionTags = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
};

interface MotionItemProps {
  as?: MotionTag;
  className?: string;
  children: ReactNode;
  index?: number;
}

export function MotionItem({ as = "div", className, children, index = 0 }: MotionItemProps) {
  const reduced = useReducedMotion();
  const Component = motionTags[as] as typeof motion.div;

  return (
    <Component
      className={className}
      initial={reduced ? false : { y: 16 }}
      whileInView={reduced ? undefined : { y: 0 }}
      whileHover={reduced ? undefined : { y: -3 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: reduced ? 0 : Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1] as const,
      }}
    >
      {children}
    </Component>
  );
}
