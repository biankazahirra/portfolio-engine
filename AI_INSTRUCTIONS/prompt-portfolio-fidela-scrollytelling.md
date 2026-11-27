# Prompt: Scrollytelling Portfolio for an Accounting Professional ("The Accounting Cycle Grows into a Garden")

## 1. Role & goal

You are a senior creative front-end engineer and UX designer. Build a **scrollytelling portfolio website** for **Fidela Andina**, an Accounting & Finance Professional, to be deployed on **Vercel**.

The site tells her career as a story that follows the **accounting cycle**, while **one plant grows across the whole page** as the progress indicator. The story should be memorable, but **recruiters must still be able to scan the key facts quickly**.

Non-negotiable principle: **cinematic story, scannable content.**
- The hero shows name, headline, GPA, key figures, and a Download CV button immediately, with no scroll needed.
- Scrollytelling starts after the hero.
- Every chapter's text exists in real HTML (readable by search engines and screen readers), never only inside a canvas or image.

Site language: **English**. Keep content in a typed data file so an Indonesian version can be added later.

## 2. Tech stack

- **Next.js (App Router) + TypeScript**, **Tailwind CSS** (tokens via CSS variables)
- **GSAP + ScrollTrigger** for pinned scenes and scrubbed animation
- **Lenis** for smooth scrolling, synced with ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` and GSAP ticker)
- **Three.js** (or React Three Fiber + drei) for one 3D flower, lazy-loaded with `next/dynamic` (`ssr: false`)
- **SVG** for the growing plant and chapter scenes; **Canvas 2D** for petals
- **next/font**, **next/image**
- No large UI libraries. Keep the bundle small and import only the modules used.

## 3. Visual direction

Elegant "annual report" feel with ledger details and a calm garden.

### Design tokens (light default, dark via `prefers-color-scheme` + manual toggle)

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FBF7F2` | `#171A17` |
| `--ink` | `#2A2B26` | `#ECE8E0` |
| `--muted` | `#5E6258` | `#A9AEA3` |
| `--card` | `#FFFFFF` | `#1F2420` |
| `--line` | `#E6DFD3` | `#2E352F` |
| `--accent` (sage) | `#4F7A5A` | `#86B993` |
| `--bloom` (blush) | `#E98FA6` | `#E98FA6` |
| `--gold` | `#F2C14E` | `#F2C14E` |

Text contrast must meet WCAG AA (4.5:1).

Typography: **DM Serif Display** for headings (large, airy), **Inter** for body, **IBM Plex Mono** for numbers, dates, chapter labels (`font-variant-numeric: tabular-nums`).

Ledger details: thin ledger lines as dividers, chapter labels like `CH. 03 / AUDIT`, journal-style rows for data, and a "closing the books" ending.

## 4. Story structure: the accounting cycle

A persistent **vine** runs along the left edge (desktop) or as a thin top progress stem (mobile). It grows with total page progress and blooms one flower at each chapter. It doubles as the chapter indicator (clickable dots).

Chapter order is chronological. Scenes are **visual metaphors only**: they must not add facts that are not in Section 6.

| Ch. | Label | Story content (from Section 6) | Scene |
|---|---|---|---|
| 0 | **Opening** | Hero: name, headline, GPA 3.80, Brevet AB, Download CV | Seed in soil, 3D flower begins to bloom. Falling petals in the background. |
| 1 | **Transaction** | Education at BINUS (2021–2025), HIMA roles, freshmen leader | A sprout appears; numbers drift in and settle. |
| 2 | **Journal** | Tax Assistant, Directorate General of Taxes (Feb–Jun 2023) | Figures enter ruled journal rows one by one. |
| 3 | **Audit** | Audit Intern, RSM Indonesia (Feb–Jun 2024) | Document lines get checkmarks one by one (vouching, footing). |
| 4 | **Ledger** | Finance Intern, PT Pertamina Lubricants (Sep–Dec 2024) | Journal rows move into account columns (AR / AP due dates). |
| 5 | **Oversight** | Intern, OJK (May 2025) | Two report columns (2023 vs 2024) compared, one irregularity highlighted. |
| 6 | **Reporting** | Finance Intern, BPS Cilegon (Dec 2025 – Jun 2026) | Loose documents stack into one organized report. |
| 7 | **Closing the books** | Contact and Download CV | Debit and Credit columns balance, the whole garden blooms. |

Between chapters, show a short, readable "transition card" with a one-line takeaway written only from existing facts (no new claims).

## 5. Scrollytelling mechanics

- Total story length around **8 screens**. Each pinned chapter lasts **100–150% of the viewport height**, never more.
- Each chapter: a **pinned scene** (ScrollTrigger `pin: true`, `scrub: 0.6`) with a scrubbed timeline: heading and metadata in, scene animation, bullets revealed, then out.
- Full-detail bullets for each role are available after the scene (expand/collapse "Details" panel) so the story stays short but nothing is lost.
- The vine path uses `strokeDashoffset` tied to overall progress. Flowers (6 elliptical SVG petals with a gold center) scale from 0 with `back.out` at each chapter start.
- The 3D flower in the hero responds to scroll (slow rotation and opening) and to the pointer (lerp tilt).
- Chapter dots in the margin are links: clicking scrolls to that chapter via Lenis (`lenis.scrollTo`).
- Use `ScrollTrigger.matchMedia` / `gsap.matchMedia()` to define separate desktop and mobile timelines.

