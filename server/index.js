const app = require('express')()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    let idRoom = socket.handshake.query.idRoom;
    socket.join(idRoom);
    socket.on('createRoom', () => {
        socket.join(socket.idRoom);
        socket.emit('createdRoom', socket.id);
        socket.emit('messageSended', 'olá galera')
    })

    socket.on('joinInRoom', (id) => {
        console.log(socket.id)
        socket.join(id);
        socket.emit('joinedInRoom', id)
    })
    socket.on('message', (message, id) => {
        console.log(message, idRoom)
        //io.to(`${id}`).emit('messageSended', message)
        io.to(idRoom).emit('messageSended', message)
        
    })
    socket.on("disconnect", () => console.log("Client disconnected"));
})




http.listen(3333)