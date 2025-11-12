<script setup>
const props = defineProps(['totalPages', 'currentPage'])
const emit = defineEmits(['page-change'])
</script>

<template>
  <div class="flex gap-2 justify-center p-4">
    <button 
      v-for="page in totalPages" 
      :key="page"
      @click="$emit('page-change', page)"
      :class="['px-3 py-1 rounded', page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200']"
    >
      {{ page }}
    </button>
  </div>
</template>

