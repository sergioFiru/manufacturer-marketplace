<script setup>
import { useRouter } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import ManufacturerCard from '../components/ManufacturerCard.vue'

const router = useRouter()

const manufacturers = [
  { id: 1, name: 'TechCorp Industries', description: 'Leading manufacturer of electronic components' },
  { id: 2, name: 'Global Manufacturing Co', description: 'Worldwide supplier of industrial equipment' },
  { id: 3, name: 'Precision Parts Ltd', description: 'Specialized in high-precision mechanical parts' }
]

function handleSearch(query) {
  console.log('Searching for:', query)
}

function handleViewProfile(manufacturer) {
  router.push(`/manufacturer/${manufacturer.id}`)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Manufacturers Marketplace</h1>
    
    <SearchBar placeholder="Search manufacturers..." @search="handleSearch" />
    
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-4">Featured Manufacturers</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ManufacturerCard 
          v-for="manufacturer in manufacturers"
          :key="manufacturer.id"
          :manufacturer="manufacturer"
          @view-profile="handleViewProfile"
        />
      </div>
    </div>
  </div>
</template>

