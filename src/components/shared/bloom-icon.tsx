import type { CSSProperties } from "react";

interface BloomIconProps {
  className?: string;
}

const petals = [0, 1, 2, 3, 4, 5];

export function BloomIcon({ className }: BloomIconProps) {
  return (
    <span className={className ? `bloom-icon ${className}` : "bloom-icon"} aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal}
          className="bloom-petal"
          style={{ "--petal": petal } as CSSProperties}
        />
      ))}
      <span className="bloom-center" />
    </span>
  );
}
