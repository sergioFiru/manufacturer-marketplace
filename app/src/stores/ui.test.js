import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUiStore } from '@/stores/ui'

describe('ui store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial state', () => {
    const store = useUiStore()
    expect(store.searchQuery).toBe('')
    expect(store.selectedCategories).toEqual([])
    expect(store.selectedLocations).toEqual([])
    expect(store.sidebarOpen).toBe(true)
  })

  it('setSearchQuery updates searchQuery', () => {
    const store = useUiStore()
    store.setSearchQuery('electronics')
    expect(store.searchQuery).toBe('electronics')
  })

  it('setFilters updates categories and locations', () => {
    const store = useUiStore()
    store.setFilters(['Electronics', 'Automotive'], ['Europe'])
    expect(store.selectedCategories).toEqual(['Electronics', 'Automotive'])
    expect(store.selectedLocations).toEqual(['Europe'])
  })

  it('clearFilters resets all filter state', () => {
    const store = useUiStore()
    store.setSearchQuery('test')
    store.setFilters(['Electronics'], ['Asia'])
    store.clearFilters()
    expect(store.searchQuery).toBe('')
    expect(store.selectedCategories).toEqual([])
    expect(store.selectedLocations).toEqual([])
  })

  it('hasActiveFilters is false when no filters set', () => {
    const store = useUiStore()
    expect(store.hasActiveFilters).toBe(false)
  })

  it('hasActiveFilters is true when category filter set', () => {
    const store = useUiStore()
    store.setFilters(['Electronics'], [])
    expect(store.hasActiveFilters).toBe(true)
  })

  it('hasActiveFilters is true when location filter set', () => {
    const store = useUiStore()
    store.setFilters([], ['Europe'])
    expect(store.hasActiveFilters).toBe(true)
  })

  it('currentFilters returns correct object', () => {
    const store = useUiStore()
    store.setSearchQuery('test')
    store.setFilters(['Electronics'], ['Asia'])
    expect(store.currentFilters).toEqual({
      categories: ['Electronics'],
      locations: ['Asia'],
      search: 'test'
    })
  })

  it('isSearching is false when searchQuery is empty', () => {
    const store = useUiStore()
    expect(store.isSearching).toBe(false)
  })

  it('isSearching is true when searchQuery has value', () => {
    const store = useUiStore()
    store.setSearchQuery('hello')
    expect(store.isSearching).toBe(true)
  })
})
