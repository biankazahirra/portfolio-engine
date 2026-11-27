# Design System

Theme: **Accounting Editorial** dengan arah "annual report + ledger + garden". Template: **Editorial**. Spesifikasi lengkap ada di `docs/superpowers/specs/2026-11-26-portfolio-engine-phase2-design-system.md`.

## Warna

Token light (default) dan dark (auto `prefers-color-scheme` + toggle manual).

| Token | Light | Dark | Peran |
|---|---|---|---|
| `--color-bg` | `#FBF7F2` | `#171A17` | Latar halaman |
| `--color-text` | `#2A2B26` | `#ECE8E0` | Teks tubuh |
| `--color-muted` | `#5E6258` | `#A9AEA3` | Metadata |
| `--color-surface` | `#FFFFFF` | `#1F2420` | Kartu |
| `--color-border` | `#E6DFD3` | `#2E352F` | Garis ledger |
| `--color-accent` | `#4F7A5A` | `#86B993` | Sage, aksen utama |
| `--color-bloom` | `#E98FA6` | `#E98FA6` | Blush, detail bunga |
| `--color-gold` | `#F2C14E` | `#F2C14E` | Putik bunga, aksen contact |

Sage dipakai untuk aksi dan penanda. Blush hanya untuk bunga. Kontras teks minimal WCAG AA 4.5:1.

## Tipografi

- Headings: Fraunces (serif hangat, profesional).
- Body: Inter.
- Metadata, nomor, tanggal: IBM Plex Mono dengan `tabular-nums`.

Skala memakai `clamp`, dari 0.6875rem untuk label sampai 5.5rem untuk H1 desktop.

## Spacing dan layout

- Skala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.
- Container: 1120px (konten), 1280px (lebar), 68ch (bacaan).
- Gutter: 24px mobile, 40px tablet, 64px desktop.
- Radius: 4px (kartu 14px). Divider ledger: 1px.

## Struktur section

Lima tautan nav: About, Experience, Expertise, Credentials, Contact. Credentials berisi Education, Organizations, Certifications sebagai sub-bagian. Gold rule → eyebrow mono bernomor `01 / About` → H2 serif → konten. Nomor dihitung dari section aktif tanpa hero.

Experience memakai journal rows: Period · Position & Organization · Contribution, dengan accordion native `<details>` dan ringkasan satu baris saat tertutup.

## Komponen

- Button primer: sage + teks kontras; sekunder: border sage, transparan. Minimum 46px, bentuk pill.
- Kartu: `surface`, border `line`, radius 14px, hover naik 3px via Motion.
- Bunga CSS (`BloomIcon`): enam kelopak blush + putik gold; mekar saat hover/fokus kartu.
- Fokus: outline sage 2px, offset 3px. Target sentuh ≥44px.

## Desktop vs mobile

Desktop ≥900px memakai komposisi dua kolom: hero copy + portrait/bunga, expertise tiga kolom, sertifikasi dua kolom. Bunga 3D dimuat hanya ≥1024px.

Mobile <768px bukan desktop yang diperkecil:

- nav jadi panel hamburger; theme toggle tetap terlihat;
- hero satu kolom, CTA penuh lebar, portrait 4/5, bunga SVG statis;
- journal satu kolom: period di atas, bunga di rail kiri;
- metadata vertikal, kartu satu kolom;
- email `clamp(1.25rem, 7vw, 1.75rem)` dengan `overflow-wrap: anywhere`.

## Motion

Prinsip: halus, bermakna, ringan. Gerak memakai `transform` saja agar kontras teks tidak turun saat audit.

- Judul H1/H2 dirender per kata oleh `AnimatedTitle` (server). `TitleReveal` memakai satu instance GSAP + ScrollTrigger untuk semua judul: reveal saat masuk 88% viewport, stagger 80ms, durasi 550ms.
- `CardMotion` memakai `animate` dari Motion untuk card: masuk naik 16px saat masuk viewport (stagger 50ms, maks 300ms), hover naik 3px.
- `GrowingVine` menggambar batang SVG dengan `strokeDashoffset` dan ScrollTrigger `scrub`.
- `VineFlower` mekar via `animation-timeline: view()`; fallback menampilkan bunga final.
- `PetalCanvas` menggambar 26 kelopak (10 di layar kecil), berhenti saat off-screen atau tab tidak aktif.
- `BloomScene` memuat Three.js secara lazy di desktop ≥1024px setelah 500ms; bunga empat cincin kelopak, animasi `back.out`, mengikuti pointer dengan lerp, pixel ratio ≤2, render berhenti saat off-screen. WebGL tidak tersedia → SVG statis.
- Lenis smooth scroll (1.05s) disinkronkan lewat `gsap.ticker`; `anchors: true` menghormati `scroll-margin-top`.
- `prefers-reduced-motion: reduce` mematikan Lenis, kanvas, reveal, dan mekar; bunga 3D dirender sekali dalam keadaan final.
- SEO: favicon SVG bunga, Open Graph image, `sitemap.xml`, `robots.txt`, theme-color per skema.
