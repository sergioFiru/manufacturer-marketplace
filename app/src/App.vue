<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-grow p-6 bg-gray-50">
      <RouterView />
    </main>

    <Footer :year="2025" />
  </div>
</template>
