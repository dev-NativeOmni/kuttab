# Kuttab — Perpustakaan Kitab Islam Digital

Perpustakaan kitab Islam digital berbasis **Nuxt 3** + **@nuxt/content** + **Fuse.js**, di-*deploy* ke **Cloudflare Pages**.

---

## Fitur

- Baca kitab klasik Islam (Nahwu, Fiqih, Hadits, Tafsir, Tasawuf, Sejarah, English)  
- Matan Arab asli (RTL) + terjemah Indonesia + syarah ringkas  
- Pencarian teks penuh berbasis Fuse.js (client-side, tanpa server)  
- Mode gelap / terang (mengikuti preferensi OS, bisa di-toggle)  
- Reading progress bar & animasi halus  
- Dukungan penuh mobile (bottom navigation)  
- Static site — cepat, aman, gratis hosting di Cloudflare Pages  

---

## Memulai Pengembangan

```bash
# 1. Clone repo
git clone https://github.com/<username>/kuttab.git
cd kuttab

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
# → buka http://localhost:3000
```

---

## Struktur Proyek

```
kuttab/
├── assets/css/
│   └── main.css              # Design tokens & global styles
├── components/
│   └── SearchBox.vue         # Komponen pencarian + dropdown
├── composables/
│   └── useSearch.ts          # Fuse.js search composable
├── content/
│   └── baca/
│       ├── nahwu/            # Kitab-kitab nahwu (.md)
│       ├── fiqih/            # Kitab-kitab fiqih (.md)
│       ├── hadits/           # Kitab-kitab hadits (.md)
│       ├── tafsir/           # Kitab-kitab tafsir (.md)
│       ├── tasawuf/          # Kitab-kitab tasawuf (.md)
│       ├── sejarah/          # Kitab-kitab sejarah (.md)
│       └── english/          # Islamic texts in English (.md)
├── layouts/
│   └── default.vue           # Header, footer, mobile nav
├── pages/
│   ├── index.vue             # Halaman beranda
│   ├── katalog/
│   │   ├── index.vue         # Katalog semua kitab
│   │   └── [kategori].vue    # Halaman per kategori
│   └── baca/
│       └── [...slug].vue     # Reader (e-reader) kitab
├── nuxt.config.ts
└── package.json
```

---

## Menambah Kitab Baru

Buat file Markdown baru di `content/baca/<kategori>/<nama-kitab>.md`:

```markdown
---
title: "Judul Kitab"
titleAr: "عنوان الكتاب"
author: "Nama Pengarang (tahun wafat)"
category: "nahwu"   # nahwu | fiqih | hadits | tafsir | tasawuf | sejarah | english
level: "Dasar"      # Dasar | Menengah | Lanjutan
description: "Deskripsi singkat kitab ini."
tags: [tag1, tag2]
---

## Bab Pertama

Isi konten di sini...

::ar-matn
النَّصُّ الْعَرَبِيُّ هُنَا
::
```

Komponen `::ar-matn` akan merender teks Arab dengan font Amiri, RTL, dan styling khusus.

---

## Deploy ke Cloudflare Pages

### Cara 1 — Via GitHub (Direkomendasikan)

1. Push kode ke GitHub
2. Login ke [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Pilih repo ini
4. Konfigurasi build:
   - **Framework preset**: Nuxt.js
   - **Build command**: `npm run generate`
   - **Build output directory**: `.output/public`
5. Klik **Save and Deploy**
6. Situs langsung tersedia di `kuttab.pages.dev` (atau domain custom Anda)

### Cara 2 — Via GitHub Actions (Auto CI/CD)

Tambahkan secrets berikut di **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Keterangan |
|--------|------------|
| `CLOUDFLARE_API_TOKEN` | API token Cloudflare (izin: Pages Edit) |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID dari dashboard Cloudflare |

Setiap `git push` ke branch `main` akan otomatis men-deploy ke Cloudflare Pages.

### Build Lokal

```bash
npm run generate
# Output ada di .output/public/
```

---

## Konversi DOCX ke Markdown

Jika Anda memiliki kitab dalam format DOCX, konversi menggunakan Pandoc:

```bash
# Install pandoc (Ubuntu/Debian)
sudo apt install pandoc

# Konversi
pandoc input.docx -o content/baca/nahwu/nama-kitab.md \
  --wrap=none \
  --markdown-headings=atx

# Lalu tambahkan frontmatter secara manual di bagian atas file
```

---

## Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| [Nuxt 3](https://nuxt.com) | Framework Vue.js dengan SSG |
| [@nuxt/content](https://content.nuxt.com) | CMS berbasis file Markdown |
| [Fuse.js](https://fusejs.io) | Full-text search client-side |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hosting CDN global, gratis |
| [Amiri](https://fonts.google.com/specimen/Amiri) | Font Arab (Google Fonts) |
| [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville) | Font display Latin |
| [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Font UI |

---

## Rencana Pengembangan (Roadmap)

- [ ] Pagefind — pencarian build-time untuk koleksi besar  
- [ ] Sistem bookmark & anotasi (memerlukan Supabase)  
- [ ] Fitur highlight teks & catatan pinggir  
- [ ] Mode hafalan (sembunyi/tampilkan teks Arab)  
- [ ] PWA (offline support)  
- [ ] Ekspor ke PDF  

---

## Lisensi

Kode sumber: **MIT License**  
Konten kitab: mengikuti hak cipta masing-masing karya (umumnya domain publik untuk kitab klasik)
