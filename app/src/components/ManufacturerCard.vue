<script setup>
  const props = defineProps(['manufacturer'])
  const emit = defineEmits(['view-profile'])
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    @click="$emit('view-profile', manufacturer)"
  >
    <!-- Placeholder Image -->
    <div class="h-40 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
      <span class="text-white text-4xl font-bold opacity-50">
        {{ manufacturer.name.charAt(0) }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h2 class="text-lg font-bold text-gray-800 mb-2">{{ manufacturer.name }}</h2>
      <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ manufacturer.description }}</p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-if="manufacturer.category"
          class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
        >
          {{ manufacturer.category }}
        </span>
        <span
          v-if="manufacturer.location"
          class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
        >
          {{ manufacturer.location }}
        </span>
      </div>
    </div>
  </div>
</template>
