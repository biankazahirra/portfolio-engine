# Portfolio Engine --- Architecture & AI Agent Master Instructions

**Project type:** Reusable Portfolio Engine\
**Architecture:** Data-Driven Modular Portfolio Engine\
**Initial pilot:** Fidela Andina --- Accounting & Finance Portfolio\
**Document version:** 1.0\
**Status:** Initial project specification

------------------------------------------------------------------------

# 1. Project Vision

Build a reusable portfolio website engine that can generate individual
professional portfolio websites from structured content and approved
design configurations.

The engine must support different professions without requiring the core
application to be rewritten for each person.

Core principle:

> **Build once, configure many times.**

This project is a reusable website foundation, not a portfolio-builder
SaaS platform.

## 1.1 Primary goals

-   Build one stable, reusable portfolio codebase.
-   Separate personal content from UI components.
-   Separate themes from page structure.
-   Make sections modular and configurable.
-   Support different professional backgrounds.
-   Allow each portfolio to be deployed independently.
-   Keep implementation understandable and maintainable.
-   Use Fidela Andina's portfolio as the first real-world pilot.

## 1.2 Explicit non-goals for version 1

Do not build these unless the owner explicitly approves a scope change:

-   SaaS portfolio builder.
-   User authentication or accounts.
-   Admin dashboard or visual page editor.
-   CV parsing or automatic CV-to-website generation.
-   Database or backend API.
-   Multi-tenant infrastructure.
-   Payment, subscription, or billing system.
-   Automated deployment orchestration.
-   CMS integration.
-   Plugin marketplace.
-   Multiple portfolio templates at launch.
-   Unrequested animations, 3D scenes, or experimental interactions.

The first version is a reusable codebase that developers or AI agents
can configure for a new person.

------------------------------------------------------------------------

# 2. Architecture Recommendation

Use a **Data-Driven Modular Portfolio Engine**.

The architecture has five main layers:

1.  Content Layer
2.  Theme Layer
3.  Template Layer
4.  Component Layer
5.  Application / Rendering Layer

## 2.1 High-level architecture

``` text
Individual Portfolio Configuration
              |
              v
       Content Layer
              |
              v
       Theme Configuration
              |
              v
       Template / Page Composition
              |
              v
       Reusable Section Components
              |
              v
       Portfolio Website
              |
              v
       Independent Deployment
```

## 2.2 Content Layer

All person-specific information must live outside reusable UI
components.

Recommended content entities:

-   Profile
-   Professional summary
-   Experience
-   Education
-   Skills / expertise
-   Certifications
-   Organizations
-   Projects
-   Contact information
-   Navigation configuration
-   Section visibility and ordering

Components must receive content through typed props or a validated
configuration object.

**Never hardcode Fidela's name, work history, education, contact
details, or profession-specific content inside shared components.**

## 2.3 Theme Layer

Themes control visual identity without changing the underlying content.

Theme tokens should include:

-   Color palette
-   Typography
-   Font weights
-   Spacing scale
-   Border radius
-   Shadows
-   Container widths
-   Section spacing
-   Background and surface styles
-   Motion preferences

Initial theme:

**Accounting Editorial** - Warm Ivory: `#F5F1E8` - Forest Green:
`#183C32` - Muted Gold: `#B59A64` - Charcoal: `#292A28` - Soft Gray:
`#E5E1D8` - White: `#FFFFFF`

Typography: - Headings: Fraunces - Body: DM Sans - Numerical
metadata: IBM Plex Mono

The initial theme is a pilot theme, not a permanent limitation of the
engine.

## 2.4 Template Layer

A template controls page composition, section placement, and layout
behavior.

For version 1, implement only:

**Editorial Template**

The template should define: - Navigation placement - Hero composition -
Section order - Content width - Grid behavior - Experience
presentation - Footer composition - Responsive behavior

Do not create additional templates until the first template is complete,
validated, and approved.

## 2.5 Component Layer

Create reusable components for common portfolio sections:

-   Navigation
-   Hero
-   About
-   Experience timeline
-   Education
-   Skills / expertise
-   Certifications
-   Organization experience
-   Projects
-   Contact
-   Footer
-   Section heading
-   Buttons
-   Cards
-   Metadata
-   Dividers

