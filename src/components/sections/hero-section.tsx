import Image from "next/image";
import { PageContainer } from "../layout/page-container";
import { Button } from "../shared/button";
import { AnimatedTitle } from "../shared/animated-title";
import { Metadata } from "../shared/metadata";
import type { Profile } from "@/types/profile";

interface HeroSectionProps {
  profile: Profile;
  primaryCtaHref: string;
  primaryCtaLabel: string;
}

export function HeroSection({ profile, primaryCtaHref, primaryCtaLabel }: HeroSectionProps) {
  return (
    <section id="hero" className="hero">
      <PageContainer wide>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{profile.title}</p>
            <AnimatedTitle
              text={profile.headline ?? profile.title}
              as="h1"
              className="hero-title"
            />
            {profile.summary && <p className="hero-summary">{profile.summary}</p>}
            <div className="hero-actions">
              <Button href={primaryCtaHref}>{primaryCtaLabel}</Button>
              {profile.cvFile && (
                <Button href={profile.cvFile} variant="secondary">
                  Download CV
                </Button>
              )}
            </div>
          </div>

          <div className="portrait-frame">
            {profile.portrait ? (
              <Image
                src={profile.portrait}
                alt={profile.portraitAlt ?? profile.name}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            ) : (
              <p className="portrait-placeholder">Portrait pending approval</p>
            )}
          </div>
        </div>

        <div className="hero-meta">
          <Metadata>{profile.title}</Metadata>
          {profile.location && <Metadata>{profile.location}</Metadata>}
        </div>
      </PageContainer>
    </section>
  );
}
