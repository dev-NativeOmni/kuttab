<template>
  <div class="reader-wrapper">
    <!-- ── TOC SIDEBAR ───────────────────────────────────── -->
    <aside class="toc-sidebar" :class="{ 'toc-open': tocOpen }">
      <button class="toc-close" @click="tocOpen = false" aria-label="Tutup daftar isi">✕</button>
      <div class="toc-header">
        <span class="toc-title">Daftar Isi</span>
      </div>
      <nav v-if="doc?.body?.toc?.links?.length" class="toc-nav">
        <a
          v-for="link in doc.body.toc.links"
          :key="link.id"
          :href="`#${link.id}`"
          class="toc-link"
          @click="tocOpen = false"
        >{{ link.text }}</a>
        <template v-for="link in doc.body.toc.links" :key="`sub-${link.id}`">
          <a
            v-for="child in link.children ?? []"
            :key="child.id"
            :href="`#${child.id}`"
            class="toc-link toc-link--sub"
            @click="tocOpen = false"
          >{{ child.text }}</a>
        </template>
      </nav>
      <div v-else class="toc-empty">Tidak ada daftar isi.</div>
    </aside>

    <!-- ── READER MAIN ───────────────────────────────────── -->
    <div class="reader-main">
      <!-- Loading / error -->
      <div v-if="pending" class="reader-loading">Memuat kitab…</div>
      <div v-else-if="!doc" class="reader-error">
        <h1>Kitab tidak ditemukan</h1>
        <NuxtLink to="/katalog" class="btn-primary">Kembali ke Katalog</NuxtLink>
      </div>

      <template v-else>
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Beranda</NuxtLink>
          <span aria-hidden="true">›</span>
          <NuxtLink :to="`/katalog/${doc.category?.toLowerCase()}`">{{ doc.category }}</NuxtLink>
          <span aria-hidden="true">›</span>
          <span>{{ doc.title }}</span>
        </nav>

        <!-- Kitab header -->
        <header class="kitab-header fade-up">
          <div class="kitab-meta">
            <span class="kitab-cat-badge" :style="{ background: catColor }">{{ doc.category }}</span>
            <span v-if="doc.level" class="kitab-level">{{ doc.level }}</span>
          </div>
          <div v-if="doc.titleAr" class="kitab-title-ar ar">{{ doc.titleAr }}</div>
          <h1 class="kitab-title">{{ doc.title }}</h1>
          <div v-if="doc.author" class="kitab-author">{{ doc.author }}</div>
          <p v-if="doc.description" class="kitab-desc">{{ doc.description }}</p>
        </header>

        <!-- Reader toolbar -->
        <div class="reader-toolbar">
          <button class="toolbar-btn" title="Daftar Isi" @click="tocOpen = !tocOpen" :aria-expanded="tocOpen">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
            Daftar Isi
          </button>

          <!-- Hafalan Mode Toggle -->
          <button
            class="toolbar-btn toolbar-btn--hafalan"
            :class="{ 'toolbar-btn--active': isHafalan }"
            :title="isHafalan ? 'Tampilkan kembali matan Arab' : 'Sembunyikan matan Arab untuk latihan hafalan'"
            @click="toggleHafalan"
            :aria-pressed="isHafalan"
          >
            <svg v-if="isHafalan" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>{{ isHafalan ? 'Matan Ditutup' : 'Mode Hafalan' }}</span>
          </button>

          <div class="toolbar-spacer" />

          <!-- Font size control -->
          <div class="font-size-control" role="group" aria-label="Ukuran teks">
            <button class="font-btn" @click="decreaseFont" aria-label="Perkecil teks" :disabled="fontSize <= 14">A-</button>
            <span class="font-label">{{ fontSize }}px</span>
            <button class="font-btn" @click="increaseFont" aria-label="Perbesar teks" :disabled="fontSize >= 26">A+</button>
          </div>
        </div>

        <!-- Prose content -->
        <article
          class="prose reader-prose fade-up"
          :class="{ 'hafalan-active': isHafalan }"
          :style="{ fontSize: `${fontSize}px` }"
          ref="articleEl"
        >
          <ContentRenderer :value="doc" />
        </article>

        <!-- Navigation next/prev -->
        <nav class="page-nav" aria-label="Navigasi halaman">
          <NuxtLink v-if="prevDoc" :to="prevDoc._path" class="page-nav-btn">
            ← {{ prevDoc.title }}
          </NuxtLink>
          <div class="page-nav-spacer" />
          <NuxtLink v-if="nextDoc" :to="nextDoc._path" class="page-nav-btn page-nav-btn--next">
            {{ nextDoc.title }} →
          </NuxtLink>
        </nav>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Rebuild _path dari slug parameter
