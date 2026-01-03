const express = require('express');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);  //handler req res inside app 

//initiate socket.io and attch this to the http server
const io = socketIo(server);

app.use(express.static('public'));

const users = new Set();
//1st
io.on("connection", (socket) => {
    console.log('A user is now connected');

    //handle users when they will join the chat
    socket.on('join', (userName) => {//when on that side here emit and vice versa
        users.add(userName);

        socket.userName=userName//

        //broadcast to all clients/users that a new user has joined
        io.emit('userJoined', userName)

        //send the updated user list to all clients
        io.emit('userList', Array.from(users))
    });

    //till now u have maintained a user entered the chat  display a mesaage of that user joined with the list of the users 

    //handle incoming chat message
    //so for message ofc we write on client side mean client will emit and server will listen
    socket.on('chatMessage', (message) => {
        //broadcast the received message to all connected clients
        io.emit("chatMessage", message); //now client listen
    });


    //handle user disconnection
    socket.on("disconnect",()=>{
        console.log('An user is disconnected')

        users.forEach(user=>{
            if(user === socket.userName){
                users.delete(user);

                io.emit('userLeft',user);

                io.emit('userList',Array.from(users));
            }
        })
    })
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
})


// Server side






















































































// const express = require('express');
// const socketIo = require('socket.io');
// const http = require('http');

// const app = express();

// const server = http.createServer(app);

// const io = socketIo(server);

// const users = new Set();

// app.use(express.static('public'));

// io.on("connection", (socket) => {
//     console.log('A user is now connected');

//     socket.on('join', (userName) => {
//         users.add(userName);

//         io.emit('userJoined', userName);

//         io.emit('userList',Array.from(users));
//     });


// });


// const PORT=3000;

// server.listen(PORT,()=>{
//     console.log(`Server is now running on http://localhost:${PORT}`);
// })
