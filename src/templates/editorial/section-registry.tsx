import type { ReactNode } from "react";
import { StorySection } from "@/components/story/story-section";
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
    const target =
      config.sections.find((section) => section.id === "story" && section.enabled) ??
      config.sections.find((section) => section.id === "experience" && section.enabled) ??
      config.sections.find((section) => section.enabled && section.id !== "hero");
    const label =
      target?.id === "story" || target?.id === "experience"
        ? "View experience"
        : target
          ? `View ${sectionLabels[target.id].toLowerCase()}`
          : "Explore portfolio";

    const gpa = config.content.education.find((item) => item.gpa)?.gpa;
    const hasBrevet = config.content.certifications.some((item) => item.title === "Brevet AB");
    const keyRoles = config.content.experience.filter((item) =>
      /intern|assistant/i.test(item.position),
    ).length;
    const metrics = [
      ...(gpa ? [{ label: "GPA", value: gpa }] : []),
      { label: "Key roles", value: String(keyRoles) },
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
  story: ({ config, ...frame }) => (
    <StorySection {...frame} chapters={config.content.chapters} />
  ),
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
