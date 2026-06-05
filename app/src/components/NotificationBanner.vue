<script setup>
import { computed } from 'vue'
import { useWsStore } from '@/stores/wsStore'

const wsStore = useWsStore()
const latest = computed(() => wsStore.notifications[0])

function dismiss() {
  wsStore.clearNotifications()
}
</script>

<template>
  <transition name="slide">
    <div
      v-if="latest"
      class="bg-blue-600 text-white px-6 py-3 flex items-center justify-between text-sm"
    >
      <span>
        <template v-if="latest.type === 'manufacturer:added'">
          New manufacturer added: <strong>{{ latest.name }}</strong>
        </template>
        <template v-else-if="latest.type === 'manufacturer:deleted'">
          Manufacturer removed (ID: {{ latest.id }})
        </template>
        <template v-else-if="latest.type === 'product:added'">
          New product listed: <strong>{{ latest.name }}</strong>
        </template>
        <template v-else-if="latest.type === 'product:deleted'">
          Product removed (ID: {{ latest.id }})
        </template>
        <template v-else>{{ latest.message }}</template>
      </span>
      <button class="ml-4 text-white hover:text-blue-200" @click="dismiss">✕</button>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
