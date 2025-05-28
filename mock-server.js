// mock-server.js
import { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const interval = setInterval(() => {
    // const data = {
    //   id: Math.floor(Math.random() * 5),
    //   timestamp: new Date().toISOString(),
    //   value: Math.floor(Math.random() * 100),
    // };
    const data = [
      { id: "BTC", timestamp: new Date().toISOString(), value: Math.floor(Math.random() * 100) },
      { id: "ETH", timestamp: new Date().toISOString(), value: Math.floor(Math.random() * 100) },
      { id: "SOL", timestamp: new Date().toISOString(), value: Math.floor(Math.random() * 100) }
    ]
    ws.send(JSON.stringify(data));
  }, 2000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

wss.on('listening', () => {
  console.log(`Mock WebSocket server running on ws://localhost:${PORT}`);
});

wss.on('error', (err) => {
  console.error('WebSocket Server Error:', err);
});
