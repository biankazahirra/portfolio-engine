# Portfolio Engine — Phase 1: Architecture & Technical Design

Tanggal: 2026-11-26
Status: **Proposal. Menunggu persetujuan owner.**

## 1. Maksud

Menerjemahkan `AI_INSTRUCTIONS/PORTFOLIO_ENGINE_MASTER_SPEC.md` menjadi desain teknis yang bisa dipakai Phase 3 tanpa mengubah arsitektur, scope, atau desain yang sudah disetujui.

Satu prinsip utama: **build once, configure many times**. Engine tidak boleh tahu bahwa pilot pertamanya adalah akuntan.

## 2. Tujuan, non-tujuan, anti-tujuan

**Tujuan:** codebase statis yang dapat dikonfigurasi ulang untuk orang lain tanpa menyentuh komponen bersama.

**Non-tujuan:** SaaS, auth, database, CMS, dashboard, billing, CV parsing, deployment otomatis, plugin system, template kedua, theme kedua.

**Anti-tujuan (gagal walau berjalan):** konten Fidela menempel di komponen shared; warna/spacing hardcode tersebar; section tidak bisa dimatikan; engine jadi spesifik akuntansi.

## 3. Keputusan yang sudah mengikat

Dari spec + persetujuan owner:

- Arsitektur: Data-Driven Modular Portfolio Engine, lima layer.
- Satu portofolio per deployment.
- Template hanya `editorial`; theme hanya `accounting-editorial`.
- Stack: Next.js App Router, TypeScript, Tailwind CSS.
- Zod untuk validasi di boundary konfigurasi.
- Folder lokal sebagai workspace; GitHub sebagai tujuan simpan.
- `git init -b main` + `origin` sudah dilakukan. **Belum ada commit, belum ada push.**
- Nomor telepon tidak masuk repo publik sampai ada izin tertulis terpisah.

## 4. Pendekatan yang dipertimbangkan

### 4.1 Komposisi aplikasi

Satu `page.tsx` yang memuat satu konfigurasi dan merender satu template. Tidak ada routing dinamis per-orang, tidak ada multi-tenant. Ini satu-satunya pilihan yang cocok dengan "satu portofolio per deployment". Alternatif dynamic route `[slug]` ditolak: menambah kompleksitas tanpa kebutuhan.

### 4.3 Animasi — Butuh keputusan owner

| Opsi | Trade-off |
|---|---|
| **CSS transition/animation (rekomendasi)** | Cukup untuk fade/slide ringan. Nol dependency tambahan. Server Component tetap murni. |
| Framer Motion (ada di daftar stack spec) | API lebih kaya, tapi butuh Client Component untuk bagian yang beranimasi dan menambah dependency untuk efek yang masih bisa dilakukan CSS. |

Rekomendasi: **tunda Framer Motion**. Pakai CSS untuk motion minimal sesuai spec. Jika Phase 2 meminta interaksi yang benar-benar tidak bisa dilakukan CSS, baru tambahkan dengan persetujuan owner.

### 4.3 Validasi

Zod schema paralel dengan tipe TypeScript, dipanggil sekali di `page.tsx` lewat `parsePortfolioConfig(input: unknown): PortfolioConfig`. Error yang gagal di-build lebih baik daripada halaman yang tampil dengan data cacat. Tidak ada fallback diam.

### 4.4 Bentuk konfigurasi section

Array of objects, bukan array string polos, agar setiap section punya `enabled`, `heading`, dan bisa diurutkan:

```ts
sections: [
  { id: "hero", enabled: true },
  { id: "about", enabled: true, heading: "Profil" },
  { id: "experience", enabled: true },
  // ...
]
```

Tidak ada field `variant` sebelum ada kasus pakai nyata. Tidak ada page-builder schema.

### 4.5 Sumber kebenaran token tema

CSS custom properties di `themes/accounting-editorial/tokens.css` sebagai **satu-satunya sumber warna, font, spacing, radius, shadow, dan lebar kontainer**. `theme.ts` hanya menyimpan identitas theme dan nama font yang dipakai `layout.tsx`. Tidak ada objek token TypeScript yang menduplikasi nilai CSS.

