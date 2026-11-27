import { PageContainer } from "../layout/page-container";
import { BloomIcon } from "../shared/bloom-icon";
import { MotionCard } from "../shared/motion-card";
import { SectionHeading } from "../shared/section-heading";
import type { Certification } from "@/types/certification";
import type { SectionFrameProps } from "@/types/section";

interface CertificationsSectionProps extends SectionFrameProps {
  items: Certification[];
  embedded?: boolean;
}

export function CertificationsSection({
  index,
  label,
  heading,
  items,
  embedded = false,
}: CertificationsSectionProps) {
  const content = (
    <ul className="cert-list">
      {items.map((item) => (
        <MotionCard
          key={`${item.issuer}-${item.title}`}
          as="li"
          className="cert-card"
          tabIndex={0}
        >
          <span className="cert-bloom">
            <BloomIcon />
          </span>
          <span className="cert-copy">
            <span className="cert-issuer">{item.issuer}</span>
            <span className="cert-title">{item.title}</span>
          </span>
          <span className="cert-year">{item.year}</span>
        </MotionCard>
      ))}
    </ul>
  );

  if (embedded) {
    return (
      <div id="certifications" className="credential-block">
        <h3 className="credential-title">
          <span className="credential-index">{String(index).padStart(2, "0")}</span>
          {heading}
        </h3>
        {content}
      </div>
    );
  }

  return (
    <section id="certifications" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        {content}
      </PageContainer>
    </section>
  );
}
