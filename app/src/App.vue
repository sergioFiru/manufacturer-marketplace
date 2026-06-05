<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import NotificationBanner from './components/NotificationBanner.vue'
import './ws'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <NotificationBanner />

    <main class="flex-grow p-6 bg-gray-50">
      <RouterView />
    </main>

    <Footer :year="2025" />
  </div>
</template>
