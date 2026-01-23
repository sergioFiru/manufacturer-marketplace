<script setup>
  const props = defineProps(['year'])
</script>

<template>
  <footer class="bg-gray-800 text-white px-6 py-6">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span class="text-white font-bold">M</span>
      </div>
      <span class="font-bold text-xl">Marketplace</span>
    </div>
    <p class="text-gray-400 text-sm mt-2">
      Connecting businesses with trusted manufacturers worldwide.
    </p>
  </footer>
</template>
