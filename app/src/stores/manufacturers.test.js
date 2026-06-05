import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useManufacturersStore } from '@/stores/manufacturers'

vi.mock('@/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('@/stores/auth.js', () => ({
  useAuth: () => ({ token: 'test-token' })
}))

describe('manufacturers store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initial state is empty', () => {
    const store = useManufacturersStore()
    expect(store.manufacturers).toEqual([])
  })

  it('authHeaders returns Authorization header when token exists', () => {
    const store = useManufacturersStore()
    expect(store.authHeaders()).toEqual({ Authorization: 'Bearer test-token' })
  })

  it('fetchManufacturers populates manufacturers', async () => {
    const axios = await import('@/api')
    axios.default.get.mockResolvedValue({
      data: [{ id: 1, name: 'Acme', category: 'Electronics', location: 'Europe' }]
    })
    const store = useManufacturersStore()
    await store.fetchManufacturers()
    expect(store.manufacturers).toHaveLength(1)
    expect(store.manufacturers[0].name).toBe('Acme')
  })

  it('addManufacturer pushes to manufacturers', async () => {
    const axios = await import('@/api')
    axios.default.post.mockResolvedValue({
      data: { id: 2, name: 'NewCo', category: 'Textiles', location: 'Asia' }
    })
    const store = useManufacturersStore()
    await store.addManufacturer({ name: 'NewCo' })
    expect(store.manufacturers).toHaveLength(1)
    expect(store.manufacturers[0].name).toBe('NewCo')
  })

  it('updateManufacturer updates existing item', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useManufacturersStore()
    store.manufacturers = [{ id: 1, name: 'Old', location: 'Europe' }]
    await store.updateManufacturer(1, { name: 'Updated' })
    expect(store.manufacturers[0].name).toBe('Updated')
  })

  it('updateManufacturer does nothing when id not found', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useManufacturersStore()
    store.manufacturers = [{ id: 1, name: 'Acme' }]
    await store.updateManufacturer(99, { name: 'X' })
    expect(store.manufacturers[0].name).toBe('Acme')
  })

  it('deleteManufacturer removes item', async () => {
    const axios = await import('@/api')
    axios.default.delete.mockResolvedValue({ data: { success: true } })
    const store = useManufacturersStore()
    store.manufacturers = [{ id: 1, name: 'Acme' }, { id: 2, name: 'Beta' }]
    await store.deleteManufacturer(1)
    expect(store.manufacturers).toHaveLength(1)
    expect(store.manufacturers[0].id).toBe(2)
  })

  it('getManufacturerById returns correct item', () => {
    const store = useManufacturersStore()
    store.manufacturers = [{ id: 1, name: 'Acme' }, { id: 2, name: 'Beta' }]
    expect(store.getManufacturerById(2).name).toBe('Beta')
  })

  it('getManufacturerById returns undefined when not found', () => {
    const store = useManufacturersStore()
    store.manufacturers = [{ id: 1, name: 'Acme' }]
    expect(store.getManufacturerById(99)).toBeUndefined()
  })

  it('manufacturersByCategory filters by category', () => {
    const store = useManufacturersStore()
    store.manufacturers = [
      { id: 1, name: 'A', category: 'Electronics' },
      { id: 2, name: 'B', category: 'Textiles' }
    ]
    expect(store.manufacturersByCategory('Electronics')).toHaveLength(1)
    expect(store.manufacturersByCategory('Electronics')[0].name).toBe('A')
  })

  it('manufacturersByCategory returns all when no category', () => {
    const store = useManufacturersStore()
    store.manufacturers = [
      { id: 1, name: 'A', category: 'Electronics' },
      { id: 2, name: 'B', category: 'Textiles' }
    ]
    expect(store.manufacturersByCategory(null)).toHaveLength(2)
  })

  it('fetchManufacturers handles error gracefully', async () => {
    const axios = await import('@/api')
    axios.default.get.mockRejectedValue(new Error('Network error'))
    const store = useManufacturersStore()
    await expect(store.fetchManufacturers()).resolves.not.toThrow()
    expect(store.manufacturers).toEqual([])
  })
})
