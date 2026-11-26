# Verifikasi Konten — Fidela Andina

Tanggal: 2026-11-26
Sumber kebenaran: `CV_Fidela Andina.pdf` (2 halaman), diberikan owner.
Status: **verifikasi selesai. Owner memutuskan menahan CV — nomor telepon tidak dipublikasikan.**

## Metode

Teks CV diekstrak dengan utilitas sementara di luar repo (`pdf-parse`), lalu setiap entri dibandingkan dengan `src/content/fidela/*.ts` dan `src/config/*.config.ts`.

## Hasil verifikasi

| Bagian | Status | Catatan |
|---|---|---|
| Nama, title | Sesuai | "Fidela Andina"; title berasal dari positioning di master spec |
| Email | Sesuai | Sama persis dengan CV |
| LinkedIn, portfolio reference | Sesuai | Scheme `https://` ditambahkan pada URL pendek CV |
| Telepon | **Sengaja tidak dipublikasikan** | Ada di CV; menunggu izin tertulis owner sesuai master spec §6.7 |
| Pengalaman kerja — 6 entri | Sesuai | Badan Pusat Statistik, OJK, PT Pertamina Lubricants, RSM Indonesia, DJP RI, Bina Nusantara University |
| Perioda kerja | Sesuai | CV memakai singkatan bulan (`Dec 2025 - Jun 2026`); config memakai nama lengkap. Fakta identik |
| Tanggung jawab | Sesuai | Parafrasa dari master spec, tidak ada klaim baru |
| Pendidikan | Sesuai | Universitas Bina Nusantara, Undergraduate Accounting, Sep 2021 – Jul 2025, IPK 3.80/4.00 |
| Organisasi | Sesuai | HIMA BINUS, dua peran dan perioda sesuai CV |
| Sertifikasi — 4 entri | Sesuai | Jurnal.id 2022, Udemy 2024, Udemy 2025, Ikatan Akuntan Indonesia 2025 |
| Areas of experience | Sesuai dengan spec | Lima area berasal dari master spec §6.3, bukan daftar eksplisit di CV; disajikan sebagai exposure tanpa rating |
| Headline & ringkasan | Copy editorial dari spec | "*Turning Financial Data Into Meaningful Insights.*" dan ringkasan disetujui di master spec, bukan teks verbatim CV |

## Normalisasi yang dilakukan (bukan fakta baru)

- `Otoritas Jasa Keuangan` → `Otoritas Jasa Keuangan (OJK)` — akronim di spec.
- `LPBBTI` diterjemahkan ke bahasa Inggris sesuai master spec; CV memakai nama Indonesia lengkap.
- `Universitas Bina Nusantara` → `Universitas Bina Nusantara (BINUS University)` — sebutan di spec.
- `3.80/4.00` → `3.80 / 4.00` — spacing saja.
- `TKH HIMA 2022` — kepanjangan `Temu Keakraban Himpunan` tidak ditampilkan.
- Kata "`online accounting software`" pada Jurnal.id tidak ditampilkan sebagai field terpisah.
- Kemampuan Microsoft Excel yang disebut CV **tidak** dijadikan proficiency level, sesuai larangan spec §6.3 dan §6.8.

## Tidak ditemukan pelanggaran

- Tidak ada proyek, pencapaian, metrik, klien, ID sertifikat, atau tingkat kemahiran yang diinventarisasi.
- Tidak ada informasi rahasia employer/klien/pembayar pajak yang dipublikasikan.
- Nomor telepon tidak muncul di config, konten, komponen, atau dokumentasi.

## Placeholder tersisa

1. **Portrait** — belum ada aset. Hero menampilkan placeholder "Portrait pending approval".
2. **CV download** — file sudah diberikan, tapi **sengaja tidak dipasang** ke `public/` karena mengandung nomor telepon. Owner memilih menahan publikasi. Tombol download tidak dirender sampai ada izin tertulis.

## Status build

Typecheck dan build Phase 3 hijau. Build ulang setelah keputusan CV dijalankan pada Phase 4.