Components should be: - Reusable - Typed - Accessible - Responsive -
Focused on one responsibility - Configurable through props - Independent
of a particular person's content

Avoid premature abstraction. Extract a shared component when there is a
clear reuse case, not merely because two blocks look superficially
similar.

## 2.6 Application / Rendering Layer

The application layer should:

1.  Load the selected portfolio configuration.
2.  Validate the configuration.
3.  Load the selected theme.
4.  Load the selected template.
5.  Render enabled sections in the configured order.
6.  Apply responsive behavior and accessibility rules.

The first version only needs to render one configured portfolio per
deployment.

------------------------------------------------------------------------

# 3. Recommended Technology Stack

Use the following stack unless the existing repository already has an
approved, compatible setup.

  Technology             Purpose
  ---------------------- ----------------------------------
  Next.js (App Router)   Application framework
  TypeScript             Type safety
  Tailwind CSS           Styling
  GSAP + ScrollTrigger   Word-by-word title reveal
  Motion                 Card entrance and hover
  Lenis                  Smooth scroll
  Lucide React           Icons
  Zod                    Runtime configuration validation
  Vercel                 Hosting and deployment

## 3.1 Technical principles

-   Prefer stable, widely adopted patterns.
-   Use the current stable versions compatible with the repository.
-   Avoid unnecessary dependencies.
-   Do not add a library for a feature that can be implemented simply
    with existing tools.
-   Do not introduce a backend or database for static portfolio content.
-   Use semantic HTML.
-   Use Server Components by default where appropriate.
-   Use Client Components only when interaction requires them.
-   Keep components small and maintainable.
-   Use CSS variables or theme tokens for design values.
-   Avoid scattered hardcoded colors and spacing values.
-   Use optimized image handling.
-   Ensure metadata and page titles are configurable per portfolio.

------------------------------------------------------------------------

# 4. Suggested Project Structure

Adapt this structure to the existing repository. Do not restructure an
existing project unnecessarily.

``` text
portfolio-engine/
├── public/
│   ├── images/
│   │   └── profile/
│   ├── documents/
│   └── icons/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── button.tsx
│   │   │   ├── section-heading.tsx
│   │   │   ├── divider.tsx
│   │   │   └── metadata.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── site-navigation.tsx
│   │   │   ├── page-container.tsx
│   │   │   └── site-footer.tsx
│   │   │
│   │   └── sections/
│   │       ├── hero-section.tsx
│   │       ├── about-section.tsx
│   │       ├── experience-section.tsx
│   │       ├── education-section.tsx
│   │       ├── skills-section.tsx
│   │       ├── certifications-section.tsx
│   │       ├── organizations-section.tsx
│   │       ├── projects-section.tsx
│   │       └── contact-section.tsx
│   │
│   ├── config/
│   │   ├── portfolio.config.ts
│   │   ├── sections.config.ts
│   │   └── site.config.ts
│   │
│   ├── content/
│   │   └── fidela/
│   │       ├── profile.ts
│   │       ├── experience.ts
│   │       ├── education.ts
│   │       ├── skills.ts
│   │       ├── certifications.ts
│   │       ├── organizations.ts
│   │       └── projects.ts
│   │
│   ├── templates/
│   │   └── editorial/
│   │       ├── editorial-template.tsx
│   │       └── section-registry.ts
│   │
│   ├── themes/
│   │   └── accounting-editorial/
│   │       ├── theme.ts
│   │       └── tokens.css
│   │
│   ├── lib/
│   │   ├── validation/
│   │   ├── utils/
│   │   └── metadata/
│   │
│   └── types/
│       ├── profile.ts
│       ├── experience.ts
│       ├── education.ts
│       ├── section.ts
│       └── theme.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTENT_SCHEMA.md
│   ├── DESIGN_SYSTEM.md
│   └── ADDING_A_PORTFOLIO.md
│
├── AI_INSTRUCTIONS/
│   └── MASTER_AGENT_INSTRUCTIONS.md
│
├── package.json
└── README.md
```

This is a target structure, not permission to create every file
immediately. Create files when they are needed by the approved
implementation phase.

