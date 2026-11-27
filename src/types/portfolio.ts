import type { Certification } from "./certification";
import type { Chapter } from "./chapter";
import type { Education } from "./education";
import type { Expertise } from "./expertise";
import type { Experience } from "./experience";
import type { Organization } from "./organization";
import type { Profile } from "./profile";
import type { SectionConfig } from "./section";

export interface PortfolioConfig {
  id: string;
  template: "editorial";
  theme: "accounting-editorial";
  site: {
    title: string;
    description: string;
  };
  profile: Profile;
  sections: SectionConfig[];
  content: {
    experience: Experience[];
    chapters: Chapter[];
    education: Education[];
    expertise: Expertise;
    organizations: Organization[];
    certifications: Certification[];
  };
}
