// api/socket.js
import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
    if (!io) {
        io = new Server(res.socket.server);
        res.socket.server.io = io;

        // Handle new connections
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            // Listen for messages from clients
            socket.on('chat message', (data) => {
                console.log('Message received:', data); // Debug
                io.emit('chat message', data); // Broadcast to all clients
            });

            // Handle user disconnection
            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });
    }
    res.end();
}
