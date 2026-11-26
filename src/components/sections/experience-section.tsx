import { PageContainer } from "../layout/page-container";
import { SectionHeading } from "../shared/section-heading";
import type { Experience } from "@/types/experience";
import type { SectionFrameProps } from "@/types/section";

interface ExperienceSectionProps extends SectionFrameProps {
  items: Experience[];
}

export function ExperienceSection({ index, label, heading, items }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        <div className="timeline">
          {items.map((item) => (
            <article key={`${item.organization}-${item.period}`} className="timeline-item">
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-content">
                <h3 className="timeline-role">{item.position}</h3>
                <p className="timeline-org">{item.organization}</p>
                {item.location && <p className="metadata">{item.location}</p>}
                <ul className="bullet-list">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
