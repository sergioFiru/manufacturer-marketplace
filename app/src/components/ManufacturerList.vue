<script setup>
  const props = defineProps(['manufacturers'])
  const emit = defineEmits(['select-manufacturer'])
</script>

<template>
  <div>
    <!-- Empty State -->
    <div v-if="manufacturers.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-5xl mb-4">
        <i class="bi bi-search"></i>
      </div>
      <h3 class="text-lg font-semibold text-gray-600">No manufacturers found</h3>
      <p class="text-gray-500 text-sm">Try adjusting your filters</p>
    </div>

    <!-- Manufacturer Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="manufacturer in manufacturers"
        :key="manufacturer.id"
        class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        @click="$emit('select-manufacturer', manufacturer)"
      >
        <!-- Placeholder Image -->
        <div
          class="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
        >
          <span class="text-white text-3xl font-bold opacity-50">
            {{ manufacturer.name.charAt(0) }}
          </span>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h3 class="font-bold text-gray-800 mb-1">{{ manufacturer.name }}</h3>
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
              class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center gap-1"
            >
              <i class="bi bi-geo-alt text-xs"></i>
              {{ manufacturer.location }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
