<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useProductsStore } from '@/stores/products'
  import ManufacturerProfile from '../components/ManufacturerProfile.vue'
  import ContactForm from '../components/ContactForm.vue'

  const route = useRoute()
  const router = useRouter()
  const manufacturersStore = useManufacturersStore()
  const productsStore = useProductsStore()

  // COMPUTED: Get manufacturer by ID from route params
  const manufacturer = computed(() => {
    const id = parseInt(route.params.id)
    return (
      manufacturersStore.getManufacturerById(id) || {
        id: id,
        name: 'Unknown Manufacturer',
        description: 'Manufacturer not found',
        location: 'N/A',
        category: 'N/A'
      }
    )
  })

  // COMPUTED: Get products for this manufacturer
  const products = computed(() => {
    const id = parseInt(route.params.id)
    return productsStore.productsByManufacturer(id)
  })

  function handleContactManufacturer(mfr) {
    console.log('Contacting:', mfr)
  }

  function handleFormSubmit(formData) {
    console.log('Form submitted:', formData)
    alert(`Message sent to ${formData.recipientName}!`)
  }
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button class="mb-4 text-blue-600 hover:underline" @click="router.back()">← Back</button>

    <ManufacturerProfile
      :manufacturer="manufacturer"
      @contact-manufacturer="handleContactManufacturer"
    />

    <div class="mt-8">
      <ContactForm :recipient-name="manufacturer.name" @form-submit="handleFormSubmit" />
    </div>
  </div>
</template>