const slugParts = computed(() => {
  const s = route.params.slug
  return Array.isArray(s) ? s : [s]
})
const docPath = computed(() => '/baca/' + slugParts.value.join('/'))

const { data: doc, pending } = await useAsyncData(`doc-${docPath.value}`, () =>
  queryContent(docPath.value).findOne()
)

// SEO
useSeoMeta({
  title:       computed(() => doc.value ? `${doc.value.title} — Kuttab` : 'Membaca Kitab'),
  description: computed(() => doc.value?.description ?? ''),
})

// Category colour
const catColors: Record<string, string> = {
  nahwu: '#35205A', fiqih: '#1E4A5C', tafsir: '#5C2030',
  hadits: '#1A2F5A', tasawuf: '#253A22', sejarah: '#5A3A15', english: '#1C3045',
}
const catColor = computed(() => catColors[doc.value?.category?.toLowerCase() ?? ''] ?? '#A8721C')

// Adjacent docs (prev / next dalam kategori yang sama)
const catSlug = computed(() => slugParts.value[0])
const { data: siblings } = await useAsyncData(`siblings-${catSlug.value}`, () =>
  queryContent(`/baca/${catSlug.value}`).only(['title', '_path']).find()
)

const currentIdx = computed(() =>
  siblings.value?.findIndex((s: any) => s._path === docPath.value) ?? -1
)
const prevDoc = computed(() =>
  currentIdx.value > 0 ? siblings.value![currentIdx.value - 1] : null
)
const nextDoc = computed(() =>
  siblings.value && currentIdx.value >= 0 && currentIdx.value < siblings.value.length - 1
    ? siblings.value[currentIdx.value + 1]
    : null
)

// TOC toggle
const tocOpen = ref(false)

// Mode Hafalan
const isHafalan = useState<boolean>('hafalanMode', () => false)
const HAFALAN_KEY = 'kuttab-hafalan-mode'

function toggleHafalan() {
  isHafalan.value = !isHafalan.value
  if (import.meta.client) {
    localStorage.setItem(HAFALAN_KEY, String(isHafalan.value))
  }
}

// Font size
const fontSize = ref(17)
const FONT_KEY = 'kuttab-font-size'
onMounted(() => {
  const storedFont = localStorage.getItem(FONT_KEY)
  if (storedFont) fontSize.value = parseInt(storedFont, 10)

  const storedHafalan = localStorage.getItem(HAFALAN_KEY)
  if (storedHafalan) isHafalan.value = storedHafalan === 'true'
})
function increaseFont() {
  if (fontSize.value < 26) {
    fontSize.value += 1
    localStorage.setItem(FONT_KEY, String(fontSize.value))
  }
}
function decreaseFont() {
  if (fontSize.value > 14) {
    fontSize.value -= 1
    localStorage.setItem(FONT_KEY, String(fontSize.value))
  }
}
</script>

<style scoped>
/* ── Wrapper ───────────────────────────────────────────── */
.reader-wrapper {
  display: flex;
  gap: 0;
  min-height: calc(100vh - 60px);
}

/* ── TOC Sidebar ───────────────────────────────────────── */
.toc-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  border-right: 1px solid var(--border);
  padding: 24px 16px;
  background: var(--surface);
}

.toc-close { display: none; }

.toc-header {
  margin-bottom: 12px;
}

