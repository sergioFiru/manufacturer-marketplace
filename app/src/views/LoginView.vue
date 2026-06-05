<script setup>
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
const username = ref('')
const password = ref('')
const message = ref('')

const authentification = async () => {
  const isAuth = await auth.checkCredentials(username.value, password.value)
  message.value = isAuth || ''
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 -m-6">
    <div class="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-sm shadow-sm">
      <div class="flex items-center gap-2 mb-6">
        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold">M</span>
        </div>
        <span class="font-bold text-xl text-gray-800">Marketplace</span>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Sign in</h1>
      <form @submit.prevent="authentification">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            required
            class="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin"
          />
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="border rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p v-if="message" class="text-red-600 text-sm mb-4">{{ message }}</p>
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>
