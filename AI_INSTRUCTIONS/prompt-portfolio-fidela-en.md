# Prompt: Build an Accounting Portfolio Website with Garden-Themed Motion

## 1. Role & goal

You are a senior front-end engineer and UI/UX designer. Build a **single-page portfolio website** for **Fidela Andina**, an Accounting & Finance Professional, to be deployed on **Vercel**.

Goals of the site:
- Let recruiters (Big 4 firms, regulators, state-owned and private companies) understand who Fidela is and what she offers within the first 10 seconds.
- Be visually appealing, pleasant to read, and easy to navigate.
- Use subtle **flower and garden themed motion** without making the site heavy.

Site language: **English**. Keep content separate from components so an Indonesian version can be added later.

## 2. Tech stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS** (design tokens via CSS variables)
- **GSAP + ScrollTrigger** for scroll animations
- **Three.js** (or React Three Fiber + drei) for one 3D flower in the hero, **lazy-loaded** with `next/dynamic` (`ssr: false`)
- **Canvas 2D** for falling petals
- **next/font** for fonts, **next/image** for the photo
- No large UI libraries. Keep the bundle small.

## 3. Design direction: "Annual Report" + ledger details + garden

Concept: the page feels like an elegant **annual report cover**, with accounting ledger details and calm garden motion.

### Design tokens

Light (default) and dark (automatic via `prefers-color-scheme`, plus a manual toggle).

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FBF7F2` | `#171A17` |
| `--ink` | `#2A2B26` | `#ECE8E0` |
| `--muted` | `#5E6258` | `#A9AEA3` |
| `--card` | `#FFFFFF` | `#1F2420` |
| `--line` | `#E6DFD3` | `#2E352F` |
| `--accent` (sage) | `#4F7A5A` | `#86B993` |
| `--bloom` (blush) | `#E98FA6` | `#E98FA6` |
| `--gold` (flower center) | `#F2C14E` | `#F2C14E` |

Color rules: sage is the main accent, blush is only for flower details. Text contrast must meet WCAG AA (4.5:1) at minimum.

### Typography
- Headings: **DM Serif Display** (or Fraunces), large and airy
- Body: **Inter**
- Numbers, labels, dates, section numbers: **IBM Plex Mono** with `font-variant-numeric: tabular-nums`

### Accounting-inspired elements
- Report-style section numbers: `01 / About`, `02 / Experience`, etc. in mono font
- Thin ledger-style lines as section dividers
- Experience shown like **journal rows**: columns for Period, Position & Organization, Contribution
- A "closing the books" style footer (closing statement)

## 4. Page structure & navigation

Sticky top navigation with a maximum of **5 links** to avoid clutter: `About`, `Experience`, `Expertise`, `Credentials`, `Contact`. Education, organizations, and certifications are grouped under "Credentials" (tabs or subsections).
- Include a **Skip to content** link
- A **Download CV** button (PDF at `/public/cv-fidela-andina.pdf`) is always visible, either in the nav or as a primary hero button
- Highlight the active link while scrolling (IntersectionObserver)
- Mobile: hamburger menu that is fully keyboard accessible

### Sections
1. **Hero**: large serif name, tagline, 2 buttons (`View experience`, `Download CV`), photo, and a row of key figures (GPA 3.80, 5 organizations, Brevet AB). A 3D flower sits on the right. Falling petals in the background.
2. **About**: a short story that does not repeat the hero sentence. Write a summary of her differentiators, e.g. a combination of audit, tax, and financial statement analysis at a regulator and a Big 4 firm.
3. **Experience**: a vertical timeline with a plant stem that grows on scroll. Each position is one "flower" that blooms. Each item can be expanded (accordion) to show all task bullets.
4. **Expertise**: cards per area instead of a plain text list (see content).
5. **Credentials**: Education, Organizations, Certifications. Certification cards have a flower icon that blooms on hover or focus.
6. **Contact**: a dark closing section in a "closing statement" style with email, LinkedIn, and a Download CV button.

## 5. Motion specification

Principle: **subtle, meaningful, and lightweight**. Motion supports the content, it never hides it.