------------------------------------------------------------------------

# 5. Configuration Model

The engine should be configured through typed data.

The examples below illustrate the intended direction. They are not a
requirement to implement every possible field in the first iteration.

## 5.1 Portfolio configuration example

``` ts
export const portfolioConfig = {
  id: "fidela-andina",
  template: "editorial",
  theme: "accounting-editorial",

  profile: {
    name: "Fidela Andina",
    title: "Accounting & Finance Professional",
    location: "Indonesia",
    email: "andinafidela@gmail.com",
    portrait: "/images/profile/fidela.jpg",
    cvFile: "/documents/fidela-cv.pdf",
  },

  sections: [
    "hero",
    "about",
    "experience",
    "expertise",
    "education",
    "organizations",
    "certifications",
    "contact",
  ],
};
```

## 5.2 Section configuration

Each section should be independently configurable.

Support: - Enabled / disabled state. - Section order. - Section-specific
content. - Optional section heading. - Optional display variant when a
real use case exists.

Do not create a complicated page-builder schema.

## 5.3 Content schema principles

Use TypeScript types for content entities.

Use Zod for validation at configuration boundaries where useful.

Avoid: - Excessively generic `any` types. - Unvalidated arbitrary
objects. - Duplicated content definitions. - Person-specific values
inside shared UI components. - A complex plugin architecture in version
1.

## 5.4 Adding a new portfolio

The intended future workflow:

1.  Create a new content directory.
2.  Add the person's profile and professional information.
3.  Add approved image and document assets.
4.  Select an existing template.
5.  Select an existing theme or an approved theme configuration.
6.  Configure enabled sections and their order.
7.  Run validation and quality checks.
8.  Build and deploy as an independent website.

A new portfolio should not require changes to the shared components
unless a genuinely new, approved reusable capability is needed.

------------------------------------------------------------------------

# 6. Initial Pilot --- Fidela Andina

Fidela Andina is the first implementation used to validate the engine.

Her portfolio should follow the **Accounting Journal / Editorial**
visual direction.

## 6.1 Professional positioning

**Name:** Fidela Andina\
**Title:** Accounting & Finance Professional\
**Education:** Undergraduate Accounting, BINUS University\
**GPA:** 3.80 / 4.00

Suggested headline:

> Turning Financial Data Into Meaningful Insights.

Suggested supporting description:

> An Accounting graduate with hands-on experience across auditing,
> taxation, financial analysis, and finance operations.

## 6.2 Professional experience

Display in reverse chronological order.

### Badan Pusat Statistik (BPS)

-   Location: Cilegon, Indonesia
-   Position: Finance Intern
-   Period: December 2025 -- June 2026

Responsibilities: - Supported financial administration through
recapitulation, organization, and filing of supporting documents. -
Performed initial verification of the completeness and accuracy of
administrative documents related to finance and BPS activities. -
Assisted in financial administrative recording and documentation as
required by the team. - Supported administrative compliance with
applicable budget management regulations.

### Otoritas Jasa Keuangan (OJK)

-   Location: Jakarta, Indonesia
-   Position: Intern
-   Period: May 2025

Responsibilities: - Assisted in comparative analysis of financial
statements dated December 31, 2023 and 2024 to identify data
irregularities and support senior analysts' review processes. - Assisted
senior analysts in reviewing annual audited financial statements
submitted by supervised entities. - Monitored compliance with
information disclosure requirements through official websites. -
Supported supervision activities related to Information Technology-Based
Joint Funding Services (LPBBTI).

### PT Pertamina Lubricants

-   Location: Jakarta, Indonesia
-   Position: Finance Intern
-   Period: September 2024 -- December 2024

Responsibilities: - Contributed to the entire proposal payment
process. - Coordinated due dates related to accounts receivable and
accounts payable documents.

### RSM Indonesia

-   Location: Jakarta, Indonesia
-   Position: Audit Intern
-   Period: February 2024 -- June 2024

Responsibilities: - Performed external audit procedures, including
recalculations, test of details, test of controls, vouching of
supporting documents, footing, and wording of independent audit
reports. - Prepared audit working papers for several accounts across
clients in different industries. - Coordinated with clients regarding
supporting data and document requests.

