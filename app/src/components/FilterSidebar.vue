<script setup>
  import { ref, watch } from 'vue'

  const props = defineProps(['categories', 'locations'])
  const emit = defineEmits(['filter-change'])

  const selectedCategories = ref([])
  const selectedLocations = ref([])

  watch(
    [selectedCategories, selectedLocations],
    () => {
      emit('filter-change', {
        categories: selectedCategories.value,
        locations: selectedLocations.value
      })
    },
    { deep: true }
  )

  function clearFilters() {
    selectedCategories.value = []
    selectedLocations.value = []
  }
</script>

<template>
  <aside class="bg-gray-100 p-4 w-64">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold">Filters</h3>
      <button
        v-if="selectedCategories.length || selectedLocations.length"
        class="text-sm text-blue-600 hover:underline"
        @click="clearFilters"
      >
        Clear
      </button>
    </div>

    <div class="mb-4">
      <h4 class="font-semibold mb-2">Categories</h4>
      <div v-for="cat in categories" :key="cat" class="mb-2">
        <label class="flex items-center cursor-pointer">
          <input v-model="selectedCategories" type="checkbox" :value="cat" class="mr-2" />
          <span>{{ cat }}</span>
        </label>
      </div>
    </div>

    <div>
      <h4 class="font-semibold mb-2">Locations</h4>
      <div v-for="loc in locations" :key="loc" class="mb-2">
        <label class="flex items-center cursor-pointer">
          <input v-model="selectedLocations" type="checkbox" :value="loc" class="mr-2" />
          <span>{{ loc }}</span>
        </label>
      </div>
    </div>
  </aside>
</template>