| # | Motion | Technique | Notes |
|---|---|---|---|
| 1 | 3D flower blooms in the hero | Three.js | Petals (4 rings: leaves, outer petals, middle, inner) use `SphereGeometry` scaled into ellipsoids. They appear in sequence with GSAP `back.out`, then rotate toward the pointer using lerp. Petals blush, leaves sage, center gold. Pixel ratio capped at 2. Rendering pauses when out of the viewport. |
| 2 | Plant grows on scroll | GSAP ScrollTrigger (`scrub`) | The stem SVG path is drawn with `strokeDashoffset`. Each experience triggers an SVG flower (6 elliptical petals) scaling from 0, and the item text goes from `opacity .28` to 1. Growth order runs from the bottom (oldest) to the top (latest). |
| 3 | Falling petals | Canvas 2D | About 26 particles, paused when not visible, fewer on small screens. |
| 4 | Cards bloom on hover | Pure CSS | 6 petals rotate and scale with `cubic-bezier(.3,1.5,.5,1)` easing. Also active on `:focus-visible` and `:active`. |
| 5 | Text reveal on entry | CSS `animation-timeline: view()` with IntersectionObserver fallback | Small 16px fade-up. |
| 6 | Card and row hover | CSS | `translateY(-4px)` plus border or color change. |

Mandatory motion rules:
- Respect `prefers-reduced-motion: reduce`: disable animations, show final states, render the 3D flower once (static), and do not run the petal canvas.
- No animation may block interaction or cause layout shift (CLS ≈ 0).
- Durations are generally 0.4–0.8 seconds, except scroll scrubbing.
- If WebGL is unavailable, show the photo or a static SVG flower illustration.

## 6. Content (use as is, do not invent figures)

**Name:** Fidela Andina
**Title:** Accounting & Finance Professional
**Location:** Indonesia
**Hero headline:** *Turning Financial Data Into Meaningful Insights.*
**Subtext:** An Accounting graduate with hands-on experience across auditing, taxation, financial analysis, and finance operations.
**Photo:** `/images/profile/fidela.jpg` (graduation photo; use `next/image` with proper `sizes`, do not load 3840px on mobile)

### Experience
1. **Finance Intern**, Badan Pusat Statistik (BPS), Cilegon. *December 2025 – June 2026*
   - Supported financial administration through recapitulation, organization, and filing of supporting documents.
   - Performed initial verification of the completeness and accuracy of administrative documents related to finance and BPS activities.
   - Assisted in financial administrative recording and documentation as required by the team.
   - Supported administrative compliance with applicable budget management regulations.
2. **Intern**, Otoritas Jasa Keuangan (OJK), Jakarta. *May 2025*
   - Assisted in comparative analysis of financial statements dated December 31, 2023 and 2024 to identify data irregularities and support senior analysts' review processes.
   - Assisted senior analysts in reviewing annual audited financial statements submitted by supervised entities.
   - Monitored compliance with information disclosure requirements through official websites.
   - Supported supervision activities related to Information Technology-Based Joint Funding Services (LPBBTI).
3. **Finance Intern**, PT Pertamina Lubricants, Jakarta. *September 2024 – December 2024*
   - Contributed to the entire proposal payment process.
   - Coordinated due dates related to accounts receivable and accounts payable documents.
4. **Audit Intern**, RSM Indonesia, Jakarta. *February 2024 – June 2024*
   - Performed external audit procedures, including recalculations, test of details, test of controls, vouching of supporting documents, footing, and wording of independent audit reports.
   - Prepared audit working papers for several accounts across clients in different industries.
   - Coordinated with clients regarding supporting data and document requests.
5. **Tax Assistant**, Direktorat Jenderal Pajak Republik Indonesia, Jakarta. *February 2023 – June 2023*
   - Assisted taxpayers with individual Annual Tax Return (SPT) submissions by helping complete the required forms in accordance with applicable Indonesian tax policies and regulations.
6. **Accounting Freshmen Leader for Binusian 2026**, Bina Nusantara University, Jakarta. *July 2022 – September 2022*
   - Assisted and guided Accounting freshmen in adapting to university life and maximizing their potential during the orientation period.
   - Communicated with freshmen to provide relevant information about studying at BINUS University.

> In the collapsed state of each item, show a one-line summary (written from the bullets above without adding facts). The rest appears when the accordion is opened.

### Expertise (areas of experience)
External Auditing · Financial Reporting & Analysis · Taxation · Finance Operations · Financial Administration

Display as 5 cards, each with one short sentence drawn from the experience above (e.g. External Auditing: RSM Indonesia). Do not add tools or figures that are not in the content.