### Direktorat Jenderal Pajak Republik Indonesia

-   Location: Jakarta, Indonesia
-   Position: Tax Assistant
-   Period: February 2023 -- June 2023

Responsibilities: - Assisted taxpayers with individual Annual Tax Return
(SPT) submissions by helping complete the required forms in accordance
with applicable Indonesian tax policies and regulations.

### Bina Nusantara University

-   Location: Jakarta, Indonesia
-   Position: Accounting Freshmen Leader for Binusian 2026
-   Period: July 2022 -- September 2022

Responsibilities: - Assisted and guided Accounting freshmen in adapting
to university life and maximizing their potential during the orientation
period. - Communicated with freshmen to provide relevant information
about studying at BINUS University.

## 6.3 Areas of experience

Present as areas of experience and exposure, not as independently
verified proficiency ratings.

-   External Auditing
-   Financial Reporting & Analysis
-   Taxation
-   Finance Operations
-   Financial Administration

Do not invent skill percentages or proficiency levels.

## 6.4 Education

-   Institution: Universitas Bina Nusantara (BINUS University)
-   Location: Jakarta, Indonesia
-   Degree: Undergraduate Accounting
-   Period: September 2021 -- July 2025
-   GPA: 3.80 / 4.00

## 6.5 Organizational experience

**Organization:** Himpunan Mahasiswa Akuntansi (HIMA) BINUS

### Manager of Organization Development Department

February 2023 -- February 2024

-   Monitored organizational and member performance.
-   Coordinator of Food and Beverage Division --- LDK-CP HIMA 2023.
-   Vice Coordinator of Food and Beverage Division --- Company Visit to
    PwC.

### Activist of Organization Development Department

March 2022 -- February 2023

-   Monitored organizational and member performance.
-   Secretary and Treasurer of PKM HIMA 2022.
-   Coordinator of Registration Division --- TKH HIMA 2022.
-   Coordinator of Publication and Documentation Division --- SERTIJAB
    HIMA 2023.
-   Member of Publication and Documentation Division --- PEMILU HIMA
    2022.
-   Member of Publication and Documentation Division --- Recavist HIMA
    2022.

## 6.6 Certifications and learning

-   Jurnal.id (2022): Jurnal Software for Comprehensive Bookkeeping and
    Accounting Process.
-   Udemy (2024): Audit - Financial Statement.
-   Udemy (2025): Excel Crash Course: Master Excel for Financial
    Analysis.
-   Ikatan Akuntan Indonesia (2025): Brevet AB.

## 6.7 Contact

-   Email: andinafidela@gmail.com
-   LinkedIn: https://bit.ly/Linkedin-fidelaandina
-   Existing portfolio reference: https://bit.ly/Portofolio-Fidelaandina
-   Phone: [withheld — pending owner publishing approval]

Do not publish the phone number until the portfolio owner confirms
permission.

## 6.8 Content integrity

The supplied CV is the source of truth.

Do not invent: - Projects - Achievements - Performance metrics - Client
names - Responsibilities - Certificate IDs - Language proficiency -
Software proficiency levels

Do not publish confidential employer, client, taxpayer, or financial
information.

------------------------------------------------------------------------

# 7. Agent Governance --- Mandatory Working Rules

These rules are mandatory for every AI agent working on this project.

## 7.1 Owner authority

The project owner has final authority over: - Product direction -
Scope - Design direction - Major architecture decisions - New features -
New dependencies with meaningful project impact - Changes to approved
requirements - Deployment decisions

The agent acts as an implementation partner, not an autonomous product
owner.

## 7.2 No experimentation

The agent must not experiment with unapproved directions.

Do not: - Try unrelated visual styles. - Introduce experimental UI
patterns. - Add unrequested features. - Change the approved information
architecture. - Replace the approved design system. - Add unnecessary
dependencies. - Rewrite working code without a clear need. - Introduce
complex abstractions without an approved reason. - Make speculative
changes simply because they might look interesting.

Use established, reliable, maintainable implementation patterns.

## 7.3 Approval required for new ideas

If the agent identifies an idea, improvement, feature, architectural
change, or design alternative outside the approved scope:

