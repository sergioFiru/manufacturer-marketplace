import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'

vi.mock('@/api', () => ({
  default: {
    get: vi.fn()
  }
}))

vi.mock('@/stores/auth.js', () => ({
  useAuth: () => ({ token: 'test-token' })
}))

describe('categories store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initial state is empty', () => {
    const store = useCategoriesStore()
    expect(store.categories).toEqual([])
  })

  it('fetchCategories populates categories', async () => {
    const axios = await import('@/api')
    axios.default.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Automotive' }
      ]
    })
    const store = useCategoriesStore()
    await store.fetchCategories()
    expect(store.categories).toHaveLength(2)
    expect(store.categories[0].name).toBe('Electronics')
  })

  it('authHeaders returns Authorization header when token exists', () => {
    const store = useCategoriesStore()
    expect(store.authHeaders()).toEqual({ Authorization: 'Bearer test-token' })
  })

  it('fetchCategories handles error gracefully', async () => {
    const axios = await import('@/api')
    axios.default.get.mockRejectedValue(new Error('Network error'))
    const store = useCategoriesStore()
    await expect(store.fetchCategories()).resolves.not.toThrow()
    expect(store.categories).toEqual([])
  })
})
