"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageContainer } from "./page-container";

export interface NavigationItem {
  id: string;
  label: string;
}

interface SiteNavigationProps {
  name: string;
  items: NavigationItem[];
}

export function SiteNavigation({ name, items }: SiteNavigationProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <PageContainer wide>
        <div className="site-header-inner">
          <a className="site-brand" href="#main">
            {name}
          </a>

          <nav className="site-nav" aria-label="Primary">
            {items.map((item) => (
              <a key={item.id} className="site-nav-link" href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>

        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!open}>
          {items.map((item) => (
            <a
              key={item.id}
              className="mobile-menu-link"
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </PageContainer>
    </header>
  );
}