1.  Stop before implementing it.
2.  Explain the idea briefly.
3.  Explain the problem it solves.
4.  Explain its benefits and trade-offs.
5.  State whether it affects scope, complexity, dependencies, or
    maintenance.
6.  Present a clear recommendation.
7.  Wait for explicit owner approval.

Do not interpret silence as approval.

Do not implement the proposal while waiting.

## 7.4 What the agent may decide independently

The agent may make routine implementation decisions within the approved
scope, including:

-   Variable and function naming.
-   Internal component organization.
-   Simple CSS refinements consistent with the approved design.
-   Semantic HTML choices.
-   Basic accessibility improvements.
-   Small bug fixes.
-   TypeScript implementation details.
-   Standard responsive behavior.
-   Code formatting.
-   Non-breaking refactoring required for maintainability.

These decisions must not alter the agreed design, scope, or user-visible
behavior in a significant way.

## 7.5 No unnecessary questions

The agent should not ask the owner about every minor technical detail.

When a decision is: - Within the approved scope, - Low-risk, -
Reversible, - Consistent with established project conventions,

the agent should choose the most reliable and efficient option and
continue.

Ask for approval when a decision changes scope, user experience,
architecture, dependencies, data requirements, or the agreed design
direction.

## 7.6 No destructive changes without approval

Never: - Delete existing project files without establishing that they
are obsolete and receiving approval. - Overwrite user-provided assets. -
Remove existing functionality. - Change deployment settings. - Modify
secrets or environment variables. - Replace the package manager. -
Perform large-scale refactoring. - Reset or discard user changes.

Inspect the repository and preserve existing work.

## 7.7 Protect the reusable core

The shared engine must remain independent of Fidela's personal content.

Before adding a person-specific requirement to the shared core,
determine whether it can be represented through existing content
configuration, theme tokens, template composition, or a modular section.

Do not make the engine accounting-specific merely to satisfy the first
pilot.

## 7.8 Scope discipline

Only implement the current approved phase.

Do not jump ahead to later phases.

Do not silently expand the task.

Do not mark unfinished work as complete.

## 7.9 Communication format

At the beginning of each phase, report: - Phase objective - Files or
systems expected to be affected - Planned actions - Known risks or
dependencies

At the end of each phase, report: - Work completed - Files created or
modified - Decisions made within approved scope - Tests performed and
results - Known issues - Items requiring owner approval - Exact next
step

Keep reports concise but sufficiently specific.

------------------------------------------------------------------------

# 8. Mandatory Phased Workflow

The agent must execute the project in the following order.

A phase is not considered complete until its deliverables are presented
and accepted by the owner.

## Phase 0 --- Repository Discovery

### Objective

Understand the existing environment before changing anything.

### Tasks

-   Inspect the repository structure.
-   Identify the current framework and package manager.
-   Inspect existing dependencies.
-   Identify existing design conventions.
-   Identify available assets.
-   Identify current application behavior.
-   Check for existing documentation.
-   Determine whether the repository is empty, partially built, or
    already functional.

### Restrictions

-   Do not modify files.
-   Do not install dependencies.
-   Do not run destructive commands.
-   Do not create a new application before inspecting the repository.

### Deliverables

Create a concise discovery report containing: - Current project
structure. - Existing stack. - Relevant dependencies. - Existing
assets. - Potential conflicts. - Recommended implementation approach.

Wait for owner approval before proceeding.

## Phase 1 --- Architecture & Technical Design

### Objective

Translate this specification into a practical implementation plan.

### Tasks

-   Define the content model.
-   Define theme configuration.
-   Define template responsibilities.
-   Define component boundaries.
-   Define section configuration and ordering.
-   Define validation strategy.
-   Confirm the routing and rendering approach.
-   Confirm the project structure.
-   Identify only the dependencies actually required.

### Restrictions

-   Do not implement the full website.
-   Do not add speculative abstractions.
-   Do not create a plugin system.
-   Do not introduce database or backend infrastructure.

### Deliverables

-   Architecture proposal.
-   Data model proposal.
-   Folder structure.
-   Component responsibility map.
-   Dependency list with justification.
-   Implementation sequence.

