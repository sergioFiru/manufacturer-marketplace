import { useWsStore } from './stores/wsStore'

export const ws = new WebSocket('ws://localhost:7878')

ws.onopen = () => {
  console.log('Connected to server')
}

ws.onmessage = (event) => {
  const wsStore = useWsStore()
  try {
    const data = JSON.parse(event.data)
    wsStore.addNotification(data)
  } catch {
    wsStore.addNotification({ type: 'message', message: event.data })
  }
}
