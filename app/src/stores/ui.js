import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    searchQuery: '',
    selectedCategories: [],
    selectedLocations: [],
    sidebarOpen: true
  }),

  getters: {
    hasActiveFilters: (state) => {
      return state.selectedCategories.length > 0 || state.selectedLocations.length > 0
    },

    currentFilters: (state) => {
      return {
        categories: state.selectedCategories,
        locations: state.selectedLocations,
        search: state.searchQuery
      }
    },

    isSearching: (state) => {
      return state.searchQuery.length > 0
    }
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query
    },

    setFilters(categories, locations) {
      this.selectedCategories = categories
      this.selectedLocations = locations
    },

    clearFilters() {
      this.searchQuery = ''
      this.selectedCategories = []
      this.selectedLocations = []
    }
  }
})
