<template>
  <div class="layout-wrapper">
    <!-- ── HEADER ───────────────────────────────────────── -->
    <header class="site-header">
      <div class="container header-inner">
        <!-- Logo -->
        <NuxtLink to="/" class="logo">
          <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="30,7 33.6,20.4 46.4,16.2 39.6,27.4 52,30 39.6,32.6 46.4,43.8 33.6,39.6 30,53 26.4,39.6 13.6,43.8 20.4,32.6 8,30 20.4,27.4 13.6,16.2 26.4,20.4" fill="currentColor"/>
          </svg>
          <span class="logo-text">Kuttab</span>
        </NuxtLink>

        <!-- Search (desktop) -->
        <div class="header-search">
          <SearchBox />
        </div>

        <!-- Right actions -->
        <nav class="header-actions" aria-label="Header navigation">
          <NuxtLink to="/katalog" class="nav-link" active-class="nav-link--active">
            Katalog
          </NuxtLink>
          <button class="theme-toggle" :title="isDark ? 'Mode terang' : 'Mode gelap'" @click="toggleTheme" :aria-label="isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414L5.636 16.95zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
          </button>
        </nav>
      </div>
    </header>

    <!-- ── MAIN ─────────────────────────────────────────── -->
    <main class="site-main">
      <slot />
    </main>

    <!-- ── FOOTER ───────────────────────────────────────── -->
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-logo">
          <svg width="20" height="20" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <polygon points="30,7 33.6,20.4 46.4,16.2 39.6,27.4 52,30 39.6,32.6 46.4,43.8 33.6,39.6 30,53 26.4,39.6 13.6,43.8 20.4,32.6 8,30 20.4,27.4 13.6,16.2 26.4,20.4" fill="currentColor"/>
          </svg>
          <span>Kuttab</span>
        </div>
        <p class="footer-tagline">Perpustakaan Kitab Islam Digital — gratis, terbuka, mudah diakses.</p>
        <p class="footer-copy">© {{ new Date().getFullYear() }} Kuttab. Seluruh konten mengikuti lisensi masing-masing kitab.</p>
      </div>
    </footer>

    <!-- ── MOBILE BOTTOM NAV ─────────────────────────────── -->
    <nav class="mobile-nav" aria-label="Navigasi bawah">
      <NuxtLink to="/" class="mobile-nav-item" active-class="mobile-nav-item--active" exact>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        <span>Beranda</span>
      </NuxtLink>
      <NuxtLink to="/katalog" class="mobile-nav-item" active-class="mobile-nav-item--active">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        <span>Katalog</span>
      </NuxtLink>
      <button class="mobile-nav-item" @click="toggleTheme" aria-label="Ganti tema">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>
        <span>Tema</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
const isDark = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('kuttab-theme')
  if (stored) {
    isDark.value = stored === 'dark'
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme()
})

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
  localStorage.setItem('kuttab-theme', isDark.value ? 'dark' : 'light')
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
}
</script>

<style scoped>
/* ── Layout shell ──────────────────────────────────────── */
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-main {
  flex: 1;
}

/* ── Header ───────────────────────────────────────────── */
.site-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gold);
  font-family: var(--ff-di);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -.02em;
  flex-shrink: 0;
  text-decoration: none;
}

.header-search {
  flex: 1;
  max-width: 480px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.nav-link {
  padding: 7px 14px;
  border-radius: var(--r);
  font-size: .88rem;
  font-weight: 500;
  color: var(--text2);
  transition: color var(--t), background var(--t);
}
.nav-link:hover,
.nav-link--active {
  color: var(--gold);
  background: var(--gold-dim);
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--r);
  background: none;
  color: var(--text2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--t), background var(--t);
}
.theme-toggle:hover {
  background: var(--surface);
  color: var(--gold);
}

/* ── Footer ───────────────────────────────────────────── */
.site-footer {
  border-top: 1px solid var(--border);
  padding-block: 32px;
  margin-bottom: 72px; /* room for mobile nav */
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--gold);
  font-family: var(--ff-di);
  font-weight: 700;
  font-size: .95rem;
}

.footer-tagline {
  font-size: .85rem;
  color: var(--text2);
}

.footer-copy {
  font-size: .78rem;
  color: var(--text3);
}

/* ── Mobile bottom nav ────────────────────────────────── */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 68px;
  background: var(--bg);
  border-top: 1px solid var(--border);
  z-index: 300;
  padding-inline: 8px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.mobile-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: .68rem;
  font-weight: 500;
  color: var(--text3);
  background: none;
  border: none;
  text-decoration: none;
  transition: color var(--t);
  cursor: pointer;
  font-family: var(--ff-ui);
}
.mobile-nav-item:hover,
.mobile-nav-item--active {
  color: var(--gold);
}

@media (max-width: 768px) {
  .header-search { display: none; }
  .header-actions .nav-link { display: none; }
  .site-footer { margin-bottom: 68px; }
  .mobile-nav { display: flex; }
}
</style>
