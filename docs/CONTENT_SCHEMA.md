# Content Schema

Semua tipe ada di `src/types/`. Validasi runtime ada di `src/lib/validation/portfolio-schema.ts`.

## PortfolioConfig

```ts
interface PortfolioConfig {
  id: string;
  template: "editorial";
  theme: "accounting-editorial";
  site: { title: string; description: string };
  profile: Profile;
  sections: SectionConfig[];
  content: {
    experience: Experience[];
    education: Education[];
    expertise: Expertise;
    organizations: Organization[];
    certifications: Certification[];
  };
}
```

## Entitas

| Tipe | Field wajib | Field opsional |
|---|---|---|
| `Profile` | `name`, `title`, `email` | `location`, `linkedin`, `portfolioReference`, `headline`, `summary`, `portrait`, `portraitAlt`, `cvFile` |
| `Experience` | `organization`, `position`, `period`, `responsibilities[]` | `location` |
| `Education` | `institution`, `degree`, `period` | `location`, `gpa` |
| `Expertise` | `areas[]` | — |
| `Certification` | `issuer`, `title`, `year` | — |
| `Organization` | `name`, `roles[]` | — |
| `OrganizationRole` | `title`, `period`, `highlights[]` | — |
| `SectionConfig` | `id`, `enabled` | `heading` |

`SectionId`: `hero`, `about`, `experience`, `expertise`, `education`, `organizations`, `certifications`, `contact`.

Periode memakai string bebas (`"December 2025 — June 2026"`) agar tidak mengubah fakta sumber menjadi rentang tanggal yang salah dibaca.

## Section config

```ts
export const sections: SectionConfig[] = [
  { id: "hero", enabled: true },
  { id: "about", enabled: true, heading: "Professional Summary" },
  { id: "experience", enabled: false },
];
```

- Urutan array = urutan render.
- `enabled: false` → section tidak dirender dan tidak masuk navigasi.
- `heading` → H2. Jika kosong, pakai label default dari `sectionLabels`.
- Tidak ada field `variant` sampai ada kebutuhan nyata.

## Aturan validasi

- Semua objek strict: field yang salah ketik menyebabkan error.
- Email dan URL divalidasi formatnya.
- Section id harus unik.
- Minimal satu section aktif.
- Error membawa path, misalnya `content.experience.0.period`.

## Aturan konten

- CV adalah sumber kebenaran.
- Jangan mengarang proyek, pencapaian, metrik, klien, ID sertifikat, atau tingkat kemahiran.
- Area keahlian ditampilkan sebagai exposure, bukan persentase/rating.
- Jangan memasukkan nomor telepon tanpa izin tertulis.
- Jangan memasukkan informasi rahasia employer, klien, atau pembayar pajak.
- Field opsional yang kosong tidak boleh merusak halaman.

## Contoh config minimal

```ts
import type { PortfolioConfig } from "@/types/portfolio";

export const minimalConfig: PortfolioConfig = {
  id: "sample-person",
  template: "editorial",
  theme: "accounting-editorial",
  site: { title: "Sample Person", description: "Sample portfolio" },
  profile: { name: "Sample Person", title: "Profession", email: "sample@example.com" },
  sections: [
    { id: "hero", enabled: true },
    { id: "contact", enabled: true },
  ],
  content: {
    experience: [],
    education: [],
    expertise: { areas: [] },
    organizations: [],
    certifications: [],
  },
};
```
