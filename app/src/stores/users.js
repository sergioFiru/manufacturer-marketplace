import { defineStore } from 'pinia'
import axios from '@/api'
import { useAuth } from '@/stores/auth.js'

const API = 'http://localhost:3000'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: []
  }),

  getters: {
    getUserById: (state) => {
      return (id) => state.users.find((u) => u.id === id)
    },

    usersByRole: (state) => {
      return (role) => state.users.filter((u) => u.role === role)
    },

    pendingUsersCount: (state) => {
      return state.users.filter((u) => u.status === 'pending').length
    }
  },

  actions: {
    authHeaders() {
      const auth = useAuth()
      if (!auth.token) return {}
      return { Authorization: `Bearer ${auth.token}` }
    },

    async fetchUsers() {
      try {
        const response = await axios.get(`${API}/user/get-all`, {
          headers: this.authHeaders()
        })
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },

    async addUser(user) {
      try {
        const response = await axios.post(`${API}/user/add`, user, {
          headers: this.authHeaders()
        })
        this.users.push(response.data)
      } catch (error) {
        console.error('Error adding user:', error)
      }
    },

    async updateUserStatus(id, status) {
      try {
        await axios.put(`${API}/user/update-status`, { id, status }, {
          headers: this.authHeaders()
        })
        const user = this.users.find((u) => u.id === id)
        if (user) user.status = status
      } catch (error) {
        console.error('Error updating user status:', error)
      }
    },

    async deleteUser(id) {
      try {
        await axios.delete(`${API}/user/delete`, {
          data: { id },
          headers: this.authHeaders()
        })
        const index = this.users.findIndex((u) => u.id === id)
        if (index !== -1) this.users.splice(index, 1)
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }
})
