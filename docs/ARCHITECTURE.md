# Arsitektur

Portfolio Engine memakai **Data-Driven Modular Portfolio Engine**. Tujuannya: ui reusable, konten dan tema terpisah.

## Lima layer

```
Individual Portfolio Configuration
        ↓
Content Layer
        ↓
Theme Layer
        ↓
Template / Page Composition
        ↓
Reusable Section Components
        ↓
Portfolio Website
```

### 1. Content Layer

Semua data pribadi ada di `src/content/<person>/` dan dirakit di `src/config/portfolio.config.ts`.

Aturan: tidak ada nama, riwayat kerja, pendidikan, kontak, atau profesi yang di-hardcode di komponen shared.

### 2. Theme Layer

`src/themes/accounting-editorial/tokens.css` adalah satu-satunya sumber warna, font, spacing, radius, container, dan motion value. `theme.ts` hanya identitas theme.

Tidak ada objek token TypeScript yang menduplikasi nilai CSS.

### 3. Template Layer

`src/templates/editorial/editorial-template.tsx` mengatur:

- skip link
- navigasi
- urutan section
- footer

`section-registry.tsx` memetakan `SectionId` ke renderer. Ini objek statis, bukan plugin system.

### 4. Component Layer

- `shared/` — presentasi murni: button, section heading, divider, metadata.
- `layout/` — page container, navigation, footer.
- `sections/` — satu komponen per section, menerima data lewat props.

Hanya `site-navigation.tsx` yang Client Component, untuk toggle menu mobile.

### 5. Application / Rendering Layer

`src/app/page.tsx`:

1. Mengimpor `portfolioConfig`.
2. Memvalidasi dengan `parsePortfolioConfig`.
3. Merender `<EditorialTemplate config={config} />`.

`layout.tsx` memuat font, CSS, dan metadata dari config.

## Aturan validasi

Zod memakai objek strict di semua level. Field salah ketik menyebabkan build gagal, bukan data hilang. Konfigurasi harus memiliki section id unik dan minimal satu section aktif.

Error ditampilkan dengan path field yang bermasalah.

## Perubahan yang diizinkan tanpa ubah komponen shared

- Menambah atau mengubah konten seseorang.
- Mengubah urutan section lewat array `sections`.
- Menonaktifkan section lewat `enabled: false`.
- Mengganti nilai token tema.
- Menambah portfolio baru lewat direktori content dan config baru.

## Yang tidak boleh dilakukan

- Menaruh data Fidela di `shared/` atau komponen lain.
- Menambah theme atau template tanpa persetujuan.
- Menambah backend, database, auth, CMS, atau plugin system.
- Mengganti motion CSS dengan library animasi tanpa persetujuan.
- Melewati validasi config.
