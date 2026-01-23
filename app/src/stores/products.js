import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  // STATE
  state: () => ({
    products: [
      { id: 1, name: 'Circuit Board A1', manufacturerId: 1, status: 'active', price: 25.99 },
      { id: 2, name: 'LED Display Panel', manufacturerId: 1, status: 'active', price: 149.99 },
      { id: 3, name: 'Engine Component X', manufacturerId: 2, status: 'pending', price: 599.99 },
      { id: 4, name: 'Brake Assembly Kit', manufacturerId: 2, status: 'active', price: 299.99 },
      { id: 5, name: 'Precision Gear Set', manufacturerId: 3, status: 'active', price: 89.99 },
      { id: 6, name: 'Cotton Fabric Roll', manufacturerId: 4, status: 'active', price: 45.0 },
      { id: 7, name: 'Silk Blend Material', manufacturerId: 4, status: 'pending', price: 120.0 },
      { id: 8, name: 'Organic Juice Pack', manufacturerId: 5, status: 'active', price: 12.99 }
    ]
  }),

  // GETTERS
  getters: {
    // Getter 1: Get products by manufacturer ID
    productsByManufacturer: (state) => {
      return (manufacturerId) => state.products.filter((p) => p.manufacturerId === manufacturerId)
    },

    // Getter 2: Get only active products
    activeProducts: (state) => {
      return state.products.filter((p) => p.status === 'active')
    }
  },

  // ACTIONS
  actions: {
    // Action 1: Add a product
    addProduct(product) {
      const newId = Math.max(...this.products.map((p) => p.id)) + 1
      this.products.push({ ...product, id: newId })
    },

    // Action 2: Update product status
    updateProductStatus(id, status) {
      const product = this.products.find((p) => p.id === id)
      if (product) {
        product.status = status
      }
    }
  }
})
