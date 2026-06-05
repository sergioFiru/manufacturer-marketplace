import { defineStore } from 'pinia'
import axios from '@/api'
import { useAuth } from '@/stores/auth.js'

const API = 'http://localhost:3000'

export const useManufacturersStore = defineStore('manufacturers', {
  state: () => ({
    manufacturers: []
  }),

  getters: {
    getManufacturerById: (state) => {
      return (id) => state.manufacturers.find((m) => m.id === id)
    },

    manufacturersByCategory: (state) => {
      return (category) => {
        if (!category) return state.manufacturers
        return state.manufacturers.filter((m) => m.category === category)
      }
    }
  },

  actions: {
    authHeaders() {
      const auth = useAuth()
      if (!auth.token) return {}
      return { Authorization: `Bearer ${auth.token}` }
    },

    async fetchManufacturers() {
      try {
        const response = await axios.get(`${API}/manufacturer/get-all`, {
          headers: this.authHeaders()
        })
        this.manufacturers = response.data
      } catch (error) {
        console.error('Error fetching manufacturers:', error)
      }
    },

    async addManufacturer(manufacturer) {
      try {
        const response = await axios.post(`${API}/manufacturer/add`, manufacturer, {
          headers: this.authHeaders()
        })
        this.manufacturers.push(response.data)
      } catch (error) {
        console.error('Error adding manufacturer:', error)
      }
    },

    async updateManufacturer(id, data) {
      try {
        await axios.put(`${API}/manufacturer/update`, { id, ...data }, {
          headers: this.authHeaders()
        })
        const index = this.manufacturers.findIndex((m) => m.id === id)
        if (index !== -1) Object.assign(this.manufacturers[index], data)
      } catch (error) {
        console.error('Error updating manufacturer:', error)
      }
    },

    async deleteManufacturer(id) {
      try {
        await axios.delete(`${API}/manufacturer/delete`, {
          data: { id },
          headers: this.authHeaders()
        })
        const index = this.manufacturers.findIndex((m) => m.id === id)
        if (index !== -1) this.manufacturers.splice(index, 1)
      } catch (error) {
        console.error('Error deleting manufacturer:', error)
      }
    }
  }
})
