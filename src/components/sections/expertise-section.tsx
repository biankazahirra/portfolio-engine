import { PageContainer } from "../layout/page-container";
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
            <li key={area} className="expertise-item">
              <span className="expertise-index">{String(position + 1).padStart(2, "0")}</span>
              <span className="expertise-name">{area}</span>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
