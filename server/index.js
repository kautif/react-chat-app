const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors')

// imports helper functions from users.js
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
app.use(router);
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);



io.on('connection', (socket) => {
    console.log("Connection made");

    socket.on('join', ({name, room}, callback) => {
        console.log("join name: ", name);
        console.log("join room: ", room);

        const {error, user} = addUser({id: socket.id, name, room});
        console.log('error', error)
        console.log('user', user)

        if (error) {
            callback(error)  
        }

        socket.join(user.room);
        // message to user who joins
            // In general, emit is done from back to front end
        socket.emit('message', {user: 'admin', text: `Welcome to the ${user.room}, ${user.name}`});

        // message to the entire room
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} joined`})

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback();
    })

socket.on('send_msg', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {user: user.name, text: message});

    callback();
}); 


    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
            io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        } 
        console.log(`user left`);
    })

})

server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})