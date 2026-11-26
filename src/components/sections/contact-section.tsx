import { PageContainer } from "../layout/page-container";
import { SectionHeading } from "../shared/section-heading";
import type { Profile } from "@/types/profile";
import type { SectionFrameProps } from "@/types/section";

interface ContactSectionProps extends SectionFrameProps {
  profile: Profile;
}

export function ContactSection({ index, label, heading, profile }: ContactSectionProps) {
  return (
    <section id="contact" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-links">
          {profile.linkedin && <a className="metadata" href={profile.linkedin}>LinkedIn</a>}
          {profile.portfolioReference && (
            <a className="metadata" href={profile.portfolioReference}>
              Existing portfolio
            </a>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
