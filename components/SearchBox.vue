<template>
  <div class="search-wrapper" :class="{ 'search-wrapper--open': open }">
    <div class="search-input-wrap">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input
        ref="inputEl"
        v-model="query"
        type="search"
        placeholder="Cari kitab, bab, atau teks..."
        class="search-input"
        aria-label="Cari kitab"
        @focus="open = true"
        @blur="onBlur"
        @keydown.escape="close"
        @keydown.arrow-down.prevent="focusResult(0)"
      />
    </div>

    <!-- Dropdown results -->
    <div v-if="open && query.length > 1" class="search-dropdown" role="listbox" aria-label="Hasil pencarian">
      <template v-if="results.length">
        <NuxtLink
          v-for="(item, i) in results.slice(0, 8)"
          :key="item.id"
          :to="item._path"
          class="search-result"
          role="option"
          :ref="(el) => { resultEls[i] = el as HTMLElement }"
          @click="close"
          @keydown.arrow-down.prevent="focusResult(i + 1)"
          @keydown.arrow-up.prevent="focusResult(i - 1)"
        >
          <div class="result-cat" :style="{ background: catColor(item.category) }">
            {{ item.category ?? '—' }}
          </div>
          <div class="result-body">
            <span class="result-title">{{ item.title }}</span>
            <span v-if="item.author" class="result-author">{{ item.author }}</span>
          </div>
        </NuxtLink>
      </template>
      <div v-else class="search-empty">
        Tidak ditemukan untuk "<strong>{{ query }}</strong>"
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { search } = useSearch()

const query      = ref('')
const open       = ref(false)
const inputEl    = ref<HTMLInputElement | null>(null)
const resultEls  = ref<HTMLElement[]>([])
const results    = ref<any[]>([])

watch(query, async (q) => {
  if (q.length > 1) results.value = await search(q)
  else results.value = []
})

function close() {
  open.value  = false
  query.value = ''
  results.value = []
}

function onBlur() {
  // delay so click on result fires first
  setTimeout(() => { open.value = false }, 150)
}

function focusResult(i: number) {
  const el = resultEls.value[i]
  if (el) el.focus()
}

const catColors: Record<string, string> = {
  nahwu:   '#35205A',
  fiqih:   '#1E4A5C',
  tafsir:  '#5C2030',
  hadits:  '#1A2F5A',
  tasawuf: '#253A22',
  sejarah: '#5A3A15',
  english: '#1C3045',
}
function catColor(cat?: string) {
  return catColors[cat?.toLowerCase() ?? ''] ?? '#5A3A15'
}
</script>

<style scoped>
.search-wrapper {
  position: relative;
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--text3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  height: 38px;
  padding: 0 14px 0 38px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface);
  color: var(--text);
  font-family: var(--ff-ui);
  font-size: .88rem;
  outline: none;
  transition: border-color var(--t), box-shadow var(--t);
}
.search-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-dim);
}
.search-input::placeholder { color: var(--text3); }

/* Dropdown */
.search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--rl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  z-index: 500;
  animation: fadeUp 150ms ease both;
}

.search-result {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  text-decoration: none;
  color: var(--text);
  transition: background var(--t);
  outline: none;
}
.search-result:hover,
.search-result:focus {
  background: var(--surface);
}

.result-cat {
  flex-shrink: 0;
  font-size: .62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: #fff;
  padding: 2px 8px;
  border-radius: 20px;
}

.result-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.result-title {
  font-size: .88rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-author {
  font-size: .75rem;
  color: var(--text3);
}

.search-empty {
  padding: 16px 14px;
  font-size: .85rem;
  color: var(--text3);
  text-align: center;
}
</style>
