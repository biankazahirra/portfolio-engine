import { PageContainer } from "../layout/page-container";
import { Metadata } from "../shared/metadata";
import { MotionItem } from "../shared/motion-item";
import { SectionHeading } from "../shared/section-heading";
import type { Education } from "@/types/education";
import type { SectionFrameProps } from "@/types/section";

interface EducationSectionProps extends SectionFrameProps {
  items: Education[];
}

export function EducationSection({ index, label, heading, items }: EducationSectionProps) {
  return (
    <section id="education" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        {items.map((item, index) => (
          <MotionItem
            key={item.institution}
            as="article"
            className="education-block"
            index={index}
          >
            <h3 className="education-degree">{item.degree}</h3>
            <div className="education-meta">
              <Metadata>{item.institution}</Metadata>
              <Metadata>{item.period}</Metadata>
              {item.location && <Metadata>{item.location}</Metadata>}
              {item.gpa && <Metadata>GPA {item.gpa}</Metadata>}
            </div>
          </MotionItem>
        ))}
      </PageContainer>
    </section>
  );
}
