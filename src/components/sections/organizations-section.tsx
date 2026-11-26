import { PageContainer } from "../layout/page-container";
import { MotionItem } from "../shared/motion-item";
import { SectionHeading } from "../shared/section-heading";
import type { Organization } from "@/types/organization";
import type { SectionFrameProps } from "@/types/section";

interface OrganizationsSectionProps extends SectionFrameProps {
  items: Organization[];
}

export function OrganizationsSection({ index, label, heading, items }: OrganizationsSectionProps) {
  return (
    <section id="organizations" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />
        {items.map((organization) => (
          <article key={organization.name} className="org-block">
            <h3 className="org-name">{organization.name}</h3>
            {organization.roles.map((role, index) => (
              <MotionItem key={role.title} className="org-role" index={index}>
                <h4 className="org-role-title">{role.title}</h4>
                <p className="metadata">{role.period}</p>
                <ul className="bullet-list">
                  {role.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </MotionItem>
            ))}
          </article>
        ))}
      </PageContainer>
    </section>
  );
}
