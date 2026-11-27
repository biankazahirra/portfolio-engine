export type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "story"
  | "expertise"
  | "education"
  | "organizations"
  | "certifications"
  | "credentials"
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
