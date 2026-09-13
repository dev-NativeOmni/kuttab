# Maktabah

![GitHub Actions](https://github.com/dev-NativeOmni/kuttab/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)

Perpustakaan kitab Islam digital berbasis Nuxt 3, dengan konten kitab dalam format Markdown, pencarian teks penuh menggunakan Fuse.js, dan deployment ke Cloudflare Pages.

Maktabah dirancang untuk membaca kitab klasik Islam secara ringan, cepat, dan responsif di desktop maupun mobile.

## Fitur utama

- Koleksi kitab Islam berdasarkan kategori: Nahwu, Fiqih, Hadits, Tafsir, Tasawuf, Sejarah, dan English
- Teks Arab dengan styling RTL dan font Amiri
- Pencarian teks penuh berbasis client-side dengan Fuse.js
- Tampilan responsif untuk perangkat mobile dan desktop
- Menu katalog dan reader kitab yang mudah dinavigasi
- Mode hafalan untuk menyembunyikan matan Arab agar bisa latihan hafalan
- SSG (Static Site Generation) dengan Nuxt dan deployment ke Cloudflare Pages

## Tech stack

- Nuxt 3
- @nuxt/content
- Fuse.js
- Pure CSS (design tokens via custom properties)
- Cloudflare Pages

## Struktur proyek

```bash
kuttab/
├── app.vue
├── error.vue
├── nuxt.config.ts
├── package.json
├── README.md
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── SearchBox.vue
│   └── content/
│       └── ArMatn.vue
├── composables/
│   └── useSearch.ts
├── content/
│   └── baca/
│       ├── english/
│       ├── fiqih/
│       ├── hadits/
│       ├── nahwu/
│       ├── sejarah/
│       ├── tafsir/
│       └── tasawuf/
├── layouts/
│   └── default.vue
├── pages/
│   ├── 404.vue
│   ├── index.vue
│   ├── baca/
│   │   └── [...slug].vue
│   └── katalog/
│       ├── index.vue
│       └── [kategori].vue
└── .github/
    └── workflows/
        └── deploy.yml
```

## Persiapan pengembangan

```bash
# clone repository
git clone https://github.com/<username>/kuttab.git
cd kuttab

# install dependency
npm install

# jalankan dev server
npm run dev
```

Setelah itu, buka:

```text
http://localhost:3000
```

## Menambah konten baru

Buat file Markdown di folder kategori yang sesuai, misalnya:

```bash
content/baca/nahwu/nama-kitab.md
```

Contoh frontmatter:

```yaml
---
title: "Judul Kitab"
titleAr: "عنوان الكتاب"
author: "Nama Pengarang (w. XXX H)"
category: "nahwu"
level: "Dasar"
description: "Deskripsi singkat kitab ini."
tags: [nahwu, matan]
---
```

Gunakan komponen custom berikut untuk menampilkan teks Arab:

```md
::ar-matn
النَّصُّ الْعَرَبِيُّ هُنَا
::
```

## Build dan deploy

### Build lokal

```bash
npm run build
```

### Generate static output

```bash
npm run generate
```

### Deploy ke Cloudflare Pages

- Push repository ke GitHub
- Login ke Cloudflare
- Masuk ke Workers & Pages
- Buat project baru dari repo GitHub
- Gunakan build command:

```bash
npm run generate
```

- Output directory:

```bash
.output/public
```

## Roadmap

- [x] Reader kitab
- [x] Katalog per kategori
- [x] Pencarian teks penuh
- [x] Mode hafalan
- [x] 404 page
- [x] Sitemap
- [ ] Bookmark dan anotasi
- [ ] PWA / offline support
- [ ] Export ke PDF

## Lisensi

Project code menggunakan lisensi MIT.

Konten kitab mengikuti hak cipta masing-masing karya; sebagian besar kitab klasik berada di domain publik atau digunakan dalam konteks edukasi yang sesuai.

## Kontribusi

Pull request sangat diterima. Jika Anda ingin menambahkan kitab baru, silakan buat file Markdown sesuai struktur kategori yang ada dan sertakan frontmatter yang benar.
