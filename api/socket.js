// api/socket.js
import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
    if (!io) {
        io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('chat message', (data) => {
                io.emit('chat message', data);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });
    }
    res.end();
}
