<script setup>
  const props = defineProps(['items', 'columns'])
  const emit = defineEmits(['approve', 'reject', 'delete-item'])
</script>

<template>
  <table class="w-full border-collapse border">
    <thead>
      <tr class="bg-gray-100">
        <th v-for="col in columns" :key="col" class="border p-2 text-left">
          {{ col }}
        </th>
        <th class="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
        <td v-for="col in columns" :key="col" class="border p-2">
          {{ item[col.toLowerCase()] }}
        </td>
        <td class="border p-2 text-center">
          <button class="text-green-600 mr-2" @click="$emit('approve', item.id)">Approve</button>
          <button class="text-yellow-600 mr-2" @click="$emit('reject', item.id)">Reject</button>
          <button class="text-red-600" @click="$emit('delete-item', item.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
