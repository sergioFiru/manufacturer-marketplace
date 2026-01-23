<script setup>
  const props = defineProps(['products'])
  const emit = defineEmits(['edit-product', 'delete-product'])
</script>

<template>
  <table class="w-full border-collapse border">
    <thead>
      <tr class="bg-gray-100">
        <th class="border p-2 text-left">Name</th>
        <th class="border p-2 text-left">Description</th>
        <th class="border p-2 text-left">Price</th>
        <th class="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50">
        <td class="border p-2">{{ product.name }}</td>
        <td class="border p-2">{{ product.description }}</td>
        <td class="border p-2">${{ product.price }}</td>
        <td class="border p-2 text-center">
          <button class="text-blue-600 mr-2" @click="$emit('edit-product', product)">Edit</button>
          <button class="text-red-600" @click="$emit('delete-product', product.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
