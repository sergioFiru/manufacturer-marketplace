import { defineStore } from 'pinia'
import axios from '@/api'
import { useAuth } from '@/stores/auth.js'

const API = 'http://localhost:3000'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: []
  }),

  actions: {
    authHeaders() {
      const auth = useAuth()
      if (!auth.token) return {}
      return { Authorization: `Bearer ${auth.token}` }
    },

    async fetchCategories() {
      try {
        const response = await axios.get(`${API}/category/get-all`, {
          headers: this.authHeaders()
        })
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
  }
})
