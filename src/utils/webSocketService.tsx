// src/socket/webSocketService.ts

import { dashboardActions } from "../lib/slice/dashboard/dashboard.slice";
import { store } from "../lib/store/store";

let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let isManuallyClosed = false;
const RECONNECT_DELAY = 3000;

const connect = () => {
  socket = new WebSocket("ws://localhost:8080");

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    store.dispatch(dashboardActions.setSocketData(message));
  };

  socket.onclose = () => {
    console.log("⚠️ WebSocket closed");
    socket = null;
    if (!isManuallyClosed) {
      scheduleReconnect();
    }
  };

  socket.onerror = err => {
    console.error("❌ WebSocket error:", err);
    socket?.close(); // trigger onclose to handle reconnection
  };
};

const scheduleReconnect = () => {
  if (reconnectTimeout) {
    return;
  }

  reconnectTimeout = setTimeout(() => {
    console.log("🔄 Attempting to reconnect WebSocket...");
    reconnectTimeout = null;
    connect();
  }, RECONNECT_DELAY);
};

export const connectWebSocket = () => {
  if (socket) {
    return;
  }
  isManuallyClosed = false;
  connect();
};

export const disconnectWebSocket = () => {
  isManuallyClosed = true;
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
    reconnectTimeout = null;
  }
  socket?.close();
  socket = null;
};
