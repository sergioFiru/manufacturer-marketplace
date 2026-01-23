<script setup>
  import { RouterLink } from 'vue-router'

  // Define navigation links with their routes
  const links = [
    { name: 'Home', to: '/', icon: 'bi-house' },
    { name: 'Directory', to: '/directory', icon: 'bi-grid' },
    { name: 'Contact', to: '/contact', icon: 'bi-envelope' },
    { name: 'Admin', to: '/admin', icon: 'bi-gear' }
  ]
</script>

<template>
  <nav class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold">M</span>
        </div>
        <span class="font-bold text-xl text-gray-800">Marketplace</span>
      </RouterLink>

      <!-- Navigation Links -->
      <div class="flex items-center gap-6">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >
          <i :class="['bi', link.icon, 'text-sm']"></i>
          {{ link.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
