<script setup>
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminTable from '../components/AdminTable.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { ref } from 'vue'

const sections = ['Users', 'Manufacturers', 'Products', 'Orders']
const columns = ['Name', 'Status', 'Date']
const items = [
  { id: 1, name: 'John Doe', status: 'Pending', date: '2025-01-15' },
  { id: 2, name: 'Jane Smith', status: 'Approved', date: '2025-01-14' },
  { id: 3, name: 'Bob Johnson', status: 'Pending', date: '2025-01-13' }
]

const showDialog = ref(false)
const dialogMessage = ref('')

function handleSectionChange(section) {
  console.log('Section changed:', section)
}

function handleApprove(id) {
  dialogMessage.value = `Approve item ${id}?`
  showDialog.value = true
}

function handleReject(id) {
  dialogMessage.value = `Reject item ${id}?`
  showDialog.value = true
}

function handleDeleteItem(id) {
  dialogMessage.value = `Delete item ${id}?`
  showDialog.value = true
}

function handleConfirm() {
  console.log('Confirmed')
  showDialog.value = false
}

function handleCancel() {
  showDialog.value = false
}
</script>

<template>
  <div class="flex gap-6">
    <AdminSidebar 
      :sections="sections"
      @section-change="handleSectionChange"
    />
    
    <div class="flex-grow">
      <h1 class="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <AdminTable 
        :items="items"
        :columns="columns"
        @approve="handleApprove"
        @reject="handleReject"
        @delete-item="handleDeleteItem"
      />
    </div>
    
    <ConfirmDialog 
      :message="dialogMessage"
      :visible="showDialog"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

