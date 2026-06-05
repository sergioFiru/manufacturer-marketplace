import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from '@/stores/users'

vi.mock('@/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

vi.mock('@/stores/auth.js', () => ({
  useAuth: () => ({ token: 'test-token' })
}))

describe('users store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('initial state is empty', () => {
    const store = useUsersStore()
    expect(store.users).toEqual([])
  })

  it('fetchUsers populates users', async () => {
    const axios = await import('@/api')
    axios.default.get.mockResolvedValue({
      data: [{ id: 1, name: 'Alice', role: 'user', status: 'active' }]
    })
    const store = useUsersStore()
    await store.fetchUsers()
    expect(store.users).toHaveLength(1)
    expect(store.users[0].name).toBe('Alice')
  })

  it('addUser pushes to users', async () => {
    const axios = await import('@/api')
    axios.default.post.mockResolvedValue({
      data: { id: 2, name: 'Bob', role: 'user', status: 'pending' }
    })
    const store = useUsersStore()
    await store.addUser({ name: 'Bob', email: 'bob@example.com', role: 'user' })
    expect(store.users).toHaveLength(1)
    expect(store.users[0].name).toBe('Bob')
  })

  it('updateUserStatus updates the user', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useUsersStore()
    store.users = [{ id: 1, name: 'Alice', status: 'pending' }]
    await store.updateUserStatus(1, 'active')
    expect(store.users[0].status).toBe('active')
  })

  it('updateUserStatus does nothing when id not found', async () => {
    const axios = await import('@/api')
    axios.default.put.mockResolvedValue({ data: { success: true } })
    const store = useUsersStore()
    store.users = [{ id: 1, status: 'pending' }]
    await store.updateUserStatus(99, 'active')
    expect(store.users[0].status).toBe('pending')
  })

  it('deleteUser removes item', async () => {
    const axios = await import('@/api')
    axios.default.delete.mockResolvedValue({ data: { success: true } })
    const store = useUsersStore()
    store.users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    await store.deleteUser(1)
    expect(store.users).toHaveLength(1)
    expect(store.users[0].id).toBe(2)
  })

  it('getUserById returns correct user', () => {
    const store = useUsersStore()
    store.users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
    expect(store.getUserById(2).name).toBe('Bob')
  })

  it('getUserById returns undefined when not found', () => {
    const store = useUsersStore()
    store.users = [{ id: 1, name: 'Alice' }]
    expect(store.getUserById(99)).toBeUndefined()
  })

  it('usersByRole filters by role', () => {
    const store = useUsersStore()
    store.users = [
      { id: 1, role: 'admin' },
      { id: 2, role: 'user' },
      { id: 3, role: 'user' }
    ]
    expect(store.usersByRole('user')).toHaveLength(2)
    expect(store.usersByRole('admin')).toHaveLength(1)
  })

  it('pendingUsersCount returns correct count', () => {
    const store = useUsersStore()
    store.users = [
      { id: 1, status: 'pending' },
      { id: 2, status: 'active' },
      { id: 3, status: 'pending' }
    ]
    expect(store.pendingUsersCount).toBe(2)
  })

  it('fetchUsers handles error gracefully', async () => {
    const axios = await import('@/api')
    axios.default.get.mockRejectedValue(new Error('Network error'))
    const store = useUsersStore()
    await expect(store.fetchUsers()).resolves.not.toThrow()
    expect(store.users).toEqual([])
  })
})
