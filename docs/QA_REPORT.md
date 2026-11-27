# Laporan Quality Assurance — Phase 5

Tanggal: 2026-11-26
Objek: Portfolio Engine + pilot Fidela Andina.

## 1. Visual QA

**Desktop (browser nyata, viewport 1000×700):**
- Tipografi hierarchy benar: H1 serif besar, eyebrow mono, H2 serif, H3 entri.
- Warna sesuai token: ivory, forest, gold, charcoal. Tidak ada warna hardcode tersebar.
- Spasi, alignment, divider, dan urutan section sesuai Phase 2.
- Screenshot desktop diperiksa: hero dua kolom, nav horizontal, CTA primer.

**Mobile (iframe 390×844, media query aktif):**
- `matchMedia('(max-width: 767px)')` → true.
- Nav desktop `display:none`, toggle `display:flex`.
- Hero actions `flex-direction: column`, tombol lebar 327px.
- Portrait `aspect-ratio: 3 / 4`, metadata 14px, email 24px.
- Horizontal overflow = 0px pada 390px.
- Screenshot mobile diperiksa: komposisi tersendiri, bukan desktop dikecilkan.

**Catatan:** pengujian mobile memakai iframe 390px di Chromium, bukan perangkat fisik.

## 2. Functional QA

| Fungsi | Hasil |
|---|---|
| Navigasi anchor desktop | Benar |
| Smooth scroll + `scroll-margin-top` | Benar — `#about` berhenti 15px di bawah header |
| Toggle menu mobile | Benar — `aria-expanded` berubah, 7 tautan muncul |
| `aria-controls` merujuk elemen nyata | Benar |
| Tutup menu dengan Escape | Benar |
| Tutup menu saat tautan diklik | Benar, hash `#about` terbentuk |
| Tautan email `mailto:` | Benar |
| Tautan eksternal | Benar, tanpa `target="_blank"` |
| CV download | **Sengaja tidak ada** — owner memilih menahan CV |
| Expandable content | Tidak diimplementasi — semua konten ditampilkan (keputusan Phase 2) |
| Skip link | Hadir di DOM dan terhubung ke `#main`; uji keyboard Tab tidak berhasil dieksekusi oleh tool browser |

## 3. Technical QA

- `npm run typecheck` → lolos.
- `npm run build` → lolos, route `/` dan `/_not-found` statis.
- Console error: 0.
- Request gagal / 4xx / 5xx: 0 dari 12 request.
- Lighthouse: Accessibility **1.00**, Best Practices **1.00**, SEO **1.00**. Tidak ada audit gagal.
- Metadata title dan description dari config terbaca browser.
- Tidak ada aset rusak. Portrait sengaja memakai placeholder karena aset belum diberikan.
- `next/image` sudah dipakai untuk portrait, tapi belum bisa diverifikasi dengan gambar nyata.

## 4. Reusability QA

Konfigurasi kedua sementara (`qa-second`) dirender tanpa mengubah komponen shared:

- Profile berbeda, email berbeda, tidak ada portrait/location/linkedin.
- Section: `hero`, `about` (disabled), `contact`, `experience` — dirender sebagai `hero, contact, experience` sesuai urutan config.
- `about` disabled tidak muncul; education/expertise/organizations/certifications array kosong tidak merusak halaman.
- CTA hero tetap valid ("View experience").
- File QA sementara sudah dihapus; build akhir kembali ke 2 route.

Kesimpulan: engine menerima profil kedua tanpa perubahan komponen shared.

## 5. Temuan dan penanganan

| Severity | Masalah | Status |
|---|---|---|
| Important | CTA hero menampilkan "View about", menyimpang dari desain Phase 2 ("View experience") | **Diperbaiki** — `section-registry.tsx` memprioritaskan `experience` saat aktif; diverifikasi ulang di browser |
| Minor | Typecheck sempat gagal karena `.next/types` masih menyimpan route QA yang dihapus | **Selesai** — build ulang meregenerasi tipe; typecheck hijau |
| Minor | Uji keyboard Tab untuk skip link gagal dieksekusi tool browser | **Tertunda** — keberadaan dan target skip link terverifikasi; Lighthouse a11y 1.00 |
| Selesai | Portrait belum ada | Dipasang dari aset owner; placeholder dihapus |
| Limitation | CV ditahan karena memuat nomor telepon | Keputusan owner |
| Minor | Reveal scroll dengan `opacity` membuat Lighthouse a11y turun ke 0.96 karena teks saat audit masih transparan | **Diperbaiki** — reveal memakai `transform` saja; Lighthouse kembali 1.00 |
| Limitation | Master spec memuat nomor telepon | Sudah diredaksi sebelum push |

## 6. Persetujuan

Owner diminta:
1. Menyetujui hasil Phase 5.
2. Menentukan apakah minor skip-link keyboard perlu diuji manual.
3. Mengirim portrait bila ingin placeholder diganti.

**Langkah berikutnya setelah disetujui:** Phase 6 — Documentation & Release. Tidak ada push/deploy tanpa persetujuan terpisah.

---

## 7. Garden theme QA — 2026-11-27

Objek: tema garden + motion baru, masih memakai content pilot yang sama.

| Item | Hasil |
|---|---|
| Nav 5 tautan + active highlight | Benar — `aria-current` mengikuti IntersectionObserver; hero menghapus active |
| Theme light/dark | Benar — toggle menulis `localStorage`, atribut `data-theme` dipakai sebelum paint |
| Judul per kata | Benar — opacity 0 sebelum scroll → 1 setelah scroll; H1 langsung tampil |
| Card entrance + hover | Benar — `translateY(16px)` → `none`; hover `translateY(-3px)` |
| Batang tumbuh + bunga journal | Benar — `strokeDashoffset` 780/1000 saat scroll, bunga scale 0 → 1 |
| Accordion experience | Benar — 6 `<details>`, ringkasan satu baris, 4 bullet saat dibuka |
| Sertifikasi mekar | Benar — kelopak CSS skala 0.74 → 1.06 pada hover/fokus |
| Bunga 3D | Benar di desktop ≥1024px; mobile memakai SVG statis (keputusan performa) |
| Perbaikan bunga 3D | Kelopak tidak lagi terpotong — kamera dijauhkan (z=10, fov 32), bloom diskalakan 0.82, daun dan kelopak diperkecil, pencahayaan disetel untuk bayangan |
| Kelopak jatuh | Benar — Canvas 2D, 26 partikel desktop / 10 mobile, berhenti saat off-screen |
| Mobile 390×844 | Overflow 0, menu 5 tautan 48px, journal rail kiri, tombol penuh lebar |
| Console error | 0 |
| Lighthouse a11y / BP / SEO | 1.00 / 1.00 / 1.00 di desktop dan mobile |
| Lighthouse performance (mobile, throttle 4×) | 0.89–0.99 pada run hangat (median 0.94), FCP/LCP 0.9s, CLS 0. Run dingin lebih rendah karena inisialisasi browser |

Perbaikan performa yang dilakukan: menggabungkan tujuh komponen `AnimatedTitle` menjadi satu `TitleReveal`, menggantikan 12 komponen `MotionItem` satu per satu dengan satu `CardMotion` yang memakai `animate` dari Motion, berbagi satu modul `gsap-core`, dan menunda Three.js sampai 500ms serta hanya pada layar ≥1024px.

**Keputusan konten:** "5 organizations" dan "Big 4 firm" pada prompt tidak dipakai karena tidak didukung Section 6/CV. Hero memakai "Experience roles 6" (dari jumlah entri). Download CV diganti "Request CV" via email karena PDF memuat nomor telepon.

