# Phase 3 Core Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun fondasi engine reusable tanpa konten Fidela di komponen shared.

**Architecture:** Konfigurasi typed divalidasi Zod di `page.tsx`, lalu `EditorialTemplate` merender section aktif lewat `section-registry`. Token tema hanya di CSS custom properties.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, Zod 4, Lucide React.

**Spec:**
- `AI_INSTRUCTIONS/PORTFOLIO_ENGINE_MASTER_SPEC.md`
- `docs/superpowers/specs/2026-11-26-portfolio-engine-phase1-design.md`
- `docs/superpowers/specs/2026-11-26-portfolio-engine-phase2-design-system.md`

## Global Constraints

- Satu portofolio per deployment. Tanpa backend/database/auth/CMS/plugin system.
- Template hanya `editorial`; theme hanya `accounting-editorial`.
- Konten pribadi tidak boleh di komponen shared.
- Nomor telepon tidak masuk file mana pun.
- Dependency hanya: Next, React, TypeScript, Tailwind, Zod, Lucide.
- `framer-motion` tidak dipakai. CSS untuk transisi umum; GSAP + ScrollTrigger untuk judul per kata dan vine, Motion untuk entrance/hover kartu, Lenis untuk smooth scroll, Three.js + Canvas 2D untuk bunga dan kelopak (ditambahkan kemudian atas permintaan owner). Implementasi akhir memakai `TitleReveal`, `CardMotion`, dan `gsap-core` agar jumlah Client Component tetap kecil.
- Client Component hanya untuk toggle navigasi mobile.

## Review Focus

- Konfigurasi invalid harus gagal dengan pesan jelas, bukan halaman rusak.
- Section `enabled: false` tidak boleh dirender.
- Urutan section harus mengikuti array config.
- Missing optional content (portrait, CV, location) tidak boleh merusak halaman.
- Section registry harus mengembalikan `null` untuk id yang tidak dikenal.

## Ruling

`Ruling: tanpa framework test — spesifikasi melarang dependency di luar daftar disetujui; verifikasi pakai tsc --noEmit + next build — risiko: regresi logika kecil tidak tertangkap sampai QA.`

## Tasks

1. Scaffold: package.json, tsconfig, postcss, gitignore, install dependency.
2. Token tema + globals.css + layout font/metadata.
3. Tipe konten + schema Zod + parser.
4. Config + content Fidela.
5. Shared primitives (button, section-heading, divider, metadata, page-container).
6. Layout (navigation client component, footer).
7. Section components.
8. Template + registry + page.
9. Verifikasi: typecheck + build + perbaikan.
