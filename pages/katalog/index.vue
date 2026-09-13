<template>
  <div class="katalog-wrapper container">
    <!-- Sidebar -->
    <aside class="katalog-sidebar">
      <h2 class="sidebar-title">Kategori</h2>
      <nav>
        <NuxtLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/katalog/${cat.slug}`"
          class="sidebar-link"
          active-class="sidebar-link--active"
          :style="{ '--cat': cat.color }"
        >
          <span class="sidebar-icon">{{ cat.icon }}</span>
          <span>{{ cat.name }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="katalog-main">
      <header class="katalog-header">
        <h1 class="katalog-title fade-up">Katalog Kitab</h1>
        <p class="katalog-desc fade-up">Temukan kitab klasik dan kontemporer Islam dari berbagai disiplin ilmu.</p>
      </header>

      <div v-if="pending" class="loading-state">Memuat katalog…</div>

      <template v-else>
        <section v-for="cat in categoriesWithContent" :key="cat.slug" class="katalog-section">
          <div class="section-heading">
            <span class="section-badge" :style="{ background: cat.color }">{{ cat.icon }} {{ cat.name }}</span>
          </div>
          <div class="books-grid fade-up-group">
            <NuxtLink
              v-for="book in cat.books"
              :key="book._path"
              :to="book._path"
              class="book-card"
              :style="{ '--cat-color': cat.color }"
            >
              <div class="book-level" v-if="book.level">{{ book.level }}</div>
              <div class="book-ar ar" v-if="book.titleAr">{{ book.titleAr }}</div>
              <div class="book-title">{{ book.title }}</div>
              <div class="book-author" v-if="book.author">{{ book.author }}</div>
              <div class="book-desc" v-if="book.description">{{ book.description }}</div>
            </NuxtLink>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Katalog Kitab — Maktabah',
  description: 'Jelajahi katalog kitab Islam klasik dan kontemporer dari berbagai kategori ilmu.',
  ogTitle: 'Katalog Kitab — Maktabah',
  ogDescription: 'Jelajahi katalog kitab Islam klasik dan kontemporer dari berbagai kategori ilmu.',
})

const categories = [
  { slug: 'nahwu',   name: 'Nahwu & Sharaf', icon: 'ن', color: '#35205A' },
  { slug: 'fiqih',   name: 'Fiqih',          icon: 'ف', color: '#1E4A5C' },
  { slug: 'tafsir',  name: 'Tafsir',         icon: 'ت', color: '#5C2030' },
  { slug: 'hadits',  name: 'Hadits',         icon: 'ح', color: '#1A2F5A' },
  { slug: 'tasawuf', name: 'Tasawuf',        icon: 'ص', color: '#253A22' },
  { slug: 'sejarah', name: 'Sejarah',        icon: 'س', color: '#5A3A15' },
  { slug: 'english', name: 'English',        icon: 'E', color: '#1C3045' },
]

// Ambil semua kitab sekaligus
const { data: allBooks, pending } = await useAsyncData('all-books', () =>
  queryContent('/baca').only(['title', 'titleAr', 'author', 'description', 'category', 'level', '_path']).find()
)

const categoriesWithContent = computed(() => {
  if (!allBooks.value) return []
  return categories.map((cat) => ({
    ...cat,
    books: allBooks.value!.filter((b: any) => b.category?.toLowerCase() === cat.slug),
  })).filter((c) => c.books.length > 0)
})
</script>

<style scoped>
.katalog-wrapper {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 40px;
  padding-block: 48px;
  align-items: start;
}

/* Sidebar */
.katalog-sidebar {
  position: sticky;
  top: 76px;
}

.sidebar-title {
  font-size: .75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--text3);
  margin-bottom: 10px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--r);
  font-size: .88rem;
  color: var(--text2);
  text-decoration: none;
  transition: all var(--t);
  border-left: 2px solid transparent;
}
.sidebar-link:hover {
  background: var(--surface);
  color: var(--text);
  border-left-color: var(--cat);
}
.sidebar-link--active {
  background: var(--gold-dim);
  color: var(--gold);
  border-left-color: var(--gold);
  font-weight: 600;
}

.sidebar-icon {
  font-family: var(--ff-ar);
  font-size: 1.1rem;
  color: var(--cat, var(--gold));
}

/* Main */
.katalog-header {
  margin-bottom: 40px;
}
.katalog-title {
  font-size: 1.8rem;
  margin-bottom: 8px;
}
.katalog-desc {
  color: var(--text2);
  font-size: .95rem;
}

.katalog-section {
  margin-bottom: 48px;
}

.section-heading {
  margin-bottom: 16px;
}
.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: #fff;
  padding: 4px 12px;
  border-radius: 20px;
}

/* Book cards */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.book-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
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
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text);
}

.book-title {
  font-family: var(--ff-di);
  font-weight: 700;
  font-size: .92rem;
}

.book-author {
  font-size: .78rem;
  color: var(--gold);
}

.book-desc {
  font-size: .8rem;
  color: var(--text2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.loading-state {
  color: var(--text3);
  padding: 40px 0;
  text-align: center;
}

@media (max-width: 900px) {
  .katalog-wrapper {
    grid-template-columns: 1fr;
  }
  .katalog-sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    position: static;
  }
  .sidebar-title { display: none; }
  .sidebar-link {
    border: 1px solid var(--border);
    border-left-width: 2px;
    padding: 6px 12px;
    border-radius: 20px;
  }
}
</style>
