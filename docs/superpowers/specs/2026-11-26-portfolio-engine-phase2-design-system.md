# Portfolio Engine — Phase 2: Design System & UI/UX Proposal

Tanggal: 2026-11-26
Status: **Proposal. Menunggu persetujuan owner.**

Berdasarkan Phase 1 (`2026-11-26-portfolio-engine-phase1-design.md`) dan template **Editorial** + theme **Accounting Editorial** yang sudah disetujui.

## 1. Arah visual

Jurnal akuntansi editorial, bukan dashboard keuangan:

- Latar ivory seperti halaman kertas.
- Tipografi serif untuk judul, sans untuk tubuh teks, mono untuk metadata.
- Garis tipis, spasi besar, hierarki jelas.
- Aksen emas sebagai penanda, bukan warna teks utama.
- Animasi minimal dan purposeful, CSS saja.

## 2. Token warna

Nilai mentah (sumber: spec):

| Token | Nilai | Peran |
|---|---|---|
| `--color-ivory` | `#F5F1E8` | Latar halaman |
| `--color-forest` | `#183C32` | Judul, permukaan gelap, CTA primer |
| `--color-gold` | `#B59A64` | Aksen, garis, penanda numerik |
| `--color-charcoal` | `#292A28` | Teks tubuh |
| `--color-gray` | `#E5E1D8` | Permukaan sekunder, border |
| `--color-white` | `#FFFFFF` | Permukaan kartu/paper |

Alias semantik:

```
--color-bg            = ivory
--color-surface       = white
--color-surface-muted = gray
--color-text          = charcoal
--color-heading       = forest
--color-accent        = gold
--color-border        = gray
--color-on-dark       = ivory
```

**Aturan kontras:** charcoal di atas ivory dan forest di atas ivory aman untuk teks. Gold di atas ivory **tidak** dipakai untuk teks tubuh (kontras rendah). Gold dipakai untuk garis, bulatan, angka indeks, dan label kecil di atas forest (minimum 14px/600). Teks di atas forest memakai ivory.

## 3. Tipografi

Font dimuat via `next/font/google`: Fraunces, DM Sans, IBM Plex Mono.

| Peran | Font | Ukuran (fluid) | Line-height | Tracking |
|---|---|---|---|---|
| Display / hero H1 | Fraunces 500 | `clamp(2.75rem, 6vw, 4.5rem)` | 1.05 | `-0.02em` |
| Section H2 | Fraunces 500 | `clamp(1.875rem, 3.5vw, 2.75rem)` | 1.15 | `-0.01em` |
| Entry H3 | Fraunces 500 | `clamp(1.25rem, 2vw, 1.5rem)` | 1.25 | 0 |
| Eyebrow (mono) | IBM Plex Mono 500 | `0.75rem` | 1.4 | `0.14em`, uppercase |
| Body | DM Sans 400 | `1rem` | 1.7 | 0 |
| Lead | DM Sans 400 | `clamp(1.0625rem, 1.6vw, 1.25rem)` | 1.6 | 0 |
| Metadata | IBM Plex Mono 400 | `0.8125rem` | 1.5 | `0.04em` |
| Small | DM Sans 400 | `0.875rem` | 1.6 | 0 |

Aturan: satu H1 per halaman. Setiap section punya satu H2. H3 hanya untuk entri di dalam section.

## 4. Spacing, container, breakpoint

