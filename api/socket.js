import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
    try {
        // Check if Socket.IO is already initialized
        if (!io) {
            console.log("Initializing Socket.IO...");
            io = new Server(res.socket.server, {
                path: "/socket.io" // Ensure correct namespace path
            });
            res.socket.server.io = io;

            // Handle WebSocket connections
            io.on('connection', (socket) => {
                console.log('A user connected:', socket.id);

                // Listen for incoming chat messages
                socket.on('chat message', (data) => {
                    console.log('Message received:', data);
                    io.emit('chat message', data); // Broadcast to all clients
                });

                // Handle disconnections
                socket.on('disconnect', () => {
                    console.log('User disconnected:', socket.id);
                });
            });
        }
        res.end();
    } catch (error) {
        console.error("Error in Socket.IO handler:", error);
        res.status(500).send("Internal Server Error");
    }
}
