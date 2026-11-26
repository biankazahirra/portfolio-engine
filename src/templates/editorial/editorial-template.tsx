import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavigation } from "@/components/layout/site-navigation";
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

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteNavigation name={config.profile.name} items={navigationItems} />

      <main id="main">
        {enabledSections.map((section, position) => (
          <div key={section.id}>
            {renderSection(section.id, {
              config,
              index: position + 1,
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
