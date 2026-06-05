import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuth } from '@/stores/auth'

vi.mock('@/api', () => ({
  default: {
    post: vi.fn()
  }
}))

vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('initial state when no localStorage', () => {
    const store = useAuth()
    expect(store.token).toBe('')
    expect(store.refreshToken).toBe('')
    expect(store.isAuthenticated).toBe(false)
  })

  it('setTokens updates state and localStorage', () => {
    const store = useAuth()
    store.setTokens('access-tok', 'refresh-tok', 'admin')
    expect(store.token).toBe('access-tok')
    expect(store.refreshToken).toBe('refresh-tok')
    expect(store.role).toBe('admin')
    expect(store.isAuthenticated).toBe(true)
    expect(localStorage.getItem('token')).toBe('access-tok')
    expect(localStorage.getItem('refreshToken')).toBe('refresh-tok')
    expect(localStorage.getItem('role')).toBe('admin')
  })

  it('clearTokens resets state and removes localStorage', () => {
    const store = useAuth()
    store.setTokens('tok', 'ref', 'user')
    store.clearTokens()
    expect(store.token).toBe('')
    expect(store.refreshToken).toBe('')
    expect(store.isAuthenticated).toBe(false)
    expect(store.role).toBe('')
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('refreshToken')).toBeNull()
    expect(localStorage.getItem('role')).toBeNull()
  })

  it('checkCredentials success sets tokens and redirects', async () => {
    const axios = await import('@/api')
    axios.default.post.mockResolvedValue({
      data: { success: true, token: 'tok', refreshToken: 'ref', role: 'admin' }
    })
    const router = await import('@/router')
    const store = useAuth()
    const result = await store.checkCredentials('admin', 'admin123')
    expect(store.isAuthenticated).toBe(true)
    expect(store.token).toBe('tok')
    expect(store.role).toBe('admin')
    expect(router.default.push).toHaveBeenCalledWith('/')
    expect(result).toBeUndefined()
  })

  it('checkCredentials failure returns error message', async () => {
    const axios = await import('@/api')
    axios.default.post.mockResolvedValue({
      data: { success: false, message: 'Invalid credentials' }
    })
    const store = useAuth()
    const result = await store.checkCredentials('admin', 'wrong')
    expect(store.isAuthenticated).toBe(false)
    expect(result).toBe('Invalid credentials')
  })

  it('checkCredentials network error returns fallback message', async () => {
    const axios = await import('@/api')
    axios.default.post.mockRejectedValue(new Error('Network Error'))
    const store = useAuth()
    const result = await store.checkCredentials('admin', 'pass')
    expect(store.isAuthenticated).toBe(false)
    expect(result).toBe('An error occurred. Please try again.')
  })

  it('refreshAccessToken returns false when no refreshToken', async () => {
    const store = useAuth()
    const result = await store.refreshAccessToken()
    expect(result).toBe(false)
  })

  it('refreshAccessToken success updates tokens', async () => {
    const axios = await import('@/api')
    axios.default.post.mockResolvedValue({
      data: { success: true, token: 'new-tok', refreshToken: 'new-ref', role: 'admin' }
    })
    const store = useAuth()
    store.setTokens('old-tok', 'old-ref', 'admin')
    const result = await store.refreshAccessToken()
    expect(result).toBe(true)
    expect(store.token).toBe('new-tok')
  })

  it('refreshAccessToken failure clears tokens and redirects', async () => {
    const axios = await import('@/api')
    axios.default.post.mockRejectedValue(new Error('fail'))
    const router = await import('@/router')
    const store = useAuth()
    store.setTokens('tok', 'ref', 'user')
    const result = await store.refreshAccessToken()
    expect(result).toBe(false)
    expect(store.isAuthenticated).toBe(false)
    expect(router.default.push).toHaveBeenCalledWith('/login')
  })

  it('logout clears tokens and redirects to login', async () => {
    const router = await import('@/router')
    const store = useAuth()
    store.setTokens('tok', 'ref', 'admin')
    store.logout()
    expect(store.isAuthenticated).toBe(false)
    expect(router.default.push).toHaveBeenCalledWith('/login')
  })
})
