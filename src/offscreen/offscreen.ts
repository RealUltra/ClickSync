import { io, type Socket } from "socket.io-client";
import type { BackgroundToOffscreenMessage } from "../shared/messages";

const SERVER_URL = "http://localhost:3000";

let socket: Socket | null = null;

chrome.runtime.onMessage.addListener(
  (message: BackgroundToOffscreenMessage) => {
    if (message.type === "SERVER_CONNECT") {
      socket?.disconnect();

      socket = io(SERVER_URL, {
        transports: ["websocket"],
        reconnection: true,
      });

      return;
    }

    if (message.type === "SERVER_DISCONNECT") {
      socket?.disconnect();
      socket = null;
    }
  },
);
