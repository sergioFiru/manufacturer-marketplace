<script setup>
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useUiStore } from '@/stores/ui'
  import SearchBar from '../components/SearchBar.vue'
  import ManufacturerCard from '../components/ManufacturerCard.vue'

  const router = useRouter()
  const manufacturersStore = useManufacturersStore()
  const uiStore = useUiStore()

  onMounted(() => manufacturersStore.fetchManufacturers())

  const manufacturers = computed(() => manufacturersStore.manufacturers.slice(0, 3))

  function handleSearch(query) {
    uiStore.setSearchQuery(query)
    router.push('/directory')
  }

  function handleViewProfile(manufacturer) {
    router.push(`/manufacturer/${manufacturer.id}`)
  }
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Manufacturers Marketplace</h1>

    <SearchBar placeholder="Search manufacturers..." @search="handleSearch" />

    <div class="mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Featured Manufacturers</h2>
        <button
          class="text-blue-600 hover:text-blue-700 text-sm font-medium"
          @click="router.push('/directory')"
        >
          View all →
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManufacturerCard
          v-for="manufacturer in manufacturers"
          :key="manufacturer.id"
          :manufacturer="manufacturer"
          @view-profile="handleViewProfile"
        />
      </div>
    </div>
  </div>
</template>
