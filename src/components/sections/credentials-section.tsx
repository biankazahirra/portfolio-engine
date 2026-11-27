import { PageContainer } from "../layout/page-container";
import { SectionHeading } from "../shared/section-heading";
import { CertificationsSection } from "./certifications-section";
import { EducationSection } from "./education-section";
import { OrganizationsSection } from "./organizations-section";
import type { Certification } from "@/types/certification";
import type { Education } from "@/types/education";
import type { Organization } from "@/types/organization";
import type { SectionFrameProps } from "@/types/section";

interface CredentialsSectionProps extends SectionFrameProps {
  education: Education[];
  organizations: Organization[];
  certifications: Certification[];
}

export function CredentialsSection({
  index,
  label,
  heading,
  education,
  organizations,
  certifications,
}: CredentialsSectionProps) {
  return (
    <section id="credentials" className="section">
      <PageContainer>
        <SectionHeading index={index} label={label} title={heading} />

        <EducationSection
          embedded
          index={1}
          label="Education"
          heading="Education"
          items={education}
        />

        <OrganizationsSection
          embedded
          index={2}
          label="Organizations"
          heading="Organizations"
          items={organizations}
        />

        <CertificationsSection
          embedded
          index={3}
          label="Certifications"
          heading="Certifications & Learning"
          items={certifications}
        />
      </PageContainer>
    </section>
  );
}
