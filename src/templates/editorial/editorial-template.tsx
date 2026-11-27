import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavigation } from "@/components/layout/site-navigation";
import { CardMotion } from "@/components/motion/card-motion";
import { FlowerMotion } from "@/components/motion/flower-motion";
import { TitleReveal } from "@/components/motion/title-reveal";
import { sectionLabels } from "@/config/sections.config";
import type { PortfolioConfig } from "@/types/portfolio";
import { renderSection } from "./section-registry";

export function EditorialTemplate({ config }: { config: PortfolioConfig }) {
  const enabledSections = config.sections.filter((section) => section.enabled);

  const navigationItems = enabledSections
    .filter((section) => section.id !== "hero")
    .map((section) => ({
      id: section.id,
      label: sectionLabels[section.id],
    }));

  const sectionNumbers = new Map<string, number>();
  let number = 0;
  for (const section of enabledSections) {
    if (section.id === "hero") continue;
    number += 1;
    sectionNumbers.set(section.id, number);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNavigation name={config.profile.name} items={navigationItems} />
      <TitleReveal />
      <CardMotion />
      <FlowerMotion />

      <main id="main">
        {enabledSections.map((section) => (
          <div key={section.id}>
            {renderSection(section.id, {
              config,
              index: sectionNumbers.get(section.id) ?? 0,
              label: sectionLabels[section.id],
              heading: section.heading ?? sectionLabels[section.id],
            })}
          </div>
        ))}
      </main>

      <SiteFooter name={config.profile.name} title={config.profile.title} />
    </>
  );
}
