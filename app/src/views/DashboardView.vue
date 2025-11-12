<script setup>
import StatsCard from '../components/StatsCard.vue'
import ProductTable from '../components/ProductTable.vue'

const products = [
  { id: 1, name: 'Widget A', description: 'High-quality widget', price: 29.99 },
  { id: 2, name: 'Widget B', description: 'Premium widget', price: 49.99 },
  { id: 3, name: 'Widget C', description: 'Standard widget', price: 19.99 }
]

function handleEditProduct(product) {
  console.log('Editing product:', product)
}

function handleDeleteProduct(productId) {
  console.log('Deleting product:', productId)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatsCard title="Total Products" value="24" />
      <StatsCard title="Active Orders" value="12" />
      <StatsCard title="Revenue" value="$5,420" />
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-4">My Products</h2>
      <ProductTable 
        :products="products"
        @edit-product="handleEditProduct"
        @delete-product="handleDeleteProduct"
      />
    </div>
  </div>
</template>