Skala spacing: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128` px → `--space-1 … --space-10`.

- Section padding vertikal: `96px` desktop, `64px` mobile.
- Jarak antar entri timeline: `48px`.
- Container konten: `max-width: 1120px`.
- Container lebar (hero/footer): `max-width: 1280px`.
- Lebar bacaan: `68ch`.
- Gutter: `24px` mobile, `40px` tablet, `64px` desktop.

Breakpoint mobile-first: `sm 640px`, `md 768px`, `lg 1024px`, `xl 1280px`.

Divider: `1px solid var(--color-border)`. Aksen section: garis gold `2px × 32px` di atas eyebrow. Radius: `2px` (kartu dan tombol), tidak ada radius besar.

## 5. Struktur section umum

Setiap section (kecuali hero) mengikuti pola:

```
[gold rule 2×32]
[eyebrow mono]   01 / EXPERIENCE
[H2 serif]       Professional Experience
[opsional lead]
[divider]
[content]
```

Eyebrow dan nomor berasal dari konfigurasi section, bukan hardcode per-orang. Nomor dihitung dari urutan section aktif.

## 6. Komponen UI

### Button
- Primer: background forest, teks ivory, radius 2px, padding `12px 24px`, label mono uppercase 0.75rem/500.
- Sekunder: transparan, border 1px forest, teks forest.
- Hover: transisi 150ms, primer sedikit gelap, sekunder background gray.
- Focus-visible: outline gold 2px, offset 2px.
- Target sentuh minimum 44px.

### Card
- Background white, border 1px gray, radius 2px, padding `24px`.
- Hover: border forest. Tanpa shadow berat, tanpa efek angkat.

### Metadata / divider
- Metadata: IBM Plex Mono, warna forest atau charcoal tergantung latar.
- Divider: hairline gray; untuk pemisah utama antar section bisa gold 1px dengan opacity 0.5.

## 7. Layout per section

### Navigation
- Header sticky di atas, background ivory solid, border bawah 1px gray.
- Kiri: `profile.name` dalam Fraunces 1.125rem (dari props, bukan hardcode).
- Kanan: tautan anchor ke section aktif. Label: About, Experience, Expertise, Education, Organizations, Certifications, Contact.
- Hero tidak punya tautan tersendiri; logo/name menuju `#top`.
- Mobile (<768px): tautan disembunyikan, tombol toggle menu. Menu vertikal di bawah header, ditutup saat tautan diklik atau Esc ditekan.
- `aria-expanded`, `aria-controls`, dan fokus keyboard wajib.

### Hero
Desktop (`lg`): grid 3fr/2fr.
- Kiri: eyebrow mono "ACCOUNTING & FINANCE", H1 dari `profile.headline` (fallback `profile.title`), lead dari `profile.summary`, dua CTA: "View experience" (anchor) dan "Download CV" (jika `cvFile` ada).
- Kanan: portrait rasio 4/5, `object-fit: cover`, border 1px gray, radius 2px, caption mono dari `profile.location`.
- Bawah: hairline + baris metadata (title, location) dalam mono.

Mobile: satu kolom, teks lalu portrait, CTA full-width bertumpuk. Portrait tetap tampil.

### About
- Grid 1fr/4fr di desktop: kolom kiri label mono "PROFILE", kanan paragraf dengan lebar `68ch`.
- Mobile: label di atas paragraf.

### Experience
- Reverse kronologis sesuai config konten.
- Desktop: grid `200px 1fr`; kiri periode mono gold uppercase, kanan konten.
- Garis vertikal 1px gray di sela kolom, titik gold 6px di setiap entri.
- Konten: H3 `position` + "at `organization`" dalam DM Sans, location mono, daftar tanggung jawab dengan bullet kotak kecil gold 4px.
- Mobile: periode di atas judul, garis di tepi kiri konten.
- **Semua tanggung jawab ditampilkan.** Tidak ada truncation/expandable di v1.

### Expertise
- Daftar area dalam grid 2 kolom di desktop, 1 kolom di mobile.
- Tiap item: indeks mono gold `01`, garis horizontal, nama area Fraunces 1.25rem.
- **Tanpa persentase, progress bar, atau rating** sesuai larangan spec.

### Education
- Satu blok: H3 degree, institution, periode mono, IPK sebagai metadata mono dengan label "GPA".
- Tidak ada klaim tambahan.

### Organizations
- Organization name sebagai H3.
- Tiap peran: judul + periode mono, lalu highlight bullets dengan gaya sama seperti experience.

### Certifications
- Baris tabel sederhana: issuer — title, tahun mono rata kanan.
- Pemisahhairline antar baris.

### Contact
- H2 besar dengan serif, satu paragraf pendek.
- Email sebagai tautan `mailto:` dengan gaya Fraunces 1.5rem dan underline gold 1px saat hover.
- LinkedIn dan portfolio reference sebagai tautan teks mono.
- **Nomor telepon tidak ditampilkan.**