## 5. Model data (usulan tipe)

Semua di `src/types/`. String periode dipakai apa adanya (`"December 2025 — June 2026"`) agar tidak mengubah fakta CV menjadi rentang tanggal yang bisa salah dibaca.

```ts
// profile.ts
export interface Profile {
  name: string;
  title: string;
  location?: string;
  email: string;
  linkedin?: string;
  portfolioReference?: string;
  headline?: string;
  summary?: string;
  portrait?: string;   // path di /public
  cvFile?: string;     // path di /public
}

// experience.ts
export interface Experience {
  organization: string;
  position: string;
  location?: string;
  period: string;
  responsibilities: string[];
}

// education.ts
export interface Education {
  institution: string;
  location?: string;
  degree: string;
  period: string;
  gpa?: string;
}

// expertise.ts
export interface Expertise {
  areas: string[];     // area exposure, TANPA persentase/level
}

// certification.ts
export interface Certification {
  issuer: string;
  title: string;
  year: number;
}

// organization.ts
export interface Organization {
  name: string;
  roles: Array<{
    title: string;
    period: string;
    highlights: string[];
  }>;
}

// section.ts
export type SectionId =
  | "hero" | "about" | "experience" | "expertise"
  | "education" | "organizations" | "certifications" | "contact";

export interface SectionConfig {
  id: SectionId;
  enabled: boolean;
  heading?: string;
}

// portfolio.ts
export interface PortfolioConfig {
  id: string;
  template: "editorial";
  theme: "accounting-editorial";
  site: { title: string; description: string };
  profile: Profile;
  sections: SectionConfig[];
  content: {
    experience: Experience[];
    education: Education[];
    expertise: Expertise;
    organizations: Organization[];
    certifications: Certification[];
  };
}
```

Catatan: tipe `Project` **tidak dibuat** dulu. Spec tidak memasukkan `projects` ke daftar section pilot dan tidak ada proyek yang boleh diinventarisasi. Tambahkan hanya saat ada konten asli dan persetujuan.

Nomor telepon **tidak ada di model**. Jika izin publishing datang, baru ditambahkan sebagai field opsional.

## 6. Theme configuration

Token CSS: `--color-ivory`, `--color-forest`, `--color-gold`, `--color-charcoal`, `--color-gray`, `--color-white`; font `--font-heading`, `--font-body`, `--font-mono`; spacing/radius/shadow/container-width/section-spacing.

Font dimuat di `layout.tsx` lewat `next/font/google`: Fraunces, DM Sans, IBM Plex Mono. Tidak ada dependency font tambahan.

## 7. Template responsibilities

`EditorialTemplate` menerima `PortfolioConfig`, mengambil `section-registry.ts` (peta `SectionId` → komponen React), lalu merender hanya section dengan `enabled: true` **dalam urutan array**. Template tidak mengimpor data Fidela. Template tidak mengatur warna.

`section-registry.ts` adalah objek statis, bukan plugin system.

## 8. Peta tanggung jawab komponen

| Grup | Komponen | Tugas | Client? |
|---|---|---|---|
| shared | `button`, `section-heading`, `divider`, `metadata` | Presentasi murni, prop-typed | Tidak |
| layout | `page-container` | Lebar kontainer + padding responsif | Tidak |
| layout | `site-navigation` | Navigasi anchor + toggle mobile | Ya (toggle saja) |
| layout | `site-footer` | Identitas + tautan kontak | Tidak |
| sections | `hero-section` | Headline, ringkasan, portrait | Tidak |
| sections | `about-section` | Profil naratif | Tidak |
| sections | `experience-section` | Timeline reverse-kronologis | Tidak |
| sections | `expertise-section` | Daftar area, tanpa rating | Tidak |
| sections | `education-section` | Pendidikan + IPK | Tidak |
| sections | `organizations-section` | Peran + highlight | Tidak |
| sections | `certifications-section` | Daftar sertifikasi | Tidak |
| sections | `contact-section` | Email + tautan eksternal | Tidak |

