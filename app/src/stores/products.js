import { defineStore } from 'pinia'
import axios from '@/api'
import { useAuth } from '@/stores/auth.js'

const API = 'http://localhost:3000'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: []
  }),

  getters: {
    productsByManufacturer: (state) => {
      return (manufacturerId) => state.products.filter((p) => p.manufacturerId === manufacturerId)
    },

    activeProducts: (state) => {
      return state.products.filter((p) => p.status === 'active')
    }
  },

  actions: {
    authHeaders() {
      const auth = useAuth()
      if (!auth.token) return {}
      return { Authorization: `Bearer ${auth.token}` }
    },

    async fetchProducts() {
      try {
        const response = await axios.get(`${API}/product/get-all`, {
          headers: this.authHeaders()
        })
        this.products = response.data
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },

    async addProduct(product) {
      try {
        const response = await axios.post(`${API}/product/add`, product, {
          headers: this.authHeaders()
        })
        this.products.push(response.data)
      } catch (error) {
        console.error('Error adding product:', error)
      }
    },

    async updateProductStatus(id, status) {
      try {
        await axios.put(`${API}/product/update-status`, { id, status }, {
          headers: this.authHeaders()
        })
        const product = this.products.find((p) => p.id === id)
        if (product) product.status = status
      } catch (error) {
        console.error('Error updating product status:', error)
      }
    },

    async updateProductPrice(id, price) {
      try {
        await axios.put(`${API}/product/update-price`, { id, price }, {
          headers: this.authHeaders()
        })
        const product = this.products.find((p) => p.id === id)
        if (product) product.price = price
      } catch (error) {
        console.error('Error updating product price:', error)
      }
    },

    async deleteProduct(id) {
      try {
        await axios.delete(`${API}/product/delete`, {
          data: { id },
          headers: this.authHeaders()
        })
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) this.products.splice(index, 1)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }
})
