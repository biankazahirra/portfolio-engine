# Menambah Portfolio Baru

Tujuan: menambah orang baru tanpa mengubah komponen shared.

## 1. Buat direktori konten

```
src/content/<person>/
├── profile.ts
├── experience.ts
├── education.ts
├── skills.ts
├── certifications.ts
└── organizations.ts
```

Salin pola dari `src/content/fidela/`. Isi dari CV yang sudah disetujui. Jangan mengarang data.

Contoh `profile.ts`:

```ts
import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "Nama Orang",
  title: "Profesi",
  location: "Kota, Negara",
  email: "nama@example.com",
  summary: "Ringkasan singkat.",
};
```

## 2. Buat config portfolio

Buat `src/config/<person>.config.ts` dengan `PortfolioConfig`. Lihat contoh di `docs/CONTENT_SCHEMA.md`.

Nilai `template` harus `"editorial"` dan `theme` harus `"accounting-editorial"` untuk versi ini.

## 3. Arahkan aplikasi ke config itu

Ubah import di:

- `src/app/page.tsx`
- `src/app/layout.tsx` (untuk title dan description metadata)

dari `portfolio.config` ke config baru. Tidak ada komponen lain yang perlu disentuh.

## 4. Atur section

Di config baru, tentukan array `sections`:

```ts
sections: [
  { id: "hero", enabled: true },
  { id: "about", enabled: true },
  { id: "experience", enabled: true },
  { id: "education", enabled: false },
  { id: "contact", enabled: true, heading: "Hubungi Saya" },
];
```

- Urutan array = urutan tampil.
- `enabled: false` menyembunyikan section dan tautan navnya.
- Section kosong tidak merusak halaman.

## 5. Tambah aset

```
public/images/profile/<person>.jpg
public/documents/<person>-cv.pdf
```

Lalu isi di `profile.ts`:

```ts
portrait: "/images/profile/<person>.jpg",
portraitAlt: "Foto <Nama Orang>",
cvFile: "/documents/<person>-cv.pdf",
```

Gambar dirender lewat `next/image`. Jangan menimpa aset yang sudah ada tanpa izin.

**Privasi:** jika dokumen memuat nomor telepon atau data sensitif, jangan dipasang ke `public/` sebelum owner mengonfirmasi. File di `public/` dapat diakses siapa pun yang tahu URL-nya.

## 6. Validasi

```bash
npm run typecheck
npm run build
```

Konfigurasi invalid akan menggagalkan build dengan path field yang bermasalah.

## 7. Uji cepat

```bash
npm run dev
```

Periksa: urutan section, section yang dimatikan, tautan nav, metadata halaman, portrait, dan tampilan mobile 390px.

## 8. Deploy

```bash
npm run build
```

Lalu deploy ke Vercel (preset Next.js) atau host static yang mendukung Next.js. Satu deployment = satu portfolio.

Deploy memerlukan persetujuan owner.

## Daftar periksa

- [ ] Semua fakta berasal dari CV/source yang disetujui.
- [ ] Tidak ada data pribadi di komponen shared.
- [ ] Tidak ada nomor telepon sebelum izin.
- [ ] Section aktif dan urutannya benar.
- [ ] `typecheck` dan `build` lolos.
- [ ] Desktop dan mobile diperiksa.