### Safeguards (required)
1. **Skip story** button near the top: jumps to a compact "At a glance" summary (one card per role) and disables pinning.
2. **Navigation always visible**: chapter dots plus a minimal top bar with `Experience`, `Credentials`, `Contact`, and `Download CV`.
3. **`prefers-reduced-motion: reduce`**: no pinning, no scrub, no Lenis. Render all chapters as a normal stacked page in final state. 3D flower rendered once, no canvas petals.
4. **Mobile**: no 3D, shorter pins (max ~100vh), fewer particles, touch-friendly targets (≥ 44px). Avoid horizontal scroll sections.
5. **No scroll-jacking**: never override native scroll direction or block overscroll; Lenis only smooths.
6. Falling back to a normal static page must always be possible (no JS, WebGL unavailable, or "Skip story").

## 6. Content (use as is, do not invent figures)

**Name:** Fidela Andina
**Title:** Accounting & Finance Professional
**Location:** Indonesia
**Hero headline:** *Turning Financial Data Into Meaningful Insights.*
**Subtext:** An Accounting graduate with hands-on experience across auditing, taxation, financial analysis, and finance operations.
**Photo:** `/images/profile/fidela.jpg` (graduation photo; `next/image` with proper `sizes`)
**Hero key figures:** GPA 3.80 · Brevet AB · 5 internships/assistant roles at institutions (BPS, OJK, Pertamina Lubricants, RSM Indonesia, Directorate General of Taxes)

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

### Expertise
External Auditing · Financial Reporting & Analysis · Taxation · Finance Operations · Financial Administration

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

After the story, add a compact **Credentials** section (Education, Organizations, Certifications) with certification cards whose flower icon blooms on hover and keyboard focus (pure CSS).

## 7. Performance & quality

- Lighthouse (mobile): Performance ≥ 85 (pinned scenes are heavier), Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- LCP must be the hero text or photo; the 3D flower is lazy-loaded and never blocks it
- Pause all animation loops when the tab is hidden or the element is off-screen; cap WebGL pixel ratio at 2
- Avoid layout shift: reserve space for pinned sections (use `pinSpacing`) and images
- Animate only `transform` and `opacity`; avoid animating layout properties
- Clean up every ScrollTrigger, Lenis instance, and Three.js resource on unmount (`gsap.context().revert()`, `dispose()`)
- Accessibility: semantic HTML (`header`, `main`, `section`, `nav`), correct heading order, visible focus, skip link, `aria-hidden` on decorative SVG/canvas, chapter dots with accessible names and `aria-current`
- SEO: title, meta description, Open Graph image, `lang`, favicon (🌸 or SVG flower), sitemap, robots

## 8. Expected project structure

```
/app
  layout.tsx            # fonts, metadata, theme provider, Lenis provider
  page.tsx              # compose story + credentials + contact
  globals.css           # tokens (light + dark)
/components
  Nav.tsx  SkipStory.tsx  ChapterDots.tsx  AtAGlance.tsx
  Hero.tsx  Credentials.tsx  Contact.tsx  ThemeToggle.tsx
  story/
    Story.tsx           # orchestrates chapters and the master timeline
    Chapter.tsx         # generic pinned chapter wrapper
    scenes/             # TransactionScene, JournalScene, AuditScene,
                        # LedgerScene, OversightScene, ReportingScene, ClosingScene
  motion/
    BloomScene.tsx      # Three.js / R3F, next/dynamic
    PetalCanvas.tsx     # Canvas 2D petals
    GrowingVine.tsx     # SVG vine tied to overall progress
    BloomIcon.tsx       # CSS flower icon for cards
/data
  content.ts            # all content from Section 6 + chapter map from Section 4
/hooks
  useReducedMotion.ts  useMediaQuery.ts  useLenis.ts
/public
  /images/profile/fidela.jpg
  cv-fidela-andina.pdf
```

## 9. How to work

1. Show a **short plan** first (component structure, timeline strategy, mobile and reduced-motion approach), then build.
2. Build in stages, running `npm run build` and `npm run lint` after each:
   1. Project setup, tokens, fonts, theme toggle, Lenis + ScrollTrigger sync
   2. Static content version of every section (this is also the fallback and the "At a glance" view)
   3. Vine and chapter dots tied to scroll progress
   4. Chapters 1–7 one at a time (pinned scene + scrubbed timeline)
   5. Hero: 3D flower and petals
   6. Skip story, reduced motion, mobile variants
3. Do not add content, figures, or claims that are not in Section 6. If something is missing (e.g. the CV PDF), use a clear placeholder and list it in the final summary.
4. Final deliverable summary: how to run locally, how to deploy to Vercel, list of placeholders, Lighthouse results, and known limitations.

## 10. Acceptance checklist

- [ ] Hero shows name, headline, GPA, key figures, and Download CV without scrolling
- [ ] Seven chapters follow the accounting cycle in chronological order, each with a distinct scene
- [ ] One vine grows with overall progress and blooms a flower at each chapter; chapter dots are clickable
- [ ] Every chapter's text is real HTML, with full bullets available in a "Details" panel
- [ ] "Skip story" works and shows a compact at-a-glance summary
- [ ] Total story is about 8 screens, with no chapter pinned longer than 150vh
- [ ] `prefers-reduced-motion` renders a normal static page in final state
- [ ] Mobile has no 3D, shorter pins, and no horizontal scroll sections
- [ ] Light and dark modes work with AA contrast
- [ ] Content matches Section 6 exactly, with no invented data
- [ ] Build and lint pass, ready to deploy on Vercel
