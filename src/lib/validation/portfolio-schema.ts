import { z } from "zod";
import type { PortfolioConfig } from "@/types/portfolio";

function strictObject<T extends z.ZodRawShape>(shape: T) {
  return z.object(shape).strict();
}

const profileSchema = strictObject({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  email: z.email(),
  linkedin: z.url().optional(),
  portfolioReference: z.url().optional(),
  headline: z.string().optional(),
  summary: z.string().optional(),
  about: z.string().optional(),
  portrait: z.string().optional(),
  portraitAlt: z.string().optional(),
  cvFile: z.string().optional(),
});

const experienceSchema = strictObject({
  organization: z.string().min(1),
  position: z.string().min(1),
  location: z.string().optional(),
  period: z.string().min(1),
  summary: z.string().min(1),
  responsibilities: z.array(z.string().min(1)),
});

const educationSchema = strictObject({
  institution: z.string().min(1),
  location: z.string().optional(),
  degree: z.string().min(1),
  period: z.string().min(1),
  gpa: z.string().optional(),
});

const expertiseSchema = strictObject({
  areas: z.array(
    strictObject({
      name: z.string().min(1),
      evidence: z.string().min(1),
    }),
  ),
});

const certificationSchema = strictObject({
  issuer: z.string().min(1),
  title: z.string().min(1),
  year: z.number().int(),
});

const organizationSchema = strictObject({
  name: z.string().min(1),
  roles: z.array(
    strictObject({
      title: z.string().min(1),
      period: z.string().min(1),
      highlights: z.array(z.string().min(1)),
    }),
  ),
});

const sectionSchema = strictObject({
  id: z.enum([
    "hero",
    "about",
    "experience",
    "expertise",
    "education",
    "organizations",
    "certifications",
    "credentials",
    "contact",
  ]),
  enabled: z.boolean(),
  heading: z.string().optional(),
});

export const portfolioSchema = strictObject({
  id: z.string().min(1),
  template: z.literal("editorial"),
  theme: z.literal("accounting-editorial"),
  site: strictObject({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  profile: profileSchema,
  sections: z.array(sectionSchema),
  content: strictObject({
    experience: z.array(experienceSchema),
    education: z.array(educationSchema),
    expertise: expertiseSchema,
    organizations: z.array(organizationSchema),
    certifications: z.array(certificationSchema),
  }),
})
  .refine(
    (config) => new Set(config.sections.map((section) => section.id)).size === config.sections.length,
    { message: "Section ids must be unique", path: ["sections"] },
  )
  .refine((config) => config.sections.some((section) => section.enabled), {
    message: "At least one section must be enabled",
    path: ["sections"],
  });

export function parsePortfolioConfig(input: unknown): PortfolioConfig {
  const result = portfolioSchema.safeParse(input);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid portfolio configuration:\n${details}`);
  }

  return result.data;
}
