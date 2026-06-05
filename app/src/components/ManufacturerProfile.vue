<script setup>
  const props = defineProps(['manufacturer'])
  const emit = defineEmits(['contact-manufacturer'])
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
    <div class="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
      <span class="text-white text-6xl font-bold opacity-50">
        {{ manufacturer.name.charAt(0) }}
      </span>
    </div>

    <div class="p-6">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">{{ manufacturer.name }}</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-if="manufacturer.category"
            class="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
          >
            <i class="bi bi-tag mr-1"></i>
            {{ manufacturer.category }}
          </span>
          <span
            v-if="manufacturer.location"
            class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            <i class="bi bi-geo-alt mr-1"></i>
            {{ manufacturer.location }}
          </span>
        </div>
      </div>

      <div class="mb-6">
        <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">About</h3>
        <p class="text-gray-700 leading-relaxed">{{ manufacturer.description }}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">50+</div>
          <div class="text-sm text-gray-500">Products</div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">10+</div>
          <div class="text-sm text-gray-500">Years Experience</div>
        </div>
      </div>

      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        @click="$emit('contact-manufacturer', manufacturer)"
      >
        <i class="bi bi-envelope"></i>
        Contact Manufacturer
      </button>
    </div>
  </div>
</template>
