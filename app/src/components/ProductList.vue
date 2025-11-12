<script setup>
const props = defineProps(['products'])
const emit = defineEmits(['select-product'])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div 
      v-for="product in products" 
      :key="product.id"
      class="border rounded p-4 hover:bg-gray-50 cursor-pointer"
      @click="$emit('select-product', product)"
    >
      <h3 class="font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-600 mt-2">{{ product.description }}</p>
      <p class="text-blue-600 font-bold mt-2">${{ product.price }}</p>
    </div>
  </div>
</template>

