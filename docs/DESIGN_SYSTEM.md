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

CSS-only. Transisi 150ms, hero fade 400ms saat load. `prefers-reduced-motion: reduce` mematikan semua animasi. Smooth scroll dengan `scroll-margin-top` setinggi header + 16px.
