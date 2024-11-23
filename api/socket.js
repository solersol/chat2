import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
    try {
        if (!io) {
            console.log("Initializing Socket.IO...");
            io = new Server(res.socket.server, {
                path: '/socket.io' // Ensure the namespace path matches
            });
            res.socket.server.io = io;

            // Handle WebSocket connections
            io.on('connection', (socket) => {
                console.log('A user connected:', socket.id);

                // Listen for chat messages
                socket.on('chat message', (data) => {
                    console.log('Message received:', data);
                    io.emit('chat message', data); // Broadcast to all clients
                });

                socket.on('disconnect', () => {
                    console.log('User disconnected:', socket.id);
                });
            });
        }
        res.end();
    } catch (error) {
        console.error('Socket.IO error:', error);
        res.status(500).send('Internal Server Error');
    }
}
