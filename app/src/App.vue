<!-- src/App.vue -->
<script setup>
import { RouterView, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const router = useRouter()

function handleNavigation(page) {
  const path = page.toLowerCase()
  router.push(`/${path === 'home' ? '' : path}`)
}
</script>

<template>
  <div class="flex flex-col min-h-screen">

    <Navbar @navigate="handleNavigation" />


    <main class="flex-grow p-6 bg-gray-50">
      <RouterView />
    </main>


    <Footer :year="2025" />
  </div>
</template>
