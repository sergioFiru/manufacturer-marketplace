<script setup>
const props = defineProps(['stats'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div 
      v-for="(value, key) in stats" 
      :key="key"
      class="border rounded p-4 text-center"
    >
      <h4 class="text-lg font-bold text-gray-700">{{ key }}</h4>
      <p class="text-2xl text-blue-600 mt-2">{{ value }}</p>
    </div>
  </div>
</template>

