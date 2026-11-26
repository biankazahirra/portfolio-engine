import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ href, children, variant = "primary" }: ButtonProps) {
  return (
    <a className={`button button-${variant}`} href={href}>
      {children}
    </a>
  );
}
