<script setup>
const props = defineProps(['product'])
const emit = defineEmits(['view-product'])
</script>

<template>
  <div class="p-4 border rounded hover:bg-gray-50">
    <h3 class="font-semibold">{{ product.name }}</h3>
    <p class="text-sm text-gray-600">{{ product.description }}</p>
    <button
      @click="$emit('view-product', product)"
      class="text-blue-600 text-sm mt-2 underline"
    >
      View Details
    </button>
  </div>
</template>
