import { GrowingVine } from "../motion/growing-vine";
import { VineFlower } from "../motion/vine-flower";
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
        <div className="journal">
          <GrowingVine />
          {items.map((item) => (
            <details
              key={`${item.organization}-${item.period}`}
              className="journal-item"
            >
              <summary className="journal-summary">
                <span className="journal-flower">
                  <VineFlower />
                </span>
                <span className="journal-period">{item.period}</span>
                <span className="journal-main">
                  <span className="journal-role">{item.position}</span>
                  <span className="journal-org">
                    {item.organization}
                    {item.location ? ` · ${item.location}` : ""}
                  </span>
                  <span className="journal-summary-line">{item.summary}</span>
                </span>
                <span className="journal-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="journal-body">
                <ul className="bullet-list">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
