// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://kuttab.pages.dev',
    name: 'Kuttab — Perpustakaan Kitab Islam Digital',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  content: {
    // Full-text search index — dipakai Fuse.js di sisi klien
    highlight: false,
    markdown: {
      toc: { depth: 3, searchDepth: 3 },
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Kuttab — Perpustakaan Kitab Islam Digital',
      meta: [
        { name: 'description', content: 'Baca kitab Islam klasik dan kontemporer secara online. Matan Arab, terjemah Indonesia, dan pencarian teks penuh.' },
        { property: 'og:title', content: 'Kuttab' },
        { property: 'og:description', content: 'Perpustakaan kitab Islam digital — gratis, modern, dan mudah diakses.' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap',
        },
      ],
    },
  },

  // Static generation untuk Cloudflare Pages
  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Routing
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  compatibilityDate: '2024-11-01',
})
