<script setup>
const props = defineProps(['menuItems'])
const emit = defineEmits(['navigate'])
</script>

<template>
  <aside class="bg-gray-200 p-4 w-48">
    <ul>
      <li 
        v-for="item in menuItems" 
        :key="item"
        class="p-2 hover:bg-gray-300 cursor-pointer rounded"
        @click="$emit('navigate', item)"
      >
        {{ item }}
      </li>
    </ul>
  </aside>
</template>