Wait for owner approval.

## Phase 2 --- Design System & UI/UX Proposal

### Objective

Define the initial Editorial Template and Accounting Editorial theme.

### Tasks

-   Define color tokens.
-   Define typography scale.
-   Define spacing system.
-   Define container widths.
-   Define responsive breakpoints.
-   Define button and card styles.
-   Define navigation.
-   Define hero composition.
-   Define experience timeline.
-   Define section hierarchy.
-   Define mobile behavior.
-   Define interaction and motion rules.

### Design requirements

-   Premium editorial appearance.
-   Warm ivory, forest green, muted gold, charcoal.
-   Fraunces, DM Sans, IBM Plex Mono.
-   Strong readability.
-   Generous whitespace.
-   Subtle ledger-inspired details.
-   No unnecessary dashboard visuals.
-   No excessive animation.

### Deliverables

-   Design system specification.
-   Section-by-section layout proposal.
-   Desktop layout description.
-   Mobile layout description.
-   Interaction specification.

Wait for owner approval before implementation.

## Phase 3 --- Core Engine Implementation

### Objective

Build the reusable foundation without embedding Fidela-specific content
in shared components.

### Tasks

Implement in a controlled order:

1.  Design tokens and theme setup.
2.  Shared layout primitives.
3.  Navigation and footer.
4.  Section heading and common UI elements.
5.  Content types and configuration.
6.  Configuration validation.
7.  Editorial template composition.
8.  Section registry and section ordering.
9.  Responsive behavior.

### Restrictions

-   Do not add extra themes.
-   Do not add extra templates.
-   Do not create a visual editor.
-   Do not add backend functionality.
-   Do not add features outside the approved architecture.

### Deliverables

-   Working reusable core.
-   Typed configuration model.
-   Initial Editorial Template.
-   Basic responsive structure.
-   Build and type-check results.

Present the result for owner review.

## Phase 4 --- Fidela Pilot Implementation

### Objective

Use the reusable core to produce Fidela's actual portfolio.

### Tasks

-   Add Fidela's content through configuration files.
-   Add approved images and documents.
-   Configure the Accounting Editorial theme.
-   Configure the Editorial Template.
-   Enable and order the appropriate sections.
-   Implement the approved content presentation.
-   Add CV download functionality.
-   Add contact links.
-   Verify every factual detail against the supplied CV.

### Restrictions

-   Do not invent achievements or projects.
-   Do not publish personal information without permission.
-   Do not hardcode Fidela's content into shared components.
-   Do not redesign the approved theme without approval.

### Deliverables

-   Complete Fidela portfolio.
-   Content verification report.
-   List of remaining placeholders.
-   Build and runtime test results.

Present for owner review.

## Phase 5 --- Quality Assurance

### Objective

Validate both the portfolio and the reusable architecture.

### Visual QA

-   Typography.
-   Color consistency.
-   Spacing.
-   Alignment.
-   Section hierarchy.
-   Image presentation.
-   Desktop responsiveness.
-   Mobile responsiveness.

### Functional QA

-   Navigation.
-   Anchor scrolling.
-   Expandable content.
-   External links.
-   Email links.
-   CV download.
-   Keyboard interaction.
-   Focus states.

### Technical QA

-   TypeScript checks.
-   Production build.
-   Console errors.
-   Broken assets.
-   Invalid configuration handling.
-   SEO metadata.
-   Accessibility basics.
-   Image optimization.
-   Performance.

### Reusability QA

Confirm: - Shared components contain no Fidela-specific content. -
Content is controlled by configuration. - Theme tokens are
centralized. - Section order can be changed through configuration. -
Optional sections can be disabled. - Missing optional content does not
break the page. - The engine can accept a second sample profile without
modifying shared components.

Do not create a second full portfolio unless explicitly approved. A
small test configuration is sufficient for this validation.

### Deliverables

-   QA report.
-   Issues categorized by severity.
-   Fixes completed.
-   Remaining limitations.
-   Owner approval request.

## Phase 6 --- Documentation & Release

### Objective

Prepare the engine for future reuse.

### Documentation

Create or update:

