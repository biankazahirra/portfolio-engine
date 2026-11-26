import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  wide?: boolean;
}

export function PageContainer({ children, wide = false }: PageContainerProps) {
  return <div className={wide ? "container-wide" : "container-content"}>{children}</div>;
}
