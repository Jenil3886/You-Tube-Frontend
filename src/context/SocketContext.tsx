import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<{ socket: Socket<any, any> | null }>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);

  // Custom hook for connecting to socket, that will export socket instance
  useEffect(() => {
    const connectedSocket = io("http://localhost:8000", {
      transports: ["websocket"], // Agar polling na chale to websocket force karein
      reconnection: true,
      reconnectionAttempts: Infinity,
      randomizationFactor: 0.5,
      auth: {
        token: localStorage.getItem("token") || "",
      },
    });

    setSocket(connectedSocket);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("error", () => {
      console.log("error connecting socket");
    });

    socket.on("connect", () => {
      console.log("socket connected");
      //   setSocketId(socket.id);
    });
  }, [socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  return useContext(SocketContext);
};
