<template>
  <div
    class="ar-matn"
    :class="{
      'ar-matn--hafalan': isHafalan && !isRevealed,
      'ar-matn--revealed': isHafalan && isRevealed,
    }"
    @click="handleToggleReveal"
  >
    <div v-if="isHafalan" class="hafalan-badge" :title="isRevealed ? 'Klik untuk sembunyikan kembali' : 'Klik untuk melihat matan'">
      <span v-if="!isRevealed">🔒 Mode Hafalan — Klik untuk intip matan</span>
      <span v-else>👁️ Matan terbuka — Klik untuk tutup</span>
    </div>

    <div class="ar-matn-content ar">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const isHafalan = useState<boolean>('hafalanMode', () => false)
const isRevealed = ref(false)

// Reset revealed state when hafalan mode is toggled off
watch(isHafalan, (val) => {
  if (!val) {
    isRevealed.value = false
  }
})

function handleToggleReveal() {
  if (isHafalan.value) {
    isRevealed.value = !isRevealed.value
  }
}
</script>

<style scoped>
.ar-matn {
  position: relative;
  font-family: var(--ff-ar);
  font-size: 1.5rem;
  line-height: 2.2;
  direction: rtl;
  text-align: right;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--rl);
  padding: 24px 28px;
  margin-block: 20px;
  transition: all var(--t);
}

.ar-matn-content {
  transition: filter 200ms ease, opacity 200ms ease;
}

/* Hafalan mode styling */
.ar-matn--hafalan {
  cursor: pointer;
  border-style: dashed;
  border-color: var(--gold);
  background: color-mix(in srgb, var(--surface) 90%, var(--gold) 10%);
}

.ar-matn--hafalan .ar-matn-content {
  filter: blur(8px);
  opacity: 0.25;
  user-select: none;
  pointer-events: none;
}

.ar-matn--revealed {
  border-color: var(--gold);
  cursor: pointer;
}

.hafalan-badge {
  direction: ltr;
  text-align: center;
  font-family: var(--ff-ui);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 12px;
  padding: 4px 10px;
  background: var(--gold-dim);
  border-radius: 20px;
  display: inline-block;
  user-select: none;
}

@media (max-width: 768px) {
  .ar-matn {
    font-size: 1.3rem;
    line-height: 2;
    padding: 18px 20px;
  }
}
</style>

