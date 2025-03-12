import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3200"; // Make sure this matches the server port
let socket = null;

export const initializeSocket = (userId) => {
    if (socket) {
        socket.disconnect();
    }

    socket = io(SOCKET_URL, {
        auth: { userId },
    });

    // Add logging for debugging
    socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
    });

};

export const getSocket = () => {
    if (!socket) {
        throw new Error("Socket not initialized");
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
