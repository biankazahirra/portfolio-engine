"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../shared/theme-toggle";
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
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (hero) sections.push(hero);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible[0]) return;
        setActive(visible[0].target.id === "hero" ? "" : visible[0].target.id);
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="site-header">
      <PageContainer wide>
        <div className="site-header-inner">
          <a className="site-brand" href="#main">
            {name}
          </a>

          <div className="nav-cluster">
            <nav className="site-nav" aria-label="Primary">
              {items.map((item) => (
                <a
                  key={item.id}
                  className="site-nav-link"
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "location" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <ThemeToggle />

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
        </div>

        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!open}>
          {items.map((item) => (
            <a
              key={item.id}
              className="mobile-menu-link"
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
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
