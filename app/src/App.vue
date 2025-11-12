<!-- src/App.vue -->
<script setup>
import { RouterView, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// useRouter gives access to router.push() for navigation
const router = useRouter()

function handleNavigation(page) {
  // convert names to lowercase for simple routing
  const path = page.toLowerCase()
  router.push(`/${path === 'home' ? '' : path}`)
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar emits 'navigate' -->
    <Navbar @navigate="handleNavigation" />

    <!-- Page content -->
    <main class="flex-grow p-6 bg-gray-50">
      <RouterView />
    </main>

    <!-- Footer at bottom -->
    <Footer :year="2025" />
  </div>
</template>
