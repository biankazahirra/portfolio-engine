import type { ReactNode } from "react";

export function Metadata({ children }: { children: ReactNode }) {
  return <span className="metadata">{children}</span>;
}
