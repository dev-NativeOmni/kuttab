import Fuse from 'fuse.js'

// Tipe minimal untuk item kitab yang bisa di-search
interface KitabItem {
  id: string
  title: string
  author?: string
  category?: string
  description?: string
  _path: string
}

let fuse: Fuse<KitabItem> | null = null
let indexLoaded = false

export function useSearch() {
  /**
   * Inisialisasi Fuse.js dari daftar konten @nuxt/content.
   * Di-cache agar hanya sekali fetch per sesi.
   */
  async function init() {
    if (indexLoaded) return

    // queryContent() tersedia secara global via @nuxt/content
    const items = await queryContent('/')
      .only(['title', 'author', 'category', 'description', '_path'])
      .find()

    const data: KitabItem[] = (items as any[]).map((item) => ({
      id:          item._path,
      title:       item.title ?? '',
      author:      item.author ?? '',
      category:    item.category ?? '',
      description: item.description ?? '',
      _path:       item._path,
    }))

    fuse = new Fuse(data, {
      keys: [
        { name: 'title',       weight: 0.5  },
        { name: 'author',      weight: 0.2  },
        { name: 'description', weight: 0.2  },
        { name: 'category',    weight: 0.1  },
      ],
      threshold:       0.35,
      includeScore:    false,
      minMatchCharLength: 2,
    })

    indexLoaded = true
  }

  /**
   * Cari kitab berdasarkan query string.
   * Mengembalikan array KitabItem (maks 12 hasil).
   */
  async function search(query: string): Promise<KitabItem[]> {
    if (!query || query.length < 2) return []
    await init()
    if (!fuse) return []
    return fuse.search(query, { limit: 12 }).map((r) => r.item)
  }

  return { search }
}
