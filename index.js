import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.broadcast.emit('chat message', "user connected")

  socket.on('disconnect', () => {
    socket.broadcast.emit('chat message', 'user disconnected')
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('send picture', (picture) => {
    io.emit('send picture', picture);
  });

});



server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});