### Education
Undergraduate Accounting, Universitas Bina Nusantara (BINUS University), Jakarta. *September 2021 – July 2025*. **GPA 3.80 / 4.00**

### Organizations
**Himpunan Mahasiswa Akuntansi (HIMA) BINUS**
- *Manager of Organization Development Department* (Feb 2023 – Feb 2024): monitored organizational and member performance; Coordinator of Food and Beverage Division, LDK-CP HIMA 2023; Vice Coordinator of Food and Beverage Division, Company Visit to PwC.
- *Activist of Organization Development Department* (Mar 2022 – Feb 2023): monitored organizational and member performance; Secretary and Treasurer of PKM HIMA 2022; Coordinator of Registration Division, TKH HIMA 2022; Coordinator of Publication and Documentation Division, SERTIJAB HIMA 2023; Member of Publication and Documentation Division, PEMILU HIMA 2022 and Recavist HIMA 2022.

### Certifications & Learning
- Brevet AB, Ikatan Akuntan Indonesia, 2025
- Excel Crash Course: Master Excel for Financial Analysis, Udemy, 2025
- Audit – Financial Statement, Udemy, 2024
- Jurnal Software for Comprehensive Bookkeeping and Accounting Process, Jurnal.id, 2022

### Contact
- Email: andinafidela@gmail.com
- LinkedIn: https://bit.ly/Linkedin-fidelaandina
- Previous portfolio: https://bit.ly/Portofolio-Fidelaandina
- Footer: © 2026 Fidela Andina

## 7. Performance & quality

- Lighthouse targets (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- The 3D flower is lazy-loaded and must not block LCP (LCP should be the hero text or photo)
- Do not ship unnecessary Three.js/GSAP code: import only the modules used
- Images: AVIF/WebP via `next/image`, `priority` only for the hero photo
- All animations pause when the tab is inactive or the element is off-screen
- Responsive from 360px to wide desktop; no horizontal scroll
- Accessibility: semantic HTML (`header`, `main`, `section`, `nav`), correct heading order, visible focus, touch targets of at least 44px, `aria-label` for interactive decorations, decorative canvas and SVG marked `aria-hidden`
- SEO: title, meta description, Open Graph image, `lang`, favicon (🌸 emoji or an SVG flower icon), `sitemap` and `robots`

## 8. Expected project structure

```
/app
  layout.tsx          # fonts, metadata, theme provider
  page.tsx            # compose all sections
  globals.css         # design tokens (light + dark)
/components
  Nav.tsx  Hero.tsx  About.tsx  Experience.tsx  Expertise.tsx
  Credentials.tsx  Contact.tsx  ThemeToggle.tsx
  motion/
    BloomScene.tsx    # Three.js / R3F, imported with next/dynamic
    PetalCanvas.tsx   # Canvas 2D petals
    GrowingVine.tsx   # SVG + GSAP ScrollTrigger
    BloomIcon.tsx     # CSS flower icon for cards
/data
  content.ts          # all content from Section 6 (typed in TypeScript)
/hooks
  useReducedMotion.ts  useInView.ts
/public
  /images/profile/fidela.jpg
  cv-fidela-andina.pdf
```

## 9. How to work

1. Start by showing a **short plan** (component structure and technical decisions), then build right away.
2. Work in stages: project setup and tokens, then static layout and sections, then motion one piece at a time (order: card hover, scroll vine, petals, 3D flower).
3. After each stage, make sure `npm run build` and `npm run lint` pass.
4. Do not add content, figures, or claims that are not in Section 6. If extra data is needed (e.g. the CV file), use a clear placeholder and list it in the final summary.
5. At the end, provide: how to run locally, how to deploy to Vercel, a list of placeholders to fill in, and Lighthouse results.

## 10. Acceptance checklist

- [ ] All sections in Section 4 exist and anchor navigation works with active highlighting
- [ ] The hero shows a 3D flower that blooms and follows the pointer, with a static fallback
- [ ] The plant stem grows on scroll and each experience triggers one flower
- [ ] Certification cards bloom on hover and keyboard focus
- [ ] Light and dark modes work (automatic + toggle) with AA contrast
- [ ] `prefers-reduced-motion` truly disables animations
- [ ] Layout looks clean at 360px, 768px, and 1440px
- [ ] Content matches Section 6 exactly, with no invented data
- [ ] Build and lint pass, ready to deploy on Vercel
