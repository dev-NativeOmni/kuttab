// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://maktabahku.pages.dev',
    name: 'Maktabah — Perpustakaan Kitab Islam Digital',
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
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Maktabah — Perpustakaan Kitab Islam Digital',
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'Baca kitab Islam klasik dan kontemporer secara online. Matan Arab, terjemah Indonesia, dan pencarian teks penuh.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#F6F1E4', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0D0B08', media: '(prefers-color-scheme: dark)' },
        { name: 'apple-mobile-web-app-title', content: 'Maktabah' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Maktabah' },
        { property: 'og:locale', content: 'id_ID' },
        { property: 'og:url', content: 'https://maktabahku.pages.dev' },
        { property: 'og:title', content: 'Maktabah — Perpustakaan Kitab Islam Digital' },
        { property: 'og:description', content: 'Baca kitab Islam klasik dan kontemporer secara online — matan Arab, terjemah Indonesia, dan pencarian teks penuh. Gratis, selamanya.' },
        { property: 'og:image', content: 'https://maktabahku.pages.dev/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Maktabah — Perpustakaan Kitab Islam Digital' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Maktabah — Perpustakaan Kitab Islam Digital' },
        { name: 'twitter:description', content: 'Baca kitab Islam klasik dan kontemporer secara online — matan Arab, terjemah Indonesia, dan pencarian teks penuh.' },
        { name: 'twitter:image', content: 'https://maktabahku.pages.dev/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
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
