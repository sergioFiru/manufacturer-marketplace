import router from "@/router"
import { defineStore } from "pinia"
import axios from "@/api"

const API_URL = "http://localhost:3000/auth"

export const useAuth = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
    role: localStorage.getItem("role") || "",
    isAuthenticated: Boolean(localStorage.getItem("token")),
  }),
  actions: {
    setTokens(token, refreshToken, role) {
      this.token = token
      this.refreshToken = refreshToken
      this.role = role
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      localStorage.setItem("role", role)
      this.isAuthenticated = true
    },
    clearTokens() {
      this.token = ""
      this.refreshToken = ""
      this.role = ""
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("role")
      this.isAuthenticated = false
    },
    async checkCredentials(username, password) {
      try {
        const response = await axios.post(`${API_URL}/login`, { username, password })
        if (response.data.success && response.data.token && response.data.refreshToken) {
          this.setTokens(response.data.token, response.data.refreshToken, response.data.role)
          router.push("/")
        } else {
          this.clearTokens()
          return response.data.message
        }
      } catch {
        this.clearTokens()
        return "An error occurred. Please try again."
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) {
        return false
      }
      try {
        const response = await axios.post(`${API_URL}/refresh`, {
          refreshToken: this.refreshToken,
        })
        if (response.data.success && response.data.token && response.data.refreshToken) {
          this.setTokens(response.data.token, response.data.refreshToken, response.data.role || this.role)
          return true
        }
      } catch {
        this.clearTokens()
        router.push("/login")
      }
      return false
    },
    logout() {
      this.clearTokens()
      router.push("/login")
    },
  },
})
