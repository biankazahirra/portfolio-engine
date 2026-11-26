export interface OrganizationRole {
  title: string;
  period: string;
  highlights: string[];
}

export interface Organization {
  name: string;
  roles: OrganizationRole[];
}
