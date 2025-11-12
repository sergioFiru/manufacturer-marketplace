<script setup>
const  props = defineProps(['sections'])
const emit = defineEmits(['section-change'])
</script>

<template>
    <aside class="bg-gray-200 p-4 w-48">
        <ul>
            <li v-for="section in sections" :key="section" class="p-2 hover:bg-gray-300 cursor-pointer" @click="$emit('section-change', section)">
                {{ section }}
            </li>
        </ul>
    </aside>
</template>