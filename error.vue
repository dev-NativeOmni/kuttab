<template>
  <NuxtLayout>
    <div class="error-page container">
      <div class="error-card fade-up">
        <div class="error-icon-wrapper" aria-hidden="true">
          <svg class="error-star" width="64" height="64" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,7 33.6,20.4 46.4,16.2 39.6,27.4 52,30 39.6,32.6 46.4,43.8 33.6,39.6 30,53 26.4,39.6 13.6,43.8 20.4,32.6 8,30 20.4,27.4 13.6,16.2 26.4,20.4" fill="currentColor"/>
          </svg>
        </div>

        <div class="error-code">{{ error?.statusCode || 404 }}</div>
        <div class="error-ar ar">
          {{ error?.statusCode === 404 ? 'الصفحة غير موجودة' : 'حدث خطأ' }}
        </div>
        <h1 class="error-title">
          {{ error?.statusCode === 404 ? 'Halaman Tidak Ditemukan' : 'Terjadi Kesalahan' }}
        </h1>
        <p class="error-desc">
          {{ error?.statusCode === 404
            ? 'Maaf, halaman atau kitab yang Anda cari tidak ditemukan.'
            : (error?.statusMessage || 'Terjadi gangguan saat memuat halaman.') }}
        </p>

        <div class="error-actions">
          <button @click="handleClearError" class="btn-primary">
            Jelajahi Katalog
          </button>
          <NuxtLink to="/" class="btn-outline">
            Kembali ke Beranda
          </NuxtLink>
        </div>

        <div class="error-categories">
          <span class="error-cat-title">Kategori Kitab:</span>
          <div class="cat-pill-group">
            <NuxtLink to="/katalog/nahwu" class="cat-pill">Nahwu</NuxtLink>
            <NuxtLink to="/katalog/fiqih" class="cat-pill">Fiqih</NuxtLink>
            <NuxtLink to="/katalog/tafsir" class="cat-pill">Tafsir</NuxtLink>
            <NuxtLink to="/katalog/hadits" class="cat-pill">Hadits</NuxtLink>
            <NuxtLink to="/katalog/tasawuf" class="cat-pill">Tasawuf</NuxtLink>
            <NuxtLink to="/katalog/sejarah" class="cat-pill">Sejarah</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: `${props.error?.statusCode || 404} — Kuttab`,
})

function handleClearError() {
  clearError({ redirect: '/katalog' })
}
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding-block: 60px;
}

.error-card {
  text-align: center;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rl);
  padding: 48px 36px;
  max-width: 580px;
  width: 100%;
  box-shadow: var(--shadow);
}

.error-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--gold);
}

.error-code {
  font-family: var(--ff-di);
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--gold);
  margin-bottom: 8px;
}

.error-ar {
  font-size: 1.8rem;
  line-height: 1.6;
  color: var(--text2);
  margin-bottom: 8px;
}

.error-title {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: var(--text);
}

.error-desc {
  font-size: 0.92rem;
  color: var(--text2);
  line-height: 1.6;
  margin-bottom: 28px;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.error-categories {
  border-top: 1px solid var(--border);
  padding-top: 24px;
}

.error-cat-title {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text3);
  margin-bottom: 12px;
}

.cat-pill-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-pill {
  padding: 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text2);
  font-size: 0.8rem;
  text-decoration: none;
  transition: all var(--t);
}

.cat-pill:hover {
  border-color: var(--gold);
  color: var(--gold);
  background: var(--surface2);
}

@media (max-width: 600px) {
  .error-card {
    padding: 36px 20px;
  }
  .error-code {
    font-size: 2.8rem;
  }
  .error-ar {
    font-size: 1.4rem;
  }
  .error-title {
    font-size: 1.25rem;
  }
}
</style>

