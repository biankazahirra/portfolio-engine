import type { SectionConfig, SectionId } from "@/types/section";

export const sectionLabels: Record<SectionId, string> = {
  hero: "Introduction",
  about: "About",
  experience: "Experience",
  story: "Experience",
  expertise: "Expertise",
  education: "Education",
  organizations: "Organizations",
  certifications: "Certifications",
  credentials: "Credentials",
  contact: "Contact",
};

export const sections: SectionConfig[] = [
  { id: "hero", enabled: true },
  { id: "story", enabled: true, heading: "The Accounting Cycle" },
  { id: "credentials", enabled: true, heading: "Credentials" },
  { id: "contact", enabled: true, heading: "Contact" },
];
