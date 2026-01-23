<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useUiStore } from '@/stores/ui'
  import FilterSidebar from '../components/FilterSidebar.vue'
  import ManufacturerList from '../components/ManufacturerList.vue'

  const router = useRouter()
  const manufacturersStore = useManufacturersStore()
  const uiStore = useUiStore()

  const categories = ['Electronics', 'Automotive', 'Textiles', 'Food & Beverage']
  const locations = ['North America', 'Europe', 'Asia', 'South America']

  // COMPUTED: Filter manufacturers based on UI state
  // This automatically updates when filters change!
  const filteredManufacturers = computed(() => {
    let result = manufacturersStore.manufacturers

    // Filter by categories if any selected
    if (uiStore.selectedCategories.length > 0) {
      result = result.filter((m) => uiStore.selectedCategories.includes(m.category))
    }

    // Filter by locations if any selected
    if (uiStore.selectedLocations.length > 0) {
      result = result.filter((m) => uiStore.selectedLocations.includes(m.location))
    }

    // Filter by search query if present
    if (uiStore.searchQuery) {
      const query = uiStore.searchQuery.toLowerCase()
      result = result.filter(
        (m) => m.name.toLowerCase().includes(query) || m.description.toLowerCase().includes(query)
      )
    }

    return result
  })

  function handleFilterChange(filter) {
    // Save filters to UI store
    uiStore.setFilters(filter.categories || [], filter.locations || [])
  }

  function handleSelectManufacturer(manufacturer) {
    router.push(`/manufacturer/${manufacturer.id}`)
  }
</script>

<template>
  <div class="flex gap-6">
    <FilterSidebar
      :categories="categories"
      :locations="locations"
      @filter-change="handleFilterChange"
    />

    <div class="flex-grow">
      <h1 class="text-3xl font-bold mb-6">Manufacturer Directory</h1>
      <ManufacturerList
        :manufacturers="filteredManufacturers"
        @select-manufacturer="handleSelectManufacturer"
      />
    </div>
  </div>
</template>
