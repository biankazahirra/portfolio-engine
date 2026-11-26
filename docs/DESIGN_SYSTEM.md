# Design System

Theme awal: **Accounting Editorial**. Template awal: **Editorial**. Spesifikasi lengkap ada di `docs/superpowers/specs/2026-11-26-portfolio-engine-phase2-design-system.md`.

## Warna

| Token | Nilai | Peran |
|---|---|---|
| `--color-ivory` | `#F5F1E8` | Latar halaman |
| `--color-forest` | `#183C32` | Judul, CTA, permukaan gelap |
| `--color-gold` | `#B59A64` | Garis, aksen, penanda |
| `--color-charcoal` | `#292A28` | Teks tubuh |
| `--color-gray` | `#E5E1D8` | Border, permukaan sekunder |
| `--color-white` | `#FFFFFF` | Permukaan kartu |

Alias: `--color-bg`, `--color-surface`, `--color-surface-muted`, `--color-text`, `--color-heading`, `--color-accent`, `--color-border`, `--color-on-dark`.

Gold tidak dipakai untuk teks tubuh di atas ivory. Teks di atas forest memakai ivory.

## Tipografi

- Headings: Fraunces (serif hangat, profesional, tidak kaku).
- Body: DM Sans.
- Metadata: IBM Plex Mono.

Skala memakai `clamp`, dari 0.75rem untuk eyebrow sampai 4.5rem untuk H1 desktop.

## Spacing dan layout

- Skala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Container: 1120px (konten), 1280px (lebar), 68ch (bacaan).
- Gutter: 24px mobile, 40px tablet, 64px desktop.
- Breakpoint: 640, 768, 1024, 1280px.
- Radius: 2px. Divider: 1px.

## Struktur section

Gold rule → eyebrow mono bernomor → H2 serif → konten. Nomor dihitung dari urutan section aktif.

## Komponen

- Button primer: forest + teks ivory; sekunder: border forest + teks forest. Minimum 44px.
- Card: white, border gray, radius 2px.
- Focus-visible: outline gold 2px, offset 2px.
- Target sentuh minimum 44px.

## Desktop vs mobile

Desktop ≥1024px memakai komposisi editorial dua kolom: hero 3fr/2fr, timeline rail 200px, expertise dua kolom.

Mobile <768px bukan desktop yang diperkecil:

- nav jadi panel toggle;
- hero satu kolom, CTA penuh lebar, portrait 3/4;
- metadata vertikal;
- bullet 16px, expertise 22px;
- email `clamp(1.25rem, 7vw, 1.5rem)` dengan `overflow-wrap: anywhere`;
- tautan dan footer ditumpuk.

## Motion

CSS untuk transisi dan GSAP + ScrollTrigger untuk judul. Prinsip: gerak hanya untuk memandu perhatian, memakai `opacity` dan `transform` agar tidak menggeser layout.

- Judul H1/H2 dirender per kata oleh `AnimatedTitle`. ScrollTrigger memicu reveal saat judul masuk 88% viewport, dengan stagger 80ms per kata dan durasi 550ms.
- Card/entri (timeline, expertise, education, organization, certification) memakai `MotionItem` dari Motion: masuk naik 16px saat masuk viewport, hover naik 3px, durasi 450ms, stagger 50ms per entri maksimal 300ms.
- Keduanya memakai `transform` saja, tanpa `opacity`, agar kontras teks tetap penuh. `prefers-reduced-motion` menonaktifkan keduanya.
- Hero, navigasi, tombol, dan tautan tetap memakai transisi CSS.

- Hero: stagger fade-up 550ms dengan delay 40–270ms untuk eyebrow, judul, ringkasan, CTA, dan portrait.
- Section: reveal naik 500ms saat elemen masuk viewport, via `animation-timeline: view()` di dalam `@supports`. Memakai `transform` saja tanpa `opacity` agar teks tetap memenuhi kontras saat diaudit. Browser yang tidak mendukung menampilkan konten tanpa animasi.
- Gold rule tumbuh dari kiri 400ms.
- Hover/focus: underline nav 180ms, panah tombol 150ms, underline email 220ms, portrait 300ms.
- Dua entri berturut-turut diberi `animation-range` sedikit berbeda sebagai stagger ringan.
- `prefers-reduced-motion: reduce` mematikan semua animasi dan transisi.
- Smooth scroll memakai Lenis (durasi 1.05s) dan disinkronkan dengan GSAP ScrollTrigger lewat ticker. Anchor link ditangani Lenis (`anchors: true`), yang menghormati `scroll-margin-top` agar judul tidak tertutup header.