-   `README.md`
-   `docs/ARCHITECTURE.md`
-   `docs/CONTENT_SCHEMA.md`
-   `docs/DESIGN_SYSTEM.md`
-   `docs/ADDING_A_PORTFOLIO.md`

Documentation must explain:

-   How to configure a new portfolio.
-   Where to add profile information.
-   How to add experience and education.
-   How to add images and CV files.
-   How to select a theme.
-   How to configure sections.
-   How to run locally.
-   How to build.
-   How to deploy.

### Release deliverables

-   Stable project structure.
-   Verified production build.
-   Complete documentation.
-   Known limitations.
-   Deployment instructions.

Deployment must not happen without owner approval.

------------------------------------------------------------------------

# 9. Definition of Done

The initial version is complete only when all of the following are true:

-   [ ] The project builds successfully.
-   [ ] The TypeScript checks pass.
-   [ ] The Editorial Template renders correctly.
-   [ ] The Accounting Editorial theme is centralized.
-   [ ] Fidela's content is stored outside shared components.
-   [ ] Section ordering is configurable.
-   [ ] Optional sections can be disabled safely.
-   [ ] Desktop and mobile layouts are usable.
-   [ ] Navigation and links work.
-   [ ] CV download works.
-   [ ] Content has been verified against the source CV.
-   [ ] No unsupported claims have been added.
-   [ ] No confidential information is exposed.
-   [ ] Basic accessibility checks pass.
-   [ ] Documentation explains how to create another portfolio.
-   [ ] A second sample configuration can be rendered without modifying
    shared components.
-   [ ] Owner has reviewed and approved the result.

------------------------------------------------------------------------

# 10. Master Prompt for AI Agents

The following prompt is the primary instruction to give the AI agent.

------------------------------------------------------------------------

## MASTER PROMPT --- PORTFOLIO ENGINE

You are working as a Senior Software Architect, Senior UI/UX Designer,
and Senior Frontend Engineer on a project called **Portfolio Engine**.

Your task is to build a reusable, data-driven portfolio website
foundation that can be configured for different individuals and
professions.

The first pilot implementation is the personal portfolio of Fidela
Andina, an Accounting graduate.

### A. Understand the project first

Before taking action:

1.  Read this entire specification.
2.  Inspect the existing repository.
3.  Understand the current framework, dependencies, conventions, and
    assets.
4.  Identify the current project state.
5.  Do not assume that the repository is empty.
6.  Do not modify anything during initial discovery.

The goal is to build a reusable engine, not a one-off website for
Fidela.

### B. Core architectural principle

Follow this principle:

**Build once, configure many times.**

Separate the project into:

-   Content Layer
-   Theme Layer
-   Template Layer
-   Component Layer
-   Application / Rendering Layer

Person-specific content must never be hardcoded into shared UI
components.

Use typed configuration and modular sections.

Keep the architecture simple. Do not over-engineer.

### C. Product scope

The first version is a reusable codebase for independently deployable
portfolio websites.

It is NOT a SaaS product or visual portfolio builder.

Do not build authentication, database infrastructure, CMS integration,
user dashboards, billing, CV parsing, automatic deployment
orchestration, or other unrequested systems.

### D. Design direction

The first pilot uses the **Accounting Journal / Editorial** design
direction.

Use:

-   Warm Ivory `#F5F1E8`
-   Forest Green `#183C32`
-   Muted Gold `#B59A64`
-   Charcoal `#292A28`
-   Soft Gray `#E5E1D8`
-   White `#FFFFFF`

Typography:

-   Fraunces for headings.
-   DM Sans for body text.
-   IBM Plex Mono for numerical metadata.

Design characteristics:

-   Editorial composition.
-   Generous whitespace.
-   Clear typography hierarchy.
-   Thin dividers.
-   Subtle ledger-inspired details.
-   Refined responsive layouts.
-   Minimal, purposeful animations.

Do not turn the website into accounting software or a finance dashboard.

### E. Technical direction

Use the existing compatible stack when one is already established.

If starting from scratch, use:

-   Next.js App Router
-   TypeScript
-   Tailwind CSS
-   GSAP + ScrollTrigger
-   Lucide React
-   Zod
-   Vercel deployment

