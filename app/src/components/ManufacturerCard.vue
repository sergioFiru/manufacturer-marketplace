<script setup>
const props = defineProps(['manufacturer'])
const emit = defineEmits(['view-profile'])
</script>

<template>
    <div class="border rounded p-4 hover:shadow cursor-pointer" @click="$emit('view-profile', manufacturer)">
        <h2 class="text-xl font-bold">{{ manufacturer.name }}</h2>
        <p class="text-gray-600">{{ manufacturer.description }}</p>
    </div>
</template>