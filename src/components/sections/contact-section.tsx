import { PageContainer } from "../layout/page-container";
import { AnimatedTitle } from "../shared/animated-title";
import { Button } from "../shared/button";
import type { Profile } from "@/types/profile";
import type { SectionFrameProps } from "@/types/section";

interface ContactSectionProps extends SectionFrameProps {
  profile: Profile;
}

export function ContactSection({ index, label, profile }: ContactSectionProps) {
  const cvHref =
    profile.cvFile ??
    `mailto:${profile.email}?subject=${encodeURIComponent("CV request — Fidela Andina")}`;

  return (
    <section id="contact" className="section contact-section">
      <PageContainer>
        <p className="eyebrow contact-eyebrow">
          {String(index).padStart(2, "0")} / {label}
        </p>
        <AnimatedTitle
          text="Let's close the books."
          as="h2"
          className="contact-title"
        />
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-links">
          {profile.linkedin && (
            <a className="contact-link" href={profile.linkedin}>
              LinkedIn
            </a>
          )}
          {profile.portfolioReference && (
            <a className="contact-link" href={profile.portfolioReference}>
              Previous portfolio
            </a>
          )}
        </div>
        <div className="contact-actions">
          <Button href={cvHref} variant="secondary">
            {profile.cvFile ? "Download CV" : "Request CV"}
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