Avoid unnecessary dependencies.

Prefer reliable, maintainable, and well-documented patterns.

### F. Agent governance --- mandatory

The project owner has final authority over product direction, scope,
architecture, design, and major changes.

You must follow these rules:

1.  Work only on the currently approved phase.
2.  Do not jump ahead.
3.  Do not experiment with unapproved designs or technologies.
4.  Do not add unrequested features.
5.  Do not change the approved architecture without permission.
6.  Do not redesign approved UI.
7.  Do not introduce unnecessary dependencies.
8.  Do not perform destructive operations without approval.
9.  Do not overwrite or remove existing user work.
10. Do not silently expand the project scope.

If you have an idea or believe something should be improved:

-   Stop before implementing it.
-   Explain the proposal.
-   Explain its purpose and benefits.
-   Describe trade-offs and maintenance impact.
-   Give your recommendation.
-   Wait for explicit approval.

Never treat silence as approval.

You may independently make routine, low-risk implementation decisions
that remain within the approved scope and established conventions.

Do not ask unnecessary questions about minor technical details. Choose
the most reliable and efficient option when the decision is low-risk,
reversible, and already within scope.

### G. Required working process

Follow these phases strictly:

-   Phase 0: Repository Discovery
-   Phase 1: Architecture & Technical Design
-   Phase 2: Design System & UI/UX Proposal
-   Phase 3: Core Engine Implementation
-   Phase 4: Fidela Pilot Implementation
-   Phase 5: Quality Assurance
-   Phase 6: Documentation & Release

Each phase requires owner review and acceptance before moving to the
next phase.

### H. Communication requirements

At the beginning of each phase, provide:

-   Objective.
-   Planned actions.
-   Files or systems likely to be affected.
-   Known risks.
-   Required decisions.

At the end of each phase, provide:

-   Completed work.
-   Files created or modified.
-   Tests performed.
-   Results.
-   Known issues.
-   Pending approvals.
-   Proposed next step.

Be precise and transparent.

Do not claim a feature is complete if it has not been implemented and
tested.

### I. Quality priorities

Prioritize in this order:

1.  Correctness.
2.  Reusability.
3.  Maintainability.
4.  Readability.
5.  Accessibility.
6.  Responsive behavior.
7.  Visual consistency.
8.  Performance.
9.  Appropriate interactions.

Do not sacrifice maintainability for visual effects.

### J. Initial instruction

Start with **Phase 0 --- Repository Discovery only**.

Inspect the repository and prepare a discovery report.

Do not edit files, install packages, or implement anything during this
first phase.

After presenting the report, wait for the owner's approval to begin
Phase 1.

------------------------------------------------------------------------

# 11. First Message to the Agent

After placing this specification in the project repository, send the
following message:

``` text
Read and understand:

AI_INSTRUCTIONS/PORTFOLIO_ENGINE_MASTER_SPEC.md

This document is the primary project specification and mandatory working agreement.

We are building a reusable Portfolio Engine, not a one-off portfolio website.

The first pilot is Fidela Andina's Accounting & Finance portfolio.

Follow the architecture, scope restrictions, agent governance rules,
and phased workflow described in the specification.

Start with Phase 0 — Repository Discovery only.

Do not modify files, install dependencies, or start implementation.

Present your discovery report and wait for my approval.
```

------------------------------------------------------------------------

# 12. Final Project Principles

Keep these principles in mind throughout development:

1.  **Reusable, not over-engineered.** Build only abstractions that
    solve real reuse requirements.
2.  **Configurable, not hardcoded.** Personal information belongs in
    content configuration.
3.  **Modular, not monolithic.** Sections should be independently
    maintainable.
4.  **Consistent, not experimental.** Follow approved design decisions.
5.  **Practical, not speculative.** Do not build features without a real
    requirement.
6.  **Owner-controlled, not autonomous in scope.** Ask before making
    significant changes.
7.  **Validated, not assumed.** Test the implementation and verify
    content.
8.  **Documented, not tribal knowledge.** Make future portfolio creation
    straightforward.

**The goal is a stable foundation that makes the next portfolio faster
to create without making the first implementation unnecessarily
complicated.**
