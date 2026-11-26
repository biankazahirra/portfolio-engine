# Portfolio Engine

Reusable, data-driven foundation untuk portfolio website. Satu codebase dikonfigurasi untuk banyak orang.

**Prinsip:** build once, configure many times.

Pilot pertama: **Fidela Andina — Accounting & Finance Portfolio**.

## Status

- Arsitektur, theme, template, dan komponen reusable: siap.
- Pilot Fidela: tampil lengkap, kecuali CV yang sengaja ditahan.
- Live: `https://fidelaandina.vercel.app`.
- Sudah di-push ke GitHub dan di-deploy ke Vercel.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
npm run start      # menjalankan hasil build
```

Node.js 20.9 atau lebih baru diperlukan (Next.js 16).

## Stack

Next.js App Router · React · TypeScript · Tailwind CSS 4 · Zod · Lucide React.

Tanpa backend, database, auth, CMS, atau dashboard. Motion memakai CSS untuk transisi dan GSAP + ScrollTrigger untuk reveal judul per kata.

## Struktur singkat

```
src/
├── app/                  # layout, page, globals.css
├── components/
│   ├── shared/           # button, heading, divider, metadata
│   ├── layout/           # navigation, footer, container
│   └── sections/         # section presentational
├── config/               # portfolio, sections, site
├── content/fidela/       # konten pilot
├── lib/validation/       # schema Zod
├── templates/editorial/  # template + section registry
├── themes/accounting-editorial/
└── types/                # tipe konten
```

## Alur singkat

`config` → validasi Zod → `EditorialTemplate` → `section-registry` → section aktif sesuai urutan.

Konten pribadi tidak pernah ditaruh di komponen shared. Warna, font, dan spacing hanya di token CSS.

## Dokumen

- `docs/ARCHITECTURE.md` — arsitektur dan batas layer.
- `docs/CONTENT_SCHEMA.md` — tipe dan aturan konten.
- `docs/DESIGN_SYSTEM.md` — token visual dan perilaku mobile/desktop.
- `docs/ADDING_A_PORTFOLIO.md` — langkah membuat portfolio baru.
- `docs/CONTENT_VERIFICATION.md` — verifikasi pilot terhadap CV.
- `docs/QA_REPORT.md` — hasil QA Phase 5.

## Batasan diketahui

- CV sengaja tidak dipasang karena memuat nomor telepon; menunggu izin tertulis.
- Master spec `AI_INSTRUCTIONS/PORTFOLIO_ENGINE_MASTER_SPEC.md` masih memuat nomor telepon. Perlu disunting sebelum repo publik di-push.
- Satu theme (`accounting-editorial`), satu template (`editorial`).
- Tidak ada pengujian unit framework; verifikasi memakai typecheck, build, dan QA browser.

## Deploy

Vercel direkomendasikan. Import repository, biarkan preset Next.js, lalu deploy. Jalankan `npm run build` lokal terlebih dahulu. **Deploy tidak boleh dilakukan tanpa persetujuan owner.**
