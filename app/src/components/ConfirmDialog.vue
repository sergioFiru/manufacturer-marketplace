<script setup>
  const props = defineProps(['message', 'visible'])
  const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow">
      <p>{{ message }}</p>
      <div class="flex gap-4 mt-4 justify-end">
        <button class="px-3 py-1 border rounded" @click="$emit('cancel')">Cancel</button>
        <button class="px-3 py-1 bg-blue-500 text-white rounded" @click="$emit('confirm')">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>
