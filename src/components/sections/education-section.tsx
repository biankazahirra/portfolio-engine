import { PageContainer } from "../layout/page-container";
import { Metadata } from "../shared/metadata";
import { MotionCard } from "../shared/motion-card";
import { SectionHeading } from "../shared/section-heading";
import type { Education } from "@/types/education";
import type { SectionFrameProps } from "@/types/section";

interface EducationSectionProps extends SectionFrameProps {
  items: Education[];
  embedded?: boolean;
}

export function EducationSection({
  index,
  label,
  heading,
  items,
  embedded = false,
}: EducationSectionProps) {
  const content = items.map((item) => (
    <MotionCard key={item.institution} as="article" className="education-block">
      <h3 className="education-degree">{item.degree}</h3>
      <div className="education-meta">
        <Metadata>{item.institution}</Metadata>
        <Metadata>{item.period}</Metadata>
        {item.location && <Metadata>{item.location}</Metadata>}
        {item.gpa && <Metadata>GPA {item.gpa}</Metadata>}
      </div>
    </MotionCard>
  ));

  if (embedded) {
    return (
      <div id="education" className="credential-block">
        <h3 className="credential-title">
          <span className="credential-index">{String(index).padStart(2, "0")}</span>
          {heading}
        </h3>
        {content}
      </div>
    );
  }

  return (
    <section id="education" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        {content}
      </PageContainer>
    </section>
  );
}
