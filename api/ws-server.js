import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 7878 })
const clients = []

wss.on("connection", (ws) => {
  console.log("Client connected")
  clients.push(ws)

  ws.on("message", (data) => {
    console.log("Message from client: ", data.toString())
    clients.forEach((client) => {
      client.send(data.toString())
    })
  })

  ws.on("close", () => {
    console.log("Client disconnected")
    const index = clients.indexOf(ws)
    if (index !== -1) clients.splice(index, 1)
  })
})

export function broadcast(data) {
  const message = typeof data === "string" ? data : JSON.stringify(data)
  clients.forEach((client) => {
    client.send(message)
  })
}
