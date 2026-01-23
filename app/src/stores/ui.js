import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  // STATE
  state: () => ({
    searchQuery: '',
    selectedCategories: [],
    selectedLocations: [],
    sidebarOpen: true
  }),

  // GETTERS (3)
  getters: {
    // Getter 1: Check if any filter is active
    hasActiveFilters: (state) => {
      return state.selectedCategories.length > 0 || state.selectedLocations.length > 0
    },

    // Getter 2: Get current filters as object
    currentFilters: (state) => {
      return {
        categories: state.selectedCategories,
        locations: state.selectedLocations,
        search: state.searchQuery
      }
    },

    // Getter 3: Check if search is active
    isSearching: (state) => {
      return state.searchQuery.length > 0
    }
  },

  // ACTIONS (3)
  actions: {
    // Action 1: Set search query
    setSearchQuery(query) {
      this.searchQuery = query
    },

    // Action 2: Set filters
    setFilters(categories, locations) {
      this.selectedCategories = categories
      this.selectedLocations = locations
    },

    // Action 3: Clear all filters
    clearFilters() {
      this.searchQuery = ''
      this.selectedCategories = []
      this.selectedLocations = []
    }
  }
})
