import { PageContainer } from "../layout/page-container";
import { BloomIcon } from "../shared/bloom-icon";
import { MotionCard } from "../shared/motion-card";
import { SectionHeading } from "../shared/section-heading";
import type { ExpertiseArea } from "@/types/expertise";
import type { SectionFrameProps } from "@/types/section";

interface ExpertiseSectionProps extends SectionFrameProps {
  areas: ExpertiseArea[];
}

export function ExpertiseSection({ index, label, heading, areas }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <ul className="expertise-grid">
          {areas.map((area, position) => (
            <MotionCard key={area.name} as="li" className="expertise-card">
              <span className="expertise-card-top">
                <span className="expertise-index">{String(position + 1).padStart(2, "0")}</span>
                <BloomIcon className="expertise-bloom" />
              </span>
              <span className="expertise-name">{area.name}</span>
              <span className="expertise-evidence">{area.evidence}</span>
            </MotionCard>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
