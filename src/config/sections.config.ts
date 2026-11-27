import type { SectionConfig, SectionId } from "@/types/section";

export const sectionLabels: Record<SectionId, string> = {
  hero: "Introduction",
  about: "About",
  experience: "Experience",
  expertise: "Expertise",
  education: "Education",
  organizations: "Organizations",
  certifications: "Certifications",
  credentials: "Credentials",
  contact: "Contact",
};

export const sections: SectionConfig[] = [
  { id: "hero", enabled: true },
  { id: "about", enabled: true, heading: "About" },
  { id: "experience", enabled: true, heading: "Experience" },
  { id: "expertise", enabled: true, heading: "Areas of Experience" },
  { id: "credentials", enabled: true, heading: "Credentials" },
  { id: "contact", enabled: true, heading: "Contact" },
];
