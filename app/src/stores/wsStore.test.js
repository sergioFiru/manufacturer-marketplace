import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useWsStore } from '@/stores/wsStore'

describe('wsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initial state has empty notifications', () => {
    const store = useWsStore()
    expect(store.notifications).toEqual([])
  })

  it('addNotification prepends to notifications', () => {
    const store = useWsStore()
    store.addNotification({ type: 'manufacturer:added', name: 'Acme' })
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0].type).toBe('manufacturer:added')
    expect(store.notifications[0].name).toBe('Acme')
  })

  it('addNotification prepends so newest is first', () => {
    const store = useWsStore()
    store.addNotification({ type: 'manufacturer:added', name: 'First' })
    store.addNotification({ type: 'product:added', name: 'Second' })
    expect(store.notifications[0].name).toBe('Second')
    expect(store.notifications[1].name).toBe('First')
  })

  it('addNotification includes an id', () => {
    const store = useWsStore()
    store.addNotification({ type: 'test' })
    expect(store.notifications[0].id).toBeDefined()
  })

  it('clearNotifications empties the array', () => {
    const store = useWsStore()
    store.addNotification({ type: 'test' })
    store.clearNotifications()
    expect(store.notifications).toEqual([])
  })
})
