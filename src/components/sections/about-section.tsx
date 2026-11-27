import { PageContainer } from "../layout/page-container";
import { BloomIcon } from "../shared/bloom-icon";
import { SectionHeading } from "../shared/section-heading";
import type { Profile } from "@/types/profile";
import type { SectionFrameProps } from "@/types/section";

interface AboutSectionProps extends SectionFrameProps {
  profile: Profile;
}

export function AboutSection({ index, label, heading, profile }: AboutSectionProps) {
  return (
    <section id="about" className="section about-section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <div className="about-grid">
          <div className="about-aside">
            <BloomIcon className="about-bloom" />
            <p className="about-label">{profile.title}</p>
            {profile.location && <p className="metadata">{profile.location}</p>}
          </div>
          <div className="about-body">
            <p className="section-lead">{profile.about ?? profile.summary}</p>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
