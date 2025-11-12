<script setup>
const props = defineProps(['manufacturers'])
const emit = defineEmits(['select-manufacturer'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div 
      v-for="manufacturer in manufacturers" 
      :key="manufacturer.id"
      class="border rounded p-4 hover:shadow cursor-pointer"
      @click="$emit('select-manufacturer', manufacturer)"
    >
      <h3 class="font-bold text-lg">{{ manufacturer.name }}</h3>
      <p class="text-gray-600 text-sm mt-2">{{ manufacturer.description }}</p>
    </div>
  </div>
</template>