Aturan: komponen section menerima data lewat props, tidak mengimpor file konten.

## 9. Struktur folder

```
portfolio-engine/
├── public/
│   ├── images/profile/      # kosong sampai aset disetujui
│   └── documents/           # kosong sampai CV disetujui
├── src/
│   ├── app/{layout.tsx,page.tsx,globals.css}
│   ├── components/{shared,layout,sections}/
│   ├── config/{portfolio.config.ts,sections.config.ts,site.config.ts}
│   ├── content/fidela/{profile,experience,education,skills,
│   │                   certifications,organizations}.ts
│   ├── templates/editorial/{editorial-template.tsx,section-registry.ts}
│   ├── themes/accounting-editorial/{theme.ts,tokens.css}
│   ├── lib/validation/portfolio-schema.ts
│   └── types/*.ts
├── docs/
│   ├── ARCHITECTURE.md, CONTENT_SCHEMA.md,
│   ├── DESIGN_SYSTEM.md, ADDING_A_PORTFOLIO.md
│   └── superpowers/specs/2026-11-26-portfolio-engine-phase1-design.md
├── AI_INSTRUCTIONS/PORTFOLIO_ENGINE_MASTER_SPEC.md
├── package.json
└── README.md
```

File dibuat hanya saat Phase 3/4/5/6 membutuhkannya.

## 10. Alur rendering

1. `page.tsx` (Server Component) mengimpor `portfolioConfig`.
2. `parsePortfolioConfig` memvalidasi; gagal = build error dengan pesan jelas.
3. `layout.tsx` memuat font, CSS globals + tokens, dan metadata dari config.
4. `<EditorialTemplate config={...} />` merender section aktif sesuai urutan.
5. Client Component hanya untuk toggle navigasi mobile.

## 11. Dependency & justifikasi

| Dependency | Justifikasi | Status |
|---|---|---|
| `next`, `react`, `react-dom` | Framework & runtime, sesuai spec | Disetujui spec |
| `typescript`, `@types/*` | Type safety & DX | Disetujui spec |
| `tailwindcss`, `postcss`, `autoprefixer` | Styling utility + token CSS | Disetujui spec |
| `zod` | Validasi konfigurasi di boundary | Disetujui spec |
| `lucide-react` | Ikon navigasi/kontak, tree-shakeable | Disetujui spec |
| `framer-motion` | **Ditunda** — CSS cukup untuk motion minimal | **Perlu keputusan owner** |

Tidak ada backend, database, auth, CMS, atau alat deployment.

## 12. Urutan implementasi (Phase 3, mengikuti spec)

1. Design tokens + theme + font.
2. Primitive layout (`page-container`).
3. Navigasi + footer.
4. Section heading + elemen umum.
5. Tipe konten + konfigurasi.
6. Validasi Zod.
7. Komposisi Editorial Template.
8. Section registry + ordering.
9. Responsive + aksesibilitas dasar.
10. Type-check + production build.

## 13. Risiko & hal yang perlu owner

- Aset dan CV belum ada di repo. Phase 4 tidak bisa verifikasi fakta tanpa file itu.
- Remote GitHub punya satu commit (`README.md`); lokal punya spec tapi belum ada commit. Sebelum push pertama, perlu gabungkan riwayat (`git pull origin main --allow-unrelated-histories`), **bukan force push**. Push butuh persetujuan terpisah.
- Repo publik: jangan pernah memasukkan nomor telepon ke config/content/doc sebelum izin tertulis.
- Keputusan owner: setuju menunda `framer-motion`?
- Keputusan owner: setuju model data dan struktur folder di atas?

## 14. Langkah berikutnya

Owner menyetujui dokumen ini → Phase 2 (Design System & UI/UX Proposal). Tidak ada kode aplikasi yang ditulis sebelum Phase 2 dan Phase 3 disetujui.
