<script setup>
  import { ref, computed, watch } from 'vue'
  import { useUsersStore } from '@/stores/users'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useProductsStore } from '@/stores/products'
  import AdminSidebar from '../components/AdminSidebar.vue'
  import AdminTable from '../components/AdminTable.vue'
  import ConfirmDialog from '../components/ConfirmDialog.vue'

  const usersStore = useUsersStore()
  const manufacturersStore = useManufacturersStore()
  const productsStore = useProductsStore()

  const sections = ['Users', 'Manufacturers', 'Products']
  const currentSection = ref('Users')
  const columns = ['Name', 'Status']

  const showDialog = ref(false)
  const dialogMessage = ref('')
  const pendingAction = ref(null) // Store action to execute on confirm

  // COMPUTED: Get items based on current section
  const items = computed(() => {
    switch (currentSection.value) {
      case 'Users':
        return usersStore.users.map((u) => ({ id: u.id, name: u.name, status: u.status }))
      case 'Manufacturers':
        return manufacturersStore.manufacturers.map((m) => ({
          id: m.id,
          name: m.name,
          status: 'active'
        }))
      case 'Products':
        return productsStore.products.map((p) => ({ id: p.id, name: p.name, status: p.status }))
      default:
        return []
    }
  })

  // WATCH: Log when section changes (demonstrates watch)
  watch(currentSection, (newSection, oldSection) => {
    console.log(`Section changed from ${oldSection} to ${newSection}`)
  })

  function handleSectionChange(section) {
    currentSection.value = section
  }

  function handleApprove(id) {
    dialogMessage.value = `Approve item ${id}?`
    pendingAction.value = { type: 'approve', id }
    showDialog.value = true
  }

  function handleReject(id) {
    dialogMessage.value = `Reject item ${id}?`
    pendingAction.value = { type: 'reject', id }
    showDialog.value = true
  }

  function handleDeleteItem(id) {
    dialogMessage.value = `Delete item ${id}?`
    pendingAction.value = { type: 'delete', id }
    showDialog.value = true
  }

  function handleConfirm() {
    if (pendingAction.value) {
      const { type, id } = pendingAction.value

      if (currentSection.value === 'Users') {
        if (type === 'approve') usersStore.updateUserStatus(id, 'active')
        if (type === 'reject') usersStore.updateUserStatus(id, 'rejected')
        if (type === 'delete') usersStore.deleteUser(id)
      } else if (currentSection.value === 'Manufacturers') {
        if (type === 'delete') manufacturersStore.deleteManufacturer(id)
      } else if (currentSection.value === 'Products') {
        if (type === 'approve') productsStore.updateProductStatus(id, 'active')
        if (type === 'reject') productsStore.updateProductStatus(id, 'rejected')
      }
    }
    showDialog.value = false
    pendingAction.value = null
  }

  function handleCancel() {
    showDialog.value = false
    pendingAction.value = null
  }
</script>

<template>
  <div class="flex gap-6">
    <AdminSidebar :sections="sections" @section-change="handleSectionChange" />

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
