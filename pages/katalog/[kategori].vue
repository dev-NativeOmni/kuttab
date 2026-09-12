<template>
  <div class="container page-kategori">
    <!-- Back link -->
    <NuxtLink to="/katalog" class="back-link">
      ← Semua Kategori
    </NuxtLink>

    <!-- Header kategori -->
    <header class="kat-header fade-up" :style="{ '--cat-color': catMeta.color }">
      <div class="kat-icon">{{ catMeta.icon }}</div>
      <div>
        <h1 class="kat-title">{{ catMeta.name }}</h1>
        <p class="kat-sub">{{ catMeta.sub }}</p>
      </div>
    </header>

    <!-- Level filter -->
    <div class="level-filter">
      <button
        v-for="lv in levels"
        :key="lv.value"
        class="level-btn"
        :class="{ 'level-btn--active': activeLevel === lv.value }"
        @click="activeLevel = lv.value"
      >
        {{ lv.label }}
      </button>
    </div>

    <!-- Book list -->
    <div v-if="pending" class="loading-state">Memuat kitab…</div>

    <div v-else-if="filteredBooks.length === 0" class="empty-state">
      Belum ada kitab dalam kategori ini.
    </div>

    <div v-else class="books-grid fade-up-group">
      <NuxtLink
        v-for="book in filteredBooks"
        :key="book._path"
        :to="book._path"
        class="book-card"
        :style="{ '--cat-color': catMeta.color }"
      >
        <div class="book-level" v-if="book.level">{{ book.level }}</div>
        <div class="book-ar ar" v-if="book.titleAr">{{ book.titleAr }}</div>
        <div class="book-title">{{ book.title }}</div>
        <div class="book-author" v-if="book.author">{{ book.author }}</div>
        <div class="book-desc" v-if="book.description">{{ book.description }}</div>
        <div class="book-read-cta">Baca Sekarang →</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug  = computed(() => route.params.kategori as string)

// Metadata tiap kategori
const catMap: Record<string, { name: string; sub: string; icon: string; color: string }> = {
  nahwu:   { name: 'Nahwu & Sharaf',  sub: 'Tata bahasa Arab — kunci memahami Al-Qur\'an & kitab klasik', icon: 'ن', color: '#35205A' },
  fiqih:   { name: 'Fiqih',           sub: 'Hukum Islam dalam kehidupan sehari-hari',                    icon: 'ف', color: '#1E4A5C' },
  tafsir:  { name: 'Tafsir',          sub: 'Penafsiran makna Al-Qur\'an oleh ulama',                      icon: 'ت', color: '#5C2030' },
  hadits:  { name: 'Hadits',          sub: 'Sabda & perbuatan Nabi Muhammad ﷺ',                          icon: 'ح', color: '#1A2F5A' },
  tasawuf: { name: 'Tasawuf',         sub: 'Akhlak, spiritualitas, dan penyucian jiwa',                  icon: 'ص', color: '#253A22' },
  sejarah: { name: 'Sejarah Islam',   sub: 'Sirah nabawiyyah dan tarikh peradaban Islam',                icon: 'س', color: '#5A3A15' },
  english: { name: 'English Texts',   sub: 'Classical Islamic texts in English translation',             icon: 'E', color: '#1C3045' },
}

const catMeta = computed(() => catMap[slug.value] ?? { name: slug.value, sub: '', icon: '📖', color: '#A8721C' })

useSeoMeta({
  title: computed(() => `${catMeta.value.name} — Katalog Kuttab`),
  description: computed(() => catMeta.value.sub),
})

// Fetch books
const { data: books, pending } = await useAsyncData(`cat-${slug.value}`, () =>
  queryContent(`/baca/${slug.value}`)
    .only(['title', 'titleAr', 'author', 'description', 'level', '_path'])
    .find()
)

// Level filter
const levels = [
  { value: '',        label: 'Semua' },
  { value: 'Dasar',   label: 'Dasar' },
  { value: 'Menengah',label: 'Menengah' },
  { value: 'Lanjutan',label: 'Lanjutan' },
]
const activeLevel = ref('')

const filteredBooks = computed(() => {
  if (!books.value) return []
  if (!activeLevel.value) return books.value
  return books.value.filter((b: any) => b.level === activeLevel.value)
})
</script>

<style scoped>
.page-kategori {
  padding-block: 40px 64px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: .85rem;
  color: var(--text3);
  text-decoration: none;
  margin-bottom: 24px;
  transition: color var(--t);
}
.back-link:hover { color: var(--gold); }

.kat-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 4px solid var(--cat-color);
  border-radius: var(--rl);
  margin-bottom: 28px;
}

.kat-icon {
  font-family: var(--ff-ar);
  font-size: 2.8rem;
  color: var(--cat-color);
  line-height: 1;
  flex-shrink: 0;
}

.kat-title {
  font-size: 1.6rem;
  margin-bottom: 4px;
}

.kat-sub {
  color: var(--text2);
  font-size: .9rem;
}

/* Level filter */
.level-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.level-btn {
  padding: 6px 16px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: none;
  color: var(--text2);
  font-size: .84rem;
  font-weight: 500;
  transition: all var(--t);
  cursor: pointer;
  font-family: var(--ff-ui);
}
.level-btn:hover { border-color: var(--gold); color: var(--gold); }
.level-btn--active {
  background: var(--gold);
  border-color: var(--gold);
  color: #fff;
}

/* Grid & cards (sama dengan katalog index) */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.book-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--cat-color);
  border-radius: var(--rl);
  text-decoration: none;
  color: var(--text);
  transition: transform var(--t), box-shadow var(--t);
}
.book-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.book-level {
  font-size: .67rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--cat-color);
  background: color-mix(in srgb, var(--cat-color) 12%, transparent);
  padding: 2px 8px;
  border-radius: 20px;
  width: fit-content;
}

.book-ar {
  font-size: 1.3rem;
  line-height: 1.8;
}

.book-title {
  font-family: var(--ff-di);
  font-weight: 700;
  font-size: .93rem;
}

.book-author { font-size: .78rem; color: var(--gold); }

.book-desc {
  font-size: .8rem;
  color: var(--text2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.book-read-cta {
  font-size: .8rem;
  font-weight: 600;
  color: var(--cat-color);
  margin-top: 8px;
}

.loading-state,
.empty-state {
  color: var(--text3);
  padding: 40px 0;
  text-align: center;
  font-size: .95rem;
}
</style>