### Footer
- Nama, title, tautan kembali ke atas, satu baris metadata mono.
- Gunakan tahun saat build, bukan hardcode.

## 8. Perilaku mobile — komposisi tersendiri

Mobile **bukan** layout web yang diperkecil. Di bawah 768px engine memakai hierarki dan ritme sendiri, bukan hasil shrink desktop.

**Navigasi**
- Header 64px, brand dipotong dengan ellipsis jika nama panjang.
- Menu toggle membuka panel penuh lebar di bawah header.
- Tiap tautan menu tinggi minimum 48px, font 14px, spasi 32px antar entri.
- Tidak ada hover-only affordance.

**Hero**
- Satu kolom, urutan: eyebrow → H1 → ringkasan → CTA → portrait → metadata.
- H1 tidak dibatasi `16ch`; memakai `clamp(2.25rem, 11vw, 3rem)`, line-height 1.1.
- CTA ditumpuk penuh lebar, tinggi minimum 44px.
- Portrait rasio 3/4, lebar maksimal 320px, di tengah.
- Metadata vertikal, bukan baris horizontal.

**Konten**
- Timeline: periode di atas judul, garis di tepi kiri, tidak ada rail 200px.
- Bullet responsibilitas naik ke 16px.
- Expertise satu kolom dengan padding lebih besar dan nama 22px.
- Education metadata vertikal.
- Certifikasi satu kolom: issuer, judul, lalu tahun.
- Email kontak `clamp(1.25rem, 7vw, 1.5rem)`, `overflow-wrap: anywhere`.
- Tautan kontak dan footer minimum 44px, ditumpuk.
- Metadata naik ke 14px.

**Umum**
- Gutter 24px, padding section 64px, hero 48px atas.
- Tidak ada horizontal scroll pada 360px viewport.
- Semua interaksi bisa tanpa mouse.

**Desktop (≥1024px)** tetap komposisi editorial dua kolom: hero 3fr/2fr, timeline rail 200px, expertise dua kolom. Tablet 768–1023px memakai aturan desktop dengan gutter 40px.

## 9. Interaksi & motion

- CSS-only. Tanpa Framer Motion (disetujui owner di Phase 1).
- Transisi hover/focus: `150ms ease`.
- Hero fade-in sekali saat load: `400ms ease-out`; tidak ada animasi scroll-trigger.
- `@media (prefers-reduced-motion: reduce)`: semua transisi dan animasi dimatikan.
- `scroll-behavior: smooth` dengan pengecualian reduced-motion.
- `scroll-margin-top` pada section = tinggi header sticky + 16px.
- Focus-visible gold outline di semua elemen interaktif.
- Skip link "Skip to content" sebagai elemen pertama di layout.

## 10. Aksesibilitas

- Landmark semantik: `header`, `nav`, `main`, `section`, `footer`.
- `alt` portrait berasal dari config, bukan string hardcode di komponen.
- Urutan heading H1 → H2 → H3 tanpa lompatan.
- Tautan eksternal membuka tab yang sama kecuali ditentukan lain; jika `target="_blank"`, wajib `rel="noopener noreferrer"`.
- Kontras mengikuti aturan di bagian 2.

## 11. Keputusan desain yang saya ambil

- **Bahasa UI chrome:** Inggris (About, Experience, View experience, Download CV), mengikuti bahasa konten pilot di spec. Bisa diubah lewat config jika owner mau.
- **Tidak ada expandable content:** konten pilot pendek, semua ditampilkan.
- **Nomor section otomatis:** dihitung dari urutan section aktif, bukan disimpan manual.
- **Tidak ada card pada experience:** timeline lebih sesuai arah jurnal daripada kotak-kotak kartu.

## 12. Yang tidak dibuat di Phase 2

Kode, file komponen, dependency, instalasi, aset, dan konten Fidela. Ini murni spesifikasi visual.

## 13. Persetujuan

Owner diminta menyetujui:
1. Token warna, tipografi, spacing, dan breakpoint di atas.
2. Layout per section dan perilaku mobile.
3. Aturan interaksi/motion CSS-only.
4. Empat keputusan desain di bagian 11.

**Langkah berikutnya setelah disetujui:** Phase 3 — Core Engine Implementation.
