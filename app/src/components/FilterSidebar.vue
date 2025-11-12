<script setup>
const props = defineProps(['categories', 'locations'])
const emit = defineEmits(['filter-change'])
</script>

<template>
  <aside class="bg-gray-100 p-4 w-64">
    <h3 class="font-bold mb-4">Filters</h3>
    
    <div class="mb-4">
      <h4 class="font-semibold mb-2">Categories</h4>
      <div v-for="cat in categories" :key="cat" class="mb-2">
        <label class="flex items-center">
          <input type="checkbox" @change="$emit('filter-change', { type: 'category', value: cat })" class="mr-2">
          <span>{{ cat }}</span>
        </label>
      </div>
    </div>
    
    <div>
      <h4 class="font-semibold mb-2">Locations</h4>
      <div v-for="loc in locations" :key="loc" class="mb-2">
        <label class="flex items-center">
          <input type="checkbox" @change="$emit('filter-change', { type: 'location', value: loc })" class="mr-2">
          <span>{{ loc }}</span>
        </label>
      </div>
    </div>
  </aside>
</template>

