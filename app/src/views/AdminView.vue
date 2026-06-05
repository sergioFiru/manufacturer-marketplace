<script setup>
  import { ref, computed, watch, onMounted, reactive } from 'vue'
  import { useUsersStore } from '@/stores/users'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useProductsStore } from '@/stores/products'
  import { useCategoriesStore } from '@/stores/categories'
  import AdminSidebar from '../components/AdminSidebar.vue'
  import AdminTable from '../components/AdminTable.vue'
  import ConfirmDialog from '../components/ConfirmDialog.vue'

  const usersStore = useUsersStore()
  const manufacturersStore = useManufacturersStore()
  const productsStore = useProductsStore()
  const categoriesStore = useCategoriesStore()

  onMounted(() => {
    usersStore.fetchUsers()
    manufacturersStore.fetchManufacturers()
    productsStore.fetchProducts()
    categoriesStore.fetchCategories()
  })

  const sections = ['Users', 'Manufacturers', 'Products']
  const currentSection = ref('Users')
  const columns = ['Name', 'Status']

  const showDialog = ref(false)
  const dialogMessage = ref('')
  const pendingAction = ref(null)

  const showAddForm = ref(false)

  const newUser = reactive({ name: '', email: '', role: 'user' })
  const newManufacturer = reactive({ name: '', description: '', location: '', CategoryId: '', phone: '', website: '', foundedYear: '' })
  const newProduct = reactive({ name: '', price: '', ManufacturerId: '' })

  function resetForms() {
    Object.assign(newUser, { name: '', email: '', role: 'user' })
    Object.assign(newManufacturer, { name: '', description: '', location: '', CategoryId: '', phone: '', website: '', foundedYear: '' })
    Object.assign(newProduct, { name: '', price: '', ManufacturerId: '' })
    showAddForm.value = false
  }

  async function handleAddUser() {
    if (!newUser.name || !newUser.email) return
    await usersStore.addUser({ ...newUser })
    resetForms()
  }

  async function handleAddManufacturer() {
    if (!newManufacturer.name) return
    await manufacturersStore.addManufacturer({
      ...newManufacturer,
      CategoryId: newManufacturer.CategoryId || null,
      foundedYear: newManufacturer.foundedYear ? parseInt(newManufacturer.foundedYear) : null,
    })
    resetForms()
  }

  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price || !newProduct.ManufacturerId) return
    await productsStore.addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      ManufacturerId: parseInt(newProduct.ManufacturerId),
    })
    resetForms()
  }

  const items = computed(() => {
    switch (currentSection.value) {
      case 'Users':
        return usersStore.users.map((u) => ({ id: u.id, name: u.name, status: u.status }))
      case 'Manufacturers':
        return manufacturersStore.manufacturers.map((m) => ({ id: m.id, name: m.name, status: 'active' }))
      case 'Products':
        return productsStore.products.map((p) => ({ id: p.id, name: p.name, status: p.status }))
      default:
        return []
    }
  })

  watch(currentSection, () => { showAddForm.value = false })

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
        if (type === 'delete') productsStore.deleteProduct(id)
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
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Admin Panel</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          @click="showAddForm = !showAddForm"
        >
          {{ showAddForm ? 'Cancel' : `+ Add ${currentSection.slice(0, -1)}` }}
        </button>
      </div>

      <div v-if="showAddForm && currentSection === 'Users'" class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 class="font-semibold mb-4">New User</h2>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block text-sm mb-1">Name</label>
            <input v-model="newUser.name" type="text" class="border rounded px-3 py-2 w-full text-sm" placeholder="Full name" />
          </div>
          <div>
            <label class="block text-sm mb-1">Email</label>
            <input v-model="newUser.email" type="email" class="border rounded px-3 py-2 w-full text-sm" placeholder="email@example.com" />
          </div>
          <div>
            <label class="block text-sm mb-1">Role</label>
            <select v-model="newUser.role" class="border rounded px-3 py-2 w-full text-sm">
              <option value="user">User</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button
          class="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
          @click="handleAddUser"
        >
          Save User
        </button>
      </div>

      <div v-if="showAddForm && currentSection === 'Manufacturers'" class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 class="font-semibold mb-4">New Manufacturer</h2>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm mb-1">Name</label>
            <input v-model="newManufacturer.name" type="text" class="border rounded px-3 py-2 w-full text-sm" placeholder="Company name" />
          </div>
          <div>
            <label class="block text-sm mb-1">Category</label>
            <select v-model="newManufacturer.CategoryId" class="border rounded px-3 py-2 w-full text-sm">
              <option value="">— select —</option>
              <option v-for="cat in categoriesStore.categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm mb-1">Location</label>
            <select v-model="newManufacturer.location" class="border rounded px-3 py-2 w-full text-sm">
              <option value="">— select —</option>
              <option>North America</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>South America</option>
            </select>
          </div>
          <div>
            <label class="block text-sm mb-1">Founded Year</label>
            <input v-model="newManufacturer.foundedYear" type="number" class="border rounded px-3 py-2 w-full text-sm" placeholder="e.g. 2005" />
          </div>
          <div class="col-span-2">
            <label class="block text-sm mb-1">Description</label>
            <textarea v-model="newManufacturer.description" rows="2" class="border rounded px-3 py-2 w-full text-sm" placeholder="Short description"></textarea>
          </div>
          <div>
            <label class="block text-sm mb-1">Phone</label>
            <input v-model="newManufacturer.phone" type="text" class="border rounded px-3 py-2 w-full text-sm" placeholder="+1-555-000-0000" />
          </div>
          <div>
            <label class="block text-sm mb-1">Website</label>
            <input v-model="newManufacturer.website" type="text" class="border rounded px-3 py-2 w-full text-sm" placeholder="www.example.com" />
          </div>
        </div>
        <button
          class="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
          @click="handleAddManufacturer"
        >
          Save Manufacturer
        </button>
      </div>

      <div v-if="showAddForm && currentSection === 'Products'" class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <h2 class="font-semibold mb-4">New Product</h2>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="block text-sm mb-1">Name</label>
            <input v-model="newProduct.name" type="text" class="border rounded px-3 py-2 w-full text-sm" placeholder="Product name" />
          </div>
          <div>
            <label class="block text-sm mb-1">Price ($)</label>
            <input v-model="newProduct.price" type="number" step="0.01" class="border rounded px-3 py-2 w-full text-sm" placeholder="0.00" />
          </div>
          <div>
            <label class="block text-sm mb-1">Manufacturer</label>
            <select v-model="newProduct.ManufacturerId" class="border rounded px-3 py-2 w-full text-sm">
              <option value="">— select —</option>
              <option v-for="m in manufacturersStore.manufacturers" :key="m.id" :value="m.id">
                {{ m.name }}
              </option>
            </select>
          </div>
        </div>
        <button
          class="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors"
          @click="handleAddProduct"
        >
          Save Product
        </button>
      </div>

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
