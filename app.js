const express = require('express');
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require("cors")
const router = require('./routers/router')


const io = new Server(server, {
    cors:{
        origins:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
});


app.use(cors())


io.on('connection', (socket) => {
    console.log(socket.id)
    console.log('a user connected');

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`User with ID:${socket.id} joined room ${data}`)

    })

    
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

app.use(router)

server.listen(5000, () => {
  console.log('listening on :5000');
});