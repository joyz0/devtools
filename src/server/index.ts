import WebSocket from 'ws'
import type { Server as HttpServer } from 'http'

interface SetupDevToolsOptions {
  server: HttpServer
  app: any
  options: any
}

export function setupDevTools({ server, app, options }: SetupDevToolsOptions) {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', (ws) => {
    ws.on('message', (message: WebSocket.Data) => {
      const data = JSON.parse(message.toString())
      switch (data.action) {
        case 'add-file':
          break
        case 'exec-cmd':
          break
        default:
          console.log('Unknown action')
      }
    })
    ws.on('close', () => {
      console.log('WebSocket connection closed')
    })
  })
}
