import { defineStore } from 'pinia'

export const useWsStore = defineStore('wsStore', {
  state: () => ({
    notifications: []
  }),
  actions: {
    addNotification(data) {
      this.notifications.unshift({ ...data, id: Date.now() })
    },
    clearNotifications() {
      this.notifications = []
    }
  }
})
