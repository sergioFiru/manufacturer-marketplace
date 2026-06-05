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
          <span v-if="col === 'Status'" :class="{
            'bg-green-100 text-green-700': item.status === 'active',
            'bg-yellow-100 text-yellow-700': item.status === 'pending',
            'bg-red-100 text-red-700': item.status === 'rejected',
          }" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ item.status }}
          </span>
          <span v-else>{{ item[col.toLowerCase()] }}</span>
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
