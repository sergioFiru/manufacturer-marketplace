<script setup>
const props = defineProps(['placeholder'])
const emit = defineEmits(['search'])
let query = ''
</script>

<template>
    <div class="flex gap-2 p-4">
        <input v-model="query" :placeholder="placeholder" class="border rounded px-3 py-1 flex-grow" @keyup.enter="$emit('search', query)"/>
        <button @click="$emit('search', query)" class="bg-blue-500 text-white px-3 py-1 rounded">
            Search
        </button>
    </div>
</template>