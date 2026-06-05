<script setup>
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth'

const auth = useAuth()

const links = [
  { name: 'Home', to: '/', icon: 'bi-house' },
  { name: 'Directory', to: '/directory', icon: 'bi-grid' },
  { name: 'Dashboard', to: '/dashboard', icon: 'bi-bar-chart' },
  { name: 'Contact', to: '/contact', icon: 'bi-envelope' },
]
</script>

<template>
  <nav class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold">M</span>
        </div>
        <span class="font-bold text-xl text-gray-800">Marketplace</span>
      </RouterLink>

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

        <RouterLink
          v-if="auth.role === 'admin'"
          to="/admin"
          class="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
          active-class="text-blue-600 font-medium"
        >
          <i class="bi bi-gear text-sm"></i>
          Admin
        </RouterLink>

        <button
          v-if="auth.isAuthenticated"
          class="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors text-sm"
          @click="auth.logout()"
        >
          <i class="bi bi-box-arrow-right text-sm"></i>
          Logout
        </button>

        <RouterLink
          v-else
          to="/login"
          class="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
        >
          <i class="bi bi-person text-sm"></i>
          Login
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
