import type { SectionConfig, SectionId } from "@/types/section";

export const sectionLabels: Record<SectionId, string> = {
  hero: "Introduction",
  about: "About",
  experience: "Experience",
  expertise: "Expertise",
  education: "Education",
  organizations: "Organizations",
  certifications: "Certifications",
  contact: "Contact",
};

export const sections: SectionConfig[] = [
  { id: "hero", enabled: true },
  { id: "about", enabled: true, heading: "Professional Summary" },
  { id: "experience", enabled: true, heading: "Professional Experience" },
  { id: "expertise", enabled: true, heading: "Areas of Experience" },
  { id: "education", enabled: true, heading: "Education" },
  { id: "organizations", enabled: true, heading: "Organizational Experience" },
  { id: "certifications", enabled: true, heading: "Certifications & Learning" },
  { id: "contact", enabled: true, heading: "Contact" },
];
