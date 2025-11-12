<script setup>
const props = defineProps(['initialProduct'])
const emit = defineEmits(['save-product'])

let product = props.initialProduct ? { ...props.initialProduct } : { name: '', description: '', price: '' }

function handleSave() {
  emit('save-product', product)
  product = { name: '', description: '', price: '' }
}
</script>

<template>
  <form @submit.prevent="handleSave" class="border rounded p-4">
    <h3 class="font-bold mb-4">Product Form</h3>
    
    <div class="mb-4">
      <label class="block mb-1">Product Name</label>
      <input v-model="product.name" type="text" required class="border rounded px-3 py-1 w-full">
    </div>
    
    <div class="mb-4">
      <label class="block mb-1">Description</label>
      <textarea v-model="product.description" required class="border rounded px-3 py-1 w-full" rows="3"></textarea>
    </div>
    
    <div class="mb-4">
      <label class="block mb-1">Price</label>
      <input v-model="product.price" type="number" required class="border rounded px-3 py-1 w-full">
    </div>
    
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      Save Product
    </button>
  </form>
</template>

