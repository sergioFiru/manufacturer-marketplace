import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  // STATE
  state: () => ({
    users: [
      { id: 1, name: 'John Smith', email: 'john@example.com', role: 'admin', status: 'active' },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'manufacturer',
        status: 'active'
      },
      {
        id: 3,
        name: 'Bob Wilson',
        email: 'bob@example.com',
        role: 'manufacturer',
        status: 'pending'
      },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'active' },
      {
        id: 5,
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        role: 'manufacturer',
        status: 'rejected'
      }
    ]
  }),

  // GETTERS (3)
  getters: {
    // Getter 1: Get user by ID
    getUserById: (state) => {
      return (id) => state.users.find((u) => u.id === id)
    },

    // Getter 2: Get users by role
    usersByRole: (state) => {
      return (role) => state.users.filter((u) => u.role === role)
    },

    // Getter 3: Count pending users
    pendingUsersCount: (state) => {
      return state.users.filter((u) => u.status === 'pending').length
    }
  },

  // ACTIONS (3)
  actions: {
    // Action 1: Add user
    addUser(user) {
      const newId = Math.max(...this.users.map((u) => u.id)) + 1
      this.users.push({ ...user, id: newId, status: 'pending' })
    },

    // Action 2: Update user status (approve/reject)
    updateUserStatus(id, status) {
      const user = this.users.find((u) => u.id === id)
      if (user) {
        user.status = status
      }
    },

    // Action 3: Delete user
    deleteUser(id) {
      const index = this.users.findIndex((u) => u.id === id)
      if (index !== -1) {
        this.users.splice(index, 1)
      }
    }
  }
})