.toc-title {
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--text3);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toc-link {
  display: block;
  padding: 6px 10px;
  border-radius: var(--r);
  font-size: .84rem;
  color: var(--text2);
  text-decoration: none;
  transition: all var(--t);
}
.toc-link:hover { background: var(--bg); color: var(--gold); }
.toc-link--sub {
  padding-left: 22px;
  font-size: .79rem;
  color: var(--text3);
}

.toc-empty { font-size: .84rem; color: var(--text3); }

/* ── Reader main ───────────────────────────────────────── */
.reader-main {
  flex: 1;
  min-width: 0;
  padding: 40px 48px 80px;
  max-width: 800px;
  margin: 0 auto;
}

/* Loading / Error */
.reader-loading,
.reader-error {
  padding: 60px 0;
  text-align: center;
  color: var(--text3);
}
.reader-error h1 { margin-bottom: 20px; }

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .8rem;
  color: var(--text3);
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.breadcrumb a { text-decoration: none; color: var(--text3); }
.breadcrumb a:hover { color: var(--gold); }

/* Kitab header */
.kitab-header {
  margin-bottom: 32px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
}

.kitab-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.kitab-cat-badge {
  font-size: .67rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: #fff;
  padding: 3px 10px;
  border-radius: 20px;
}

.kitab-level {
  font-size: .67rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--text3);
  padding: 3px 10px;
  border: 1px solid var(--border);
  border-radius: 20px;
}

.kitab-title-ar {
  font-size: 2rem;
  line-height: 2;
  color: var(--text);
  margin-bottom: 4px;
}

.kitab-title {
  font-size: 1.6rem;
  margin-bottom: 6px;
}

.kitab-author {
  font-size: .9rem;
  color: var(--gold);
  margin-bottom: 10px;
}

.kitab-desc {
  font-size: .9rem;
  color: var(--text2);
  line-height: 1.6;
}

/* Toolbar */
.reader-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r);
  margin-bottom: 32px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: var(--r);
  background: var(--bg);
  color: var(--text2);
  font-size: .83rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--t);
  font-family: var(--ff-ui);
}
.toolbar-btn:hover { border-color: var(--gold); color: var(--gold); }
.toolbar-btn--active {
  background: var(--gold-dim);
  border-color: var(--gold);
  color: var(--gold);
  font-weight: 600;
}

.toolbar-spacer { flex: 1; }

.font-size-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.font-btn {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border);
  border-radius: var(--r);
  background: var(--bg);
  color: var(--text2);
  font-size: .78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--t);
  font-family: var(--ff-ui);
  display: flex;
  align-items: center;
  justify-content: center;
}
.font-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); }
.font-btn:disabled { opacity: .4; cursor: not-allowed; }

.font-label {
  font-size: .8rem;
  color: var(--text3);
  min-width: 32px;
  text-align: center;
}

/* Prose */
.reader-prose {
  max-width: 72ch;
  line-height: 1.8;
  color: var(--text2);
}

/* Page nav */
.page-nav {
  display: flex;
  gap: 12px;
  margin-top: 60px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}

.page-nav-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border: 1px solid var(--border);
  border-radius: var(--r);
  font-size: .86rem;
  font-weight: 500;
  color: var(--text2);
  text-decoration: none;
  transition: all var(--t);
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.page-nav-btn:hover { border-color: var(--gold); color: var(--gold); }
.page-nav-btn--next { margin-left: auto; }

.page-nav-spacer { flex: 1; }

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 1100px) {
  .toc-sidebar {
    position: fixed;
    left: 0; top: 60px;
    height: calc(100vh - 60px);
    z-index: 250;
    transform: translateX(-100%);
    transition: transform 250ms ease;
    box-shadow: var(--shadow-lg);
  }
  .toc-sidebar.toc-open {
    transform: translateX(0);
  }
  .toc-close {
    display: flex;
    margin-bottom: 16px;
    background: none;
    border: none;
    font-size: 1rem;
    color: var(--text3);
    cursor: pointer;
    padding: 4px;
    align-self: flex-end;
  }
}

@media (max-width: 768px) {
  .reader-main { padding: 24px 20px 60px; }
  .kitab-title-ar { font-size: 1.5rem; }
  .kitab-title { font-size: 1.25rem; }
}
</style>
