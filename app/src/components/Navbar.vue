<script setup>
const emit = defineEmits(['navigate'])
const links = ['Home', 'Directory', 'Contact']
</script>

<template>
        <nav class="flex gap-4 bg-gray-100 p-4">
            <button v-for="link in links":key="link" @click="$emit('navigate', link)"
            class=""hover:text-blue-600>
        {{ link }}
        </button>
        </nav>
</template>