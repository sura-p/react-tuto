// src/services/socketService.js
import { io } from "socket.io-client";

class SocketService {
  socket = null;

  connect(token) {
    this.socket = io(process.env.REACT_APP_BACKEND_URL, {
    //   auth: {
    //     token: `Bearer ${token}`,
    //   },
    });

    this.socket.on("connect", () => {
      console.log("Socket connected!");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket manually disconnected");
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;
