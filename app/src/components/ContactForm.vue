<script setup>
const props = defineProps(['recipientName'])
const emit = defineEmits(['form-submit'])

let name = ''
let email = ''
let message = ''

function handleSubmit() {
  emit('form-submit', { name, email, message, recipientName: props.recipientName })
  name = ''
  email = ''
  message = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="border rounded p-4">
    <h3 class="font-bold mb-4">Contact {{ recipientName }}</h3>
    
    <div class="mb-4">
      <label class="block mb-1">Your Name</label>
      <input v-model="name" type="text" required class="border rounded px-3 py-1 w-full">
    </div>
    
    <div class="mb-4">
      <label class="block mb-1">Your Email</label>
      <input v-model="email" type="email" required class="border rounded px-3 py-1 w-full">
    </div>
    
    <div class="mb-4">
      <label class="block mb-1">Message</label>
      <textarea v-model="message" required class="border rounded px-3 py-1 w-full" rows="4"></textarea>
    </div>
    
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      Send Message
    </button>
  </form>
</template>

