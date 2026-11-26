export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "expertise"
  | "education"
  | "organizations"
  | "certifications"
  | "contact";

export interface SectionConfig {
  id: SectionId;
  enabled: boolean;
  heading?: string;
}

export interface SectionFrameProps {
  index: number;
  label: string;
  heading: string;
}
