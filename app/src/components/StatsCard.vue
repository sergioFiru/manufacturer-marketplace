<script setup>
const props = defineProps(['title', 'value'])
</script>

<template>
    <div class="border rounded p-4 text-center">
        <h4 class="text-lg font-bold">{{ title }}</h4>
        <p class="text-2xl text-blue-600">{{ value }}</p>
    </div>
</template>