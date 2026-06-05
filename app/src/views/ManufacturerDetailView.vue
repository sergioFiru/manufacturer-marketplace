<script setup>
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useManufacturersStore } from '@/stores/manufacturers'
  import { useProductsStore } from '@/stores/products'
  import ManufacturerProfile from '../components/ManufacturerProfile.vue'
  import ContactForm from '../components/ContactForm.vue'
  import axios from 'axios'

  const route = useRoute()
  const router = useRouter()
  const manufacturersStore = useManufacturersStore()
  const productsStore = useProductsStore()

  const id = parseInt(route.params.id)

  onMounted(async () => {
    if (manufacturersStore.manufacturers.length === 0) {
      await manufacturersStore.fetchManufacturers()
    }
    if (productsStore.products.length === 0) {
      await productsStore.fetchProducts()
    }
  })

  const manufacturer = computed(() => {
    return (
      manufacturersStore.getManufacturerById(id) || {
        id,
        name: 'Unknown Manufacturer',
        description: 'Manufacturer not found',
        location: 'N/A',
        category: 'N/A'
      }
    )
  })

  const products = computed(() => productsStore.productsByManufacturer(id))

  async function handleFormSubmit(formData) {
    try {
      await axios.post('http://localhost:3000/contact/add', {
        senderName: formData.name,
        senderEmail: formData.email,
        message: formData.message,
        ManufacturerId: id,
      })
      alert(`Message sent to ${formData.recipientName}!`)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message.')
    }
  }

  function handleContactManufacturer(mfr) {
    console.log('Contacting:', mfr)
  }
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <button class="mb-4 text-blue-600 hover:underline" @click="router.back()">← Back</button>

    <ManufacturerProfile
      :manufacturer="manufacturer"
      @contact-manufacturer="handleContactManufacturer"
    />

    <div v-if="products.length > 0" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Products</h2>
      <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-50">
              <th class="p-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th class="p-3 text-left text-sm font-semibold text-gray-600">Price</th>
              <th class="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="border-t border-gray-100">
              <td class="p-3 text-sm text-gray-800">{{ product.name }}</td>
              <td class="p-3 text-sm text-gray-800">${{ product.price }}</td>
              <td class="p-3">
                <span
                  :class="product.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ product.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-8">
      <ContactForm :recipient-name="manufacturer.name" @form-submit="handleFormSubmit" />
    </div>
  </div>
</template>
