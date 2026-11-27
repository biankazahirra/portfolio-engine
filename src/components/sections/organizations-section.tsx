import { PageContainer } from "../layout/page-container";
import { MotionCard } from "../shared/motion-card";
import { SectionHeading } from "../shared/section-heading";
import type { Organization } from "@/types/organization";
import type { SectionFrameProps } from "@/types/section";

interface OrganizationsSectionProps extends SectionFrameProps {
  items: Organization[];
  embedded?: boolean;
}

export function OrganizationsSection({
  index,
  label,
  heading,
  items,
  embedded = false,
}: OrganizationsSectionProps) {
  const content = items.map((organization) => (
    <article key={organization.name} className="org-block">
      <h4 className="org-name">{organization.name}</h4>
      {organization.roles.map((role) => (
        <MotionCard key={role.title} className="org-role">
          <h5 className="org-role-title">{role.title}</h5>
          <p className="metadata">{role.period}</p>
          <ul className="bullet-list">
            {role.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </MotionCard>
      ))}
    </article>
  ));

  if (embedded) {
    return (
      <div id="organizations" className="credential-block">
        <h3 className="credential-title">
          <span className="credential-index">{String(index).padStart(2, "0")}</span>
          {heading}
        </h3>
        {content}
      </div>
    );
  }

  return (
    <section id="organizations" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        {content}
      </PageContainer>
    </section>
  );
}
