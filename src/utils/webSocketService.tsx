import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// import { useUsers } from "../context/UsersPaginatedContext";
import { dashboardActions } from "../lib/slice/dashboard/dashboard.slice";

const RECONNECT_DELAY = 3000;

export const useWebSocket = (url: string, handleStoreCoin: any) => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const isManuallyClosed = useRef(false);

  const connect = () => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    socketRef.current.onmessage = event => {
      const message = JSON.parse(event.data);
      handleStoreCoin(message);
    };

    socketRef.current.onclose = () => {
      console.log("⚠️ WebSocket closed");
      setIsConnected(false);
      socketRef.current = null;
      if (!isManuallyClosed.current) {
        scheduleReconnect();
      }
    };

    socketRef.current.onerror = err => {
      console.error("❌ WebSocket error:", err);
      socketRef.current?.close();
    };
  };

  const scheduleReconnect = () => {
    if (reconnectTimeout.current) {
      return;
    }

    reconnectTimeout.current = setTimeout(() => {
      console.log("🔄 Reconnecting WebSocket...");
      reconnectTimeout.current = null;
      connect();
    }, RECONNECT_DELAY);
  };

  const disconnect = () => {
    isManuallyClosed.current = true;
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }
    socketRef.current?.close();
    socketRef.current = null;
  };

  useEffect(() => {
    isManuallyClosed.current = false;
    connect();

    return () => {
      disconnect();
    };
  }, [url]);

  return {
    isConnected,
    disconnect
  };
};
