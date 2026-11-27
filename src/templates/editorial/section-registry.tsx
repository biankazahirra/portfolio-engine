import type { ReactNode } from "react";
import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { HeroSection } from "@/components/sections/hero-section";
import { OrganizationsSection } from "@/components/sections/organizations-section";
import { sectionLabels } from "@/config/sections.config";
import type { PortfolioConfig } from "@/types/portfolio";
import type { SectionFrameProps, SectionId } from "@/types/section";

export interface SectionRenderProps extends SectionFrameProps {
  config: PortfolioConfig;
}

type SectionRenderer = (props: SectionRenderProps) => ReactNode;

export const sectionRegistry: Record<SectionId, SectionRenderer> = {
  hero: ({ config }) => {
    const hasExperience = config.sections.some(
      (section) => section.id === "experience" && section.enabled,
    );
    const target = hasExperience
      ? config.sections.find((section) => section.id === "experience")
      : config.sections.find((section) => section.enabled && section.id !== "hero");
    const label = hasExperience
      ? "View experience"
      : target
        ? `View ${sectionLabels[target.id].toLowerCase()}`
        : "Explore portfolio";

    const gpa = config.content.education.find((item) => item.gpa)?.gpa;
    const hasBrevet = config.content.certifications.some((item) => item.title === "Brevet AB");
    const metrics = [
      ...(gpa ? [{ label: "GPA", value: gpa }] : []),
      { label: "Experience roles", value: String(config.content.experience.length) },
      ...(hasBrevet ? [{ label: "Certification", value: "Brevet AB" }] : []),
    ];

    return (
      <HeroSection
        profile={config.profile}
        primaryCtaHref={target ? `#${target.id}` : "#main"}
        primaryCtaLabel={label}
        metrics={metrics}
      />
    );
  },
  about: ({ config, ...frame }) => <AboutSection {...frame} profile={config.profile} />,
  experience: ({ config, ...frame }) => (
    <ExperienceSection {...frame} items={config.content.experience} />
  ),
  expertise: ({ config, ...frame }) => (
    <ExpertiseSection {...frame} areas={config.content.expertise.areas} />
  ),
  education: ({ config, ...frame }) => (
    <EducationSection {...frame} items={config.content.education} />
  ),
  organizations: ({ config, ...frame }) => (
    <OrganizationsSection {...frame} items={config.content.organizations} />
  ),
  certifications: ({ config, ...frame }) => (
    <CertificationsSection {...frame} items={config.content.certifications} />
  ),
  credentials: ({ config, ...frame }) => (
    <CredentialsSection
      {...frame}
      education={config.content.education}
      organizations={config.content.organizations}
      certifications={config.content.certifications}
    />
  ),
  contact: ({ config, ...frame }) => <ContactSection {...frame} profile={config.profile} />,
};

export function renderSection(id: SectionId, props: SectionRenderProps): ReactNode {
  const renderer = sectionRegistry[id];
  return renderer ? renderer(props) : null;
}
