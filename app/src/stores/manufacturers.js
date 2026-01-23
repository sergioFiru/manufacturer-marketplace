import { defineStore } from 'pinia'

export const useManufacturersStore = defineStore('manufacturers', {
  // STATE - the data
  state: () => ({
    manufacturers: [
      {
        id: 1,
        name: 'TechCorp Industries',
        description: 'Leading manufacturer of electronic components',
        category: 'Electronics',
        location: 'North America'
      },
      {
        id: 2,
        name: 'Global Manufacturing Co',
        description: 'Worldwide supplier of industrial equipment',
        category: 'Automotive',
        location: 'Europe'
      },
      {
        id: 3,
        name: 'Precision Parts Ltd',
        description: 'Specialized in high-precision mechanical parts',
        category: 'Automotive',
        location: 'Asia'
      },
      {
        id: 4,
        name: 'Textile Masters',
        description: 'Premium fabric and textile manufacturer',
        category: 'Textiles',
        location: 'Asia'
      },
      {
        id: 5,
        name: 'FoodPro Inc',
        description: 'Organic food processing and packaging',
        category: 'Food & Beverage',
        location: 'North America'
      }
    ]
  }),

  // GETTERS - computed values (read-only)
  getters: {
    // Getter 1: Find a manufacturer by ID
    getManufacturerById: (state) => {
      return (id) => state.manufacturers.find((m) => m.id === id)
    },

    // Getter 2: Get manufacturers filtered by category
    manufacturersByCategory: (state) => {
      return (category) => {
        if (!category) return state.manufacturers
        return state.manufacturers.filter((m) => m.category === category)
      }
    }
  },

  // ACTIONS - functions that modify state
  actions: {
    // Action 1: Add a new manufacturer
    addManufacturer(manufacturer) {
      const newId = Math.max(...this.manufacturers.map((m) => m.id)) + 1
      this.manufacturers.push({ ...manufacturer, id: newId })
    },

    // Action 2: Delete a manufacturer
    deleteManufacturer(id) {
      const index = this.manufacturers.findIndex((m) => m.id === id)
      if (index !== -1) {
        this.manufacturers.splice(index, 1)
      }
    }
  }
})
