<script setup>
const props = defineProps(['manufacturer'])
const emit = defineEmits(['contact-manufacturer'])
</script>

<template>
  <div class="border rounded p-6">
    <h2 class="text-2xl font-bold mb-4">{{ manufacturer.name }}</h2>
    <p class="text-gray-700 mb-4">{{ manufacturer.description }}</p>
    <div class="mb-4">
      <p class="text-sm text-gray-600">Location: {{ manufacturer.location }}</p>
      <p class="text-sm text-gray-600">Category: {{ manufacturer.category }}</p>
    </div>
    <button 
      @click="$emit('contact-manufacturer', manufacturer)"
      class="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Contact Manufacturer
    </button>
  </div>
</template>

