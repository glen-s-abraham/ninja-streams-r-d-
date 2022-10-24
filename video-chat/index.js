const express = require('express')
const socketio  = require('socket.io');

const app = express();

app.use(express.static(__dirname+'/public'));

const server = app.listen(3000);
const io = socketio(server,{
    cors:{origin:'*'}
})

io.on('connection',(socket)=>{
    socket.on('join',(roomName)=>{
        console.log(roomName)
        let rooms = io.sockets.adapter.rooms;
        curRoom = rooms.get(roomName);
        if(curRoom===undefined){
            socket.join(roomName);
            console.log('room created');
        }else if(curRoom.size ===1){
            socket.join(roomName)
            console.log('joined room');
        }else{
            console.warn('Room full');
        }
        
    })
})