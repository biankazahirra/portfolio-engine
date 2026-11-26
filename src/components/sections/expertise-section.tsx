import { PageContainer } from "../layout/page-container";
import { MotionItem } from "../shared/motion-item";
import { SectionHeading } from "../shared/section-heading";
import type { SectionFrameProps } from "@/types/section";

interface ExpertiseSectionProps extends SectionFrameProps {
  areas: string[];
}

export function ExpertiseSection({ index, label, heading, areas }: ExpertiseSectionProps) {
  return (
    <section id="expertise" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <ul className="expertise-grid">
          {areas.map((area, position) => (
            <MotionItem
              key={area}
              as="li"
              className="expertise-item"
              index={position}
            >
              <span className="expertise-index">{String(position + 1).padStart(2, "0")}</span>
              <span className="expertise-name">{area}</span>
            </MotionItem>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
