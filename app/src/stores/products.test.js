import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '@/stores/products'

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

describe('products store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initial state is empty', () => {
    const store = useProductsStore()
    expect(store.products).toEqual([])
  })

  it('fetchProducts populates products', async () => {
    const axios = await import('@/api')
    axios.default.get.mockResolvedValue({
      data: [{ id: 1, name: 'Widget', status: 'active', price: 9.99 }]
    })
    const store = useProductsStore()
    await store.fetchProducts()
    expect(store.products).toHaveLength(1)
    expect(store.products[0].name).toBe('Widget')
  })

  it('addProduct pushes to products', async () => {
    const axios = await import('@/api')
    axios.default.post.mockResolvedValue({
      data: { id: 2, name: 'Gadget', status: 'pending', price: 19.99 }
    })
    const store = useProductsStore()
    await store.addProduct({ name: 'Gadget', price: 19.99, ManufacturerId: 1 })
    expect(store.products).toHaveLength(1)
    expect(store.products[0].name).toBe('Gadget')
  })

  it('updateProductStatus updates the product', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useProductsStore()
    store.products = [{ id: 1, name: 'Widget', status: 'pending' }]
    await store.updateProductStatus(1, 'active')
    expect(store.products[0].status).toBe('active')
  })

  it('updateProductStatus does nothing when id not found', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useProductsStore()
    store.products = [{ id: 1, status: 'pending' }]
    await store.updateProductStatus(99, 'active')
    expect(store.products[0].status).toBe('pending')
  })

  it('updateProductPrice updates the product price', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useProductsStore()
    store.products = [{ id: 1, name: 'Widget', price: 9.99 }]
    await store.updateProductPrice(1, 14.99)
    expect(store.products[0].price).toBe(14.99)
  })

  it('deleteProduct removes item', async () => {
    const axios = await import('@/api')
    axios.default.delete.mockResolvedValue({ data: { success: true } })
    const store = useProductsStore()
    store.products = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
    await store.deleteProduct(1)
    expect(store.products).toHaveLength(1)
    expect(store.products[0].id).toBe(2)
  })

  it('productsByManufacturer filters correctly', () => {
    const store = useProductsStore()
    store.products = [
      { id: 1, name: 'A', manufacturerId: 10 },
      { id: 2, name: 'B', manufacturerId: 20 }
    ]
    expect(store.productsByManufacturer(10)).toHaveLength(1)
    expect(store.productsByManufacturer(10)[0].name).toBe('A')
  })

  it('activeProducts returns only active', () => {
    const store = useProductsStore()
    store.products = [
      { id: 1, status: 'active' },
      { id: 2, status: 'pending' },
      { id: 3, status: 'active' }
    ]
    expect(store.activeProducts).toHaveLength(2)
  })

  it('fetchProducts handles error gracefully', async () => {
    const axios = await import('@/api')
    axios.default.get.mockRejectedValue(new Error('Network error'))
    const store = useProductsStore()
    await expect(store.fetchProducts()).resolves.not.toThrow()
    expect(store.products).toEqual([])
  })
})
