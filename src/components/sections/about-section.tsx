import { PageContainer } from "../layout/page-container";
import { SectionHeading } from "../shared/section-heading";
import type { Profile } from "@/types/profile";
import type { SectionFrameProps } from "@/types/section";

interface AboutSectionProps extends SectionFrameProps {
  profile: Profile;
}

export function AboutSection({ index, label, heading, profile }: AboutSectionProps) {
  return (
    <section id="about" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <div className="about-grid">
          <p className="about-label">{profile.title}</p>
          <div className="about-body">
            {profile.summary && <p className="section-lead">{profile.summary}</p>}
            {profile.location && <p className="metadata">{profile.location}</p>}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
