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

Next.js App Router · React · TypeScript · Tailwind CSS 4 · Zod · Lucide React · GSAP + ScrollTrigger · Motion · Lenis · Three.js · Canvas 2D.

Tanpa backend, database, auth, CMS, atau dashboard. Tema "annual report + ledger + garden": light/dark, bunga 3D lazy di desktop, kelopak jatuh via Canvas 2D, batang tumbuh saat scroll, kartu berbunga saat hover/fokus. GSAP untuk judul per kata dan batang, Motion untuk entrance dan hover kartu, Lenis untuk smooth scroll. Framer Motion tidak dipakai.

## Struktur singkat

```
src/
├── app/                  # layout, page, globals.css
├── components/
│   ├── shared/           # button, heading, metadata, bloom icon
│   ├── layout/           # navigation, footer, container, smooth scroll
│   ├── sections/         # section presentational
│   └── motion/           # bloom scene, petals, vine, reveal managers
├── config/               # portfolio, sections, site, SEO
├── content/fidela/       # konten pilot
├── lib/                  # motion core + schema Zod
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

- CV sengaja tidak dipasang karena memuat nomor telepon; tombol "Request CV" memakai email.
- Nomor telepon di master spec sudah diredaksi; belum ada izin publikasi.
- Bunga 3D hanya dimuat di layar ≥1024px; di mobile memakai SVG statis agar performa tetap ringan.
- Satu theme (`accounting-editorial`), satu template (`editorial`).
- Tidak ada pengujian unit framework; verifikasi memakai typecheck, build, dan QA browser.

## Deploy

Vercel direkomendasikan. Import repository, biarkan preset Next.js, lalu deploy. Jalankan `npm run build` lokal terlebih dahulu. **Deploy tidak boleh dilakukan tanpa persetujuan owner.**
