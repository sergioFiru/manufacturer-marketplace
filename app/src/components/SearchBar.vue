<script setup>
  import { ref } from 'vue'

  const props = defineProps(['placeholder'])
  const emit = defineEmits(['search'])
  const query = ref('')
</script>

<template>
  <div class="flex gap-2">
    <input
      v-model="query"
      :placeholder="placeholder"
      class="border rounded px-3 py-2 flex-grow"
      @keyup.enter="$emit('search', query)"
    />
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
      @click="$emit('search', query)"
    >
      Search
    </button>
  </div>
</template>
