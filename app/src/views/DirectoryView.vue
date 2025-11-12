<script setup>
import { useRouter } from 'vue-router'
import FilterSidebar from '../components/FilterSidebar.vue'
import ManufacturerList from '../components/ManufacturerList.vue'

const router = useRouter()

const categories = ['Electronics', 'Automotive', 'Textiles', 'Food & Beverage']
const locations = ['North America', 'Europe', 'Asia', 'South America']

const manufacturers = [
  { id: 1, name: 'TechCorp Industries', description: 'Leading manufacturer of electronic components', category: 'Electronics', location: 'North America' },
  { id: 2, name: 'Global Manufacturing Co', description: 'Worldwide supplier of industrial equipment', category: 'Automotive', location: 'Europe' },
  { id: 3, name: 'Precision Parts Ltd', description: 'Specialized in high-precision mechanical parts', category: 'Automotive', location: 'Asia' },
  { id: 4, name: 'Textile Masters', description: 'Premium fabric and textile manufacturer', category: 'Textiles', location: 'Asia' },
  { id: 5, name: 'FoodPro Inc', description: 'Organic food processing and packaging', category: 'Food & Beverage', location: 'North America' }
]

function handleFilterChange(filter) {
  console.log('Filter changed:', filter)
}

function handleSelectManufacturer(manufacturer) {
  router.push(`/manufacturer/${manufacturer.id}`)
}
</script>

<template>
  <div class="flex gap-6">
    <FilterSidebar 
      :categories="categories"
      :locations="locations"
      @filter-change="handleFilterChange"
    />
    
    <div class="flex-grow">
      <h1 class="text-3xl font-bold mb-6">Manufacturer Directory</h1>
      <ManufacturerList 
        :manufacturers="manufacturers"
        @select-manufacturer="handleSelectManufacturer"
      />
    </div>
  </div>
</template>

