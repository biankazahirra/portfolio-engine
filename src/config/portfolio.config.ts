import { sections } from "./sections.config";
import { siteConfig } from "./site.config";
import { certifications } from "@/content/fidela/certifications";
import { education } from "@/content/fidela/education";
import { experience } from "@/content/fidela/experience";
import { organizations } from "@/content/fidela/organizations";
import { profile } from "@/content/fidela/profile";
import { expertise } from "@/content/fidela/skills";
import type { PortfolioConfig } from "@/types/portfolio";
import { activeTheme } from "@/themes/accounting-editorial/theme";

export const portfolioConfig: PortfolioConfig = {
  id: "fidela-andina",
  template: "editorial",
  theme: activeTheme,
  site: siteConfig,
  profile,
  sections,
  content: {
    experience,
    education,
    expertise,
    organizations,
    certifications,
  },
};
