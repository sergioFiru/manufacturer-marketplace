<script setup>
  import { computed, onMounted } from 'vue'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useProductsStore } from '@/stores/products'
  import { useUsersStore } from '@/stores/users'
  import StatsCard from '../components/StatsCard.vue'
  import ProductTable from '../components/ProductTable.vue'

  const manufacturersStore = useManufacturersStore()
  const productsStore = useProductsStore()
  const usersStore = useUsersStore()

  onMounted(() => {
    manufacturersStore.fetchManufacturers()
    productsStore.fetchProducts()
    usersStore.fetchUsers()
  })

  const totalManufacturers = computed(() => manufacturersStore.manufacturers.length)
  const activeProducts = computed(() => productsStore.activeProducts.length)
  const totalUsers = computed(() => usersStore.users.length)

  function handleEditProduct(product) {
    console.log('Editing product:', product)
  }

  function handleDeleteProduct(id) {
    productsStore.deleteProduct(id)
  }
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard title="Total Manufacturers" :value="totalManufacturers" />
      <StatsCard title="Active Products" :value="activeProducts" />
      <StatsCard title="Total Users" :value="totalUsers" />
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4">All Products</h2>
      <ProductTable
        :products="productsStore.products"
        @edit-product="handleEditProduct"
        @delete-product="handleDeleteProduct"
      />
    </div>
  </div>
</template>
