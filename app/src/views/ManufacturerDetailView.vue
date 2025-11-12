<script setup>
import { useRoute, useRouter } from 'vue-router'
import ManufacturerProfile from '../components/ManufacturerProfile.vue'
import ContactForm from '../components/ContactForm.vue'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()

// In a real app, you'd fetch this by ID from an API
// For now, we'll use dummy data
const manufacturers = {
  1: { 
    id: 1, 
    name: 'TechCorp Industries', 
    description: 'Leading manufacturer of electronic components with over 20 years of experience in the industry.',
    location: 'North America',
    category: 'Electronics'
  },
  2: { 
    id: 2, 
    name: 'Global Manufacturing Co', 
    description: 'Worldwide supplier of industrial equipment serving clients across 50+ countries.',
    location: 'Europe',
    category: 'Automotive'
  },
  3: { 
    id: 3, 
    name: 'Precision Parts Ltd', 
    description: 'Specialized in high-precision mechanical parts with ISO 9001 certification.',
    location: 'Asia',
    category: 'Automotive'
  }
}

const manufacturerId = parseInt(route.params.id)
const manufacturer = manufacturers[manufacturerId] || {
  id: manufacturerId,
  name: 'Unknown Manufacturer',
  description: 'Manufacturer not found',
  location: 'N/A',
  category: 'N/A'
}

function handleContactManufacturer(manufacturer) {
  console.log('Contacting:', manufacturer)
}

function handleFormSubmit(formData) {
  console.log('Form submitted:', formData)
  alert(`Message sent to ${formData.recipientName}!`)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button 
      @click="router.back()"
      class="mb-4 text-blue-600 hover:underline"
    >
      ← Back
    </button>
    
    <ManufacturerProfile 
      :manufacturer="manufacturer"
      @contact-manufacturer="handleContactManufacturer"
    />
    
    <div class="mt-8">
      <ContactForm 
        :recipient-name="manufacturer.name"
        @form-submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

