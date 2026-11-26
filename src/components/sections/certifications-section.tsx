import { PageContainer } from "../layout/page-container";
import { SectionHeading } from "../shared/section-heading";
import type { Certification } from "@/types/certification";
import type { SectionFrameProps } from "@/types/section";

interface CertificationsSectionProps extends SectionFrameProps {
  items: Certification[];
}

export function CertificationsSection({ index, label, heading, items }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <div className="cert-list">
          {items.map((item) => (
            <div key={`${item.issuer}-${item.title}`} className="cert-row">
              <div>
                <p className="cert-issuer">{item.issuer}</p>
                <p>{item.title}</p>
              </div>
              <span className="cert-year">{item.year}</span>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
