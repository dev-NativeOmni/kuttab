<template>
  <div>
    <!-- ── HERO ─────────────────────────────────────────── -->
    <section class="hero">
      <!-- Islamic geometric background -->
      <div class="hero-pattern" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <polygon
                points="30,7 33.6,20.4 46.4,16.2 39.6,27.4 52,30 39.6,32.6 46.4,43.8 33.6,39.6 30,53 26.4,39.6 13.6,43.8 20.4,32.6 8,30 20.4,27.4 13.6,16.2 26.4,20.4"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-grid)" />
        </svg>
      </div>

      <div class="container hero-content fade-up">
        <div class="badge">Perpustakaan Digital</div>
        <h1 class="hero-title">
          Warisan Ilmu Islam<br>
          <span class="hero-title-accent">dalam Genggaman Anda</span>
        </h1>
        <p class="hero-desc">
          Baca kitab klasik dan kontemporer Islam secara online — matan Arab, terjemah Indonesia, dan pencarian teks penuh. Gratis. Selamanya.
        </p>
        <div class="hero-cta">
          <NuxtLink to="/katalog" class="btn-primary">Jelajahi Katalog</NuxtLink>
          <NuxtLink to="/baca/nahwu/al-ajurumiyyah" class="btn-outline">Mulai Baca</NuxtLink>
        </div>

        <!-- Stat chips -->
        <div class="hero-stats fade-up-group">
          <div class="stat-chip">
            <span class="stat-num">7</span>
            <span class="stat-label">Kategori</span>
          </div>
          <div class="stat-chip">
            <span class="stat-num">Gratis</span>
            <span class="stat-label">Selamanya</span>
          </div>
          <div class="stat-chip">
            <span class="stat-num">RTL</span>
            <span class="stat-label">Dukungan Arab</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CATEGORIES ────────────────────────────────────── -->
    <section class="section-categories container">
      <h2 class="section-title">Kategori Kitab</h2>
      <div class="cat-grid fade-up-group">
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/katalog/${cat.slug}`"
          class="cat-card"
          :style="{ '--cat-color': cat.color }"
        >
          <div class="cat-icon">{{ cat.icon }}</div>
          <div class="cat-name">{{ cat.name }}</div>
          <div class="cat-sub">{{ cat.sub }}</div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── FEATURED ──────────────────────────────────────── -->
    <section class="section-featured container">
      <h2 class="section-title">Kitab Unggulan</h2>
      <div class="featured-grid fade-up-group">
        <NuxtLink
          v-for="kitab in featured"
          :key="kitab.slug"
          :to="kitab.path"
          class="kitab-card"
          :style="{ '--cat-color': kitab.color }"
        >
          <div class="kitab-card-header">
            <span class="kitab-badge" :style="{ background: kitab.color }">{{ kitab.category }}</span>
          </div>
          <div class="kitab-ar ar">{{ kitab.titleAr }}</div>
          <div class="kitab-title">{{ kitab.title }}</div>
          <div class="kitab-author">{{ kitab.author }}</div>
          <div class="kitab-desc">{{ kitab.desc }}</div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── HOW TO USE ────────────────────────────────────── -->
    <section class="section-how container">
      <h2 class="section-title">Cara Penggunaan</h2>
      <div class="how-grid fade-up-group">
        <div v-for="(step, i) in steps" :key="i" class="how-step">
          <div class="how-num">{{ i + 1 }}</div>
          <div class="how-body">
            <div class="how-title">{{ step.title }}</div>
            <div class="how-desc">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Kuttab — Perpustakaan Kitab Islam Digital',
  description: 'Baca kitab Islam klasik dan kontemporer secara online. Matan Arab, terjemah Indonesia, pencarian teks penuh.',
})

const categories = [
  { slug: 'nahwu',   name: 'Nahwu & Sharaf', sub: 'Tata bahasa Arab',    icon: 'ن',  color: '#35205A' },
  { slug: 'fiqih',   name: 'Fiqih',          sub: 'Hukum Islam',          icon: 'ف',  color: '#1E4A5C' },
  { slug: 'tafsir',  name: 'Tafsir',         sub: 'Penafsiran Al-Qur\'an',icon: 'ت',  color: '#5C2030' },
  { slug: 'hadits',  name: 'Hadits',         sub: 'Ilmu hadits',          icon: 'ح',  color: '#1A2F5A' },
  { slug: 'tasawuf', name: 'Tasawuf',        sub: 'Akhlak & spiritualitas',icon: 'ص', color: '#253A22' },
  { slug: 'sejarah', name: 'Sejarah',        sub: 'Sirah & tarikh Islam', icon: 'س',  color: '#5A3A15' },
  { slug: 'english', name: 'English',        sub: 'Islamic texts in English',icon:'E',color: '#1C3045' },
]

const featured = [
  {
    slug: 'al-ajurumiyyah',
    path: '/baca/nahwu/al-ajurumiyyah',
    title: 'Al-Ājurrūmiyyah',
    titleAr: 'الآجُرُّومِيَّة',
    author: 'Muhammad ibn Daud al-Sanhaji',
    category: 'Nahwu',
    color: '#35205A',
    desc: 'Matan nahwu paling masyhur untuk pemula. Dasar ilmu tata bahasa Arab.',
  },
  {
    slug: 'matn-abi-shuja',
    path: '/baca/fiqih/matn-abi-shuja',
    title: 'Matn Abī Shujā\'',
    titleAr: 'متن أبي شجاع',
    author: 'Ahmad ibn al-Husayn al-Asfahani',
    category: 'Fiqih',
    color: '#1E4A5C',
    desc: 'Matan fiqih Syafi\'i paling populer, ringkas dan mudah dihafal.',
  },
  {
    slug: 'arbaun-nawawi',
    path: '/baca/hadits/arbaun-nawawi',
    title: 'Al-Arba\'ūn al-Nawawiyyah',
    titleAr: 'الأربعون النووية',
    author: 'Imam Yahya ibn Sharaf al-Nawawi',
    category: 'Hadits',
    color: '#1A2F5A',
    desc: 'Empat puluh hadits pilihan yang mencakup pokok-pokok ajaran Islam.',
  },
]

const steps = [
  { title: 'Pilih Kategori',  desc: 'Jelajahi 7 kategori ilmu Islam dari Fiqih hingga Nahwu.' },
  { title: 'Buka Kitab',     desc: 'Baca matan Arab asli beserta terjemah dan syarah.' },
  { title: 'Gunakan Carian', desc: 'Ketik kata kunci — temukan bab atau teks dalam detik.' },
]
</script>

<style scoped>
/* ── Hero ──────────────────────────────────────────────── */
.hero {
  position: relative;
  overflow: hidden;
  padding-block: 80px 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  color: var(--gold);
  opacity: .06;
  pointer-events: none;
}

.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  max-width: 640px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.15;
  color: var(--text);
}

.hero-title-accent {
  color: var(--gold);
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--text2);
  line-height: 1.7;
  max-width: 54ch;
}

.hero-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.stat-chip {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 16px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--r);
}

.stat-num {
  font-family: var(--ff-di);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gold);
}

.stat-label {
  font-size: .72rem;
  color: var(--text3);
}

/* ── Sections ──────────────────────────────────────────── */
.section-categories,
.section-featured,
.section-how {
  padding-block: 64px;
}

.section-title {
  font-size: 1.4rem;
  margin-bottom: 28px;
  color: var(--text);
}

/* ── Category grid ─────────────────────────────────────── */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.cat-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 18px;
  border: 1px solid var(--border);
  border-radius: var(--rl);
  text-decoration: none;
  color: var(--text);
  background: var(--surface);
  transition: transform var(--t), box-shadow var(--t), border-color var(--t);
  border-left: 3px solid var(--cat-color);
}
.cat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--cat-color);
}

.cat-icon {
  font-family: var(--ff-ar);
  font-size: 1.8rem;
  color: var(--cat-color);
  line-height: 1;
}

.cat-name {
  font-weight: 600;
  font-size: .92rem;
}

.cat-sub {
  font-size: .78rem;
  color: var(--text3);
}

/* ── Featured kitab grid ───────────────────────────────── */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.kitab-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rl);
  text-decoration: none;
  color: var(--text);
  transition: transform var(--t), box-shadow var(--t);
}
.kitab-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.kitab-card-header {
  margin-bottom: 4px;
}

.kitab-badge {
  font-size: .65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: #fff;
  padding: 3px 9px;
  border-radius: 20px;
}

.kitab-ar {
  font-size: 1.4rem;
  line-height: 1.8;
  color: var(--text);
}

.kitab-title {
  font-family: var(--ff-di);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
}

.kitab-author {
  font-size: .8rem;
  color: var(--gold);
}

.kitab-desc {
  font-size: .84rem;
  color: var(--text2);
  line-height: 1.55;
}

/* ── How-to steps ──────────────────────────────────────── */
.how-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.how-step {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.how-num {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gold-dim);
  color: var(--gold);
  font-family: var(--ff-di);
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.how-title {
  font-weight: 600;
  font-size: .95rem;
  margin-bottom: 4px;
}

.how-desc {
  font-size: .85rem;
  color: var(--text2);
  line-height: 1.55;
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero { padding-block: 52px 40px; }
  .section-categories,
  .section-featured,
  .section-how { padding-block: 40px; }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
