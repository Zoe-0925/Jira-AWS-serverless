


//When the client receives the web socket message
let socket = new WebSocket('wss://api.kanban.rag.lt/ws/')
socket.onmessage = (e) => {
  try {
    const data = JSON.parse(e.data)
    console.log('Socket Message Received', data)
    if (data.type === 'dt' && !isNaN(data.dt) && data.dt > this.maxDt) {
      this.runUpdateQueue()
    }
  } catch (error) {
    console.error('Failed to JSON.parse Socket Message', error, e)
  }
}