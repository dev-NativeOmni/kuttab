<template>
  <div id="read-progress" ref="progressBar" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const progressBar = ref<HTMLElement | null>(null)

// Reading progress bar (hanya aktif di halaman baca)
const route = useRoute()
const isReaderPage = computed(() => route.path.startsWith('/baca/'))

onMounted(() => {
  const update = () => {
    if (!isReaderPage.value || !progressBar.value) return
    const doc   = document.documentElement
    const scrolled = doc.scrollTop
    const total    = doc.scrollHeight - doc.clientHeight
    progressBar.value.style.width = total > 0
      ? `${(scrolled / total) * 100}%`
      : '0%'
  }
  window.addEventListener('scroll', update, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', update))
})
</script>
