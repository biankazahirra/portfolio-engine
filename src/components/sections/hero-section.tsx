import Image from "next/image";
import { PageContainer } from "../layout/page-container";
import { BloomScene } from "../motion/bloom-scene";
import { PetalCanvas } from "../motion/petal-canvas";
import { AnimatedTitle } from "../shared/animated-title";
import { Button } from "../shared/button";
import type { Profile } from "@/types/profile";

export interface HeroMetric {
  label: string;
  value: string;
}

interface HeroSectionProps {
  profile: Profile;
  primaryCtaHref: string;
  primaryCtaLabel: string;
  metrics: HeroMetric[];
}

export function HeroSection({
  profile,
  primaryCtaHref,
  primaryCtaLabel,
  metrics,
}: HeroSectionProps) {
  const cvHref =
    profile.cvFile ??
    `mailto:${profile.email}?subject=${encodeURIComponent("CV request — Fidela Andina")}`;

  return (
    <section id="hero" className="hero">
      <PetalCanvas />

      <PageContainer wide>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{profile.title}</p>
            <AnimatedTitle as="h1" text={profile.name} className="hero-title" />
            {profile.headline && <p className="hero-tagline">{profile.headline}</p>}
            {profile.summary && <p className="hero-summary">{profile.summary}</p>}

            <div className="hero-actions">
              <Button href={primaryCtaHref}>{primaryCtaLabel}</Button>
              <Button href={cvHref} variant="secondary">
                {profile.cvFile ? "Download CV" : "Request CV"}
              </Button>
            </div>

            <dl className="hero-metrics">
              {metrics.map((metric) => (
                <div key={metric.label} className="hero-metric">
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-visual">
            <div className="hero-bloom">
              <BloomScene />
            </div>
            <div className="portrait-frame">
              {profile.portrait ? (
                <Image
                  src={profile.portrait}
                  alt={profile.portraitAlt ?? profile.name}
                  fill
                  sizes="(min-width: 900px) 34vw, 100vw"
                  priority
                />
              ) : (
                <p className="portrait-placeholder">Portrait pending approval</p>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
