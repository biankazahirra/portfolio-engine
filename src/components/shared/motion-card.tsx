import type { ReactNode } from "react";

type CardTag = "div" | "article" | "li";

interface MotionCardProps {
  as?: CardTag;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
}

export function MotionCard({ as: Tag = "div", className, children, tabIndex }: MotionCardProps) {
  return (
    <Tag className={className} data-motion-card="" tabIndex={tabIndex} style={{ transform: "translateY(16px)" }}>
      {children}
    </Tag>
  );
}
