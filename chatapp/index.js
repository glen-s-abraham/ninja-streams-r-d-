const express = require('express');
const socket=require('socket.io');

const app = express();
app.use(express.static("public"));

const server = socket(app.listen(3000,()=>{
    console.log('Sever listening on port 3000')
}));

server.on('connection',s=>{
    s.on('sendingMessage',message=>{
        console.log(message);
        server.emit('broadcastMessage',message)
    })
